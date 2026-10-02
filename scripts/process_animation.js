const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_DIR = path.resolve(__dirname, '../images_nobg/animation');
const OUTPUT_DIR = path.resolve(__dirname, '../images_nobg/animation_processed');
const PUBLIC_OUTPUT_DIR = path.resolve(__dirname, '../public/animation_processed');
const CONTACT_SHEET_PATH = path.resolve(__dirname, '../images_nobg/contact_sheet_preview.png');
const PUBLIC_CONTACT_SHEET = path.resolve(__dirname, '../public/contact_sheet_preview.png');

const TOTAL_FRAMES = 185;
const L_LOW = 2;
const L_HIGH = 7;
const MIN_COMPONENT_AREA = 160;

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(PUBLIC_OUTPUT_DIR)) fs.mkdirSync(PUBLIC_OUTPUT_DIR, { recursive: true });

async function processSingleFrame(inputPath) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  const visited = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let head = 0, tail = 0;

  // 1. Seed borders (top row, left col, right col, and safe corners of bottom)
  for (let x = 0; x < w; x++) {
    visited[x] = 1; queue[tail++] = x;
    if (x < 240 || x > 960) {
      const bIdx = (h - 1) * w + x;
      visited[bIdx] = 1; queue[tail++] = bIdx;
    }
  }
  for (let y = 0; y < h; y++) {
    if (!visited[y * w]) { visited[y * w] = 1; queue[tail++] = y * w; }
    const rIdx = y * w + (w - 1);
    if (!visited[rIdx]) { visited[rIdx] = 1; queue[tail++] = rIdx; }
  }

  // 2. 4-way flood fill from border with threshold L_HIGH
  while (head < tail) {
    const curr = queue[head++];
    const cx = curr % w, cy = (curr / w) | 0;

    const n1 = cx > 0 ? curr - 1 : -1;
    const n2 = cx < w - 1 ? curr + 1 : -1;
    const n3 = cy > 0 ? curr - w : -1;
    const n4 = cy < h - 1 ? curr + w : -1;

    for (const n of [n1, n2, n3, n4]) {
      if (n >= 0 && !visited[n]) {
        const nIdx = n * 3;
        const maxC = Math.max(data[nIdx], data[nIdx + 1], data[nIdx + 2]);
        if (maxC <= L_HIGH) {
          visited[n] = 1;
          queue[tail++] = n;
        }
      }
    }
  }

  // 3. Identify candidate foreground pixels
  const fgMask = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    if (!visited[i]) fgMask[i] = 1;
  }

  // 4. Connected-component labeling on candidate foreground
  const labeled = new Int32Array(w * h);
  let compId = 0;

  for (let i = 0; i < w * h; i++) {
    if (fgMask[i] && labeled[i] === 0) {
      compId++;
      const pixels = [i];
      labeled[i] = compId;
      let pHead = 0;
      let minY = (i / w) | 0, maxY = minY, minX = i % w, maxX = minX;

      while (pHead < pixels.length) {
        const curr = pixels[pHead++];
        const cx = curr % w, cy = (curr / w) | 0;
        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;

        for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          const nx = cx + dx, ny = cy + dy;
          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            const nIdx = ny * w + nx;
            if (fgMask[nIdx] && labeled[nIdx] === 0) {
              labeled[nIdx] = compId;
              pixels.push(nIdx);
            }
          }
        }
      }

      // Eliminate artifact if touching top/left/right border or if area < MIN_COMPONENT_AREA
      const touchesIllegalBorder = (minY <= 4 || minX <= 4 || maxX >= w - 5);
      const isSmallNoise = pixels.length < MIN_COMPONENT_AREA;

      if (touchesIllegalBorder || isSmallNoise) {
        for (const p of pixels) {
          fgMask[p] = 0;
          visited[p] = 1;
        }
      }
    }
  }

  // 5. Compute true edge mask for anti-aliasing adjacent to watch boundary
  const isEdge = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (fgMask[idx] === 0) {
        let touchesFg = false;
        for (let dy = -1; dy <= 1 && !touchesFg; dy++) {
          for (let dx = -1; dx <= 1 && !touchesFg; dx++) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
              if (fgMask[ny * w + nx] === 1) touchesFg = true;
            }
          }
        }
        if (touchesFg) isEdge[idx] = 1;
      }
    }
  }

  // 6. Build RGBA buffer with edge anti-aliasing & unpremultiplication
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const srcIdx = i * 3;
    const dstIdx = i * 4;
    const r = data[srcIdx], g = data[srcIdx + 1], b = data[srcIdx + 2];
    const maxC = Math.max(r, g, b);

    if (fgMask[i] === 1) {
      rgba[dstIdx] = r;
      rgba[dstIdx + 1] = g;
      rgba[dstIdx + 2] = b;
      rgba[dstIdx + 3] = 255;
    } else if (isEdge[i] && maxC > L_LOW) {
      const alpha = Math.min(255, Math.max(0, Math.round(255 * (maxC - L_LOW) / (L_HIGH - L_LOW))));
      if (alpha > 0) {
        const factor = 255 / alpha;
        rgba[dstIdx] = Math.min(255, Math.round(r * factor));
        rgba[dstIdx + 1] = Math.min(255, Math.round(g * factor));
        rgba[dstIdx + 2] = Math.min(255, Math.round(b * factor));
        rgba[dstIdx + 3] = alpha;
      } else {
        rgba[dstIdx] = rgba[dstIdx + 1] = rgba[dstIdx + 2] = rgba[dstIdx + 3] = 0;
      }
    } else {
      rgba[dstIdx] = rgba[dstIdx + 1] = rgba[dstIdx + 2] = rgba[dstIdx + 3] = 0;
    }
  }

  return { rgba, width: w, height: h };
}

async function createContactSheet(keyFrames) {
  console.log('Generating Contact Sheet Preview for frames:', keyFrames.join(', '));
  // 5 frames in a row or 5-panel layout
  const panelW = 480;
  const panelH = 270;
  const totalW = panelW * 5;
  const totalH = panelH + 50; // extra space for text labels

  // Checkerboard background for visual transparency verification
  const sheet = Buffer.alloc(totalW * totalH * 4);
  for (let y = 0; y < totalH; y++) {
    for (let x = 0; x < totalW; x++) {
      const idx = (y * totalW + x) * 4;
      const isCheck = ((Math.floor(x / 16) + Math.floor(y / 16)) % 2 === 0);
      const val = isCheck ? 238 : 220;
      sheet[idx] = val;
      sheet[idx + 1] = val;
      sheet[idx + 2] = val;
      sheet[idx + 3] = 255;
    }
  }

  const composites = [];

  for (let idx = 0; idx < keyFrames.length; idx++) {
    const frameNum = keyFrames[idx];
    const padded = String(frameNum).padStart(3, '0');
    const pngPath = path.join(OUTPUT_DIR, `frame-${padded}.png`);
    
    // Resize frame to panel dimensions
    const resizedBuffer = await sharp(pngPath)
      .resize(panelW, panelH, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    composites.push({
      input: resizedBuffer,
      left: idx * panelW,
      top: 40,
    });
  }

  // Composite over checkerboard
  await sharp(sheet, { raw: { width: totalW, height: totalH, channels: 4 } })
    .composite(composites)
    .png()
    .toFile(CONTACT_SHEET_PATH);

  // Also copy to public directory
  fs.copyFileSync(CONTACT_SHEET_PATH, PUBLIC_CONTACT_SHEET);
  console.log('Contact Sheet created at:', CONTACT_SHEET_PATH);
}

async function runPipeline() {
  console.log(`Starting automated background removal for ${TOTAL_FRAMES} frames...`);
  const t0 = Date.now();

  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const padded = String(i).padStart(3, '0');
    const inputPath = path.join(INPUT_DIR, `ezgif-frame-${padded}.jpg`);
    const outputPath = path.join(OUTPUT_DIR, `frame-${padded}.png`);
    const publicPath = path.join(PUBLIC_OUTPUT_DIR, `frame-${padded}.png`);
    const publicWebp = path.join(PUBLIC_OUTPUT_DIR, `frame-${padded}.webp`);

    const { rgba, width, height } = await processSingleFrame(inputPath);

    // Save master PNG
    const pngBuffer = await sharp(rgba, { raw: { width, height, channels: 4 } })
      .png({ compressionLevel: 8 })
      .toBuffer();

    fs.writeFileSync(outputPath, pngBuffer);
    fs.writeFileSync(publicPath, pngBuffer);

    // Save optimized WebP for blazing fast hero scrubbing
    await sharp(rgba, { raw: { width, height, channels: 4 } })
      .webp({ quality: 92, alphaQuality: 100 })
      .toFile(publicWebp);

    if (i % 25 === 0 || i === TOTAL_FRAMES) {
      console.log(`Processed ${i}/${TOTAL_FRAMES} frames (${Math.round((i / TOTAL_FRAMES) * 100)}%)`);
    }
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`All ${TOTAL_FRAMES} frames processed in ${elapsed}s!`);

  // Generate Contact Sheet for frames: 001, 046, 093, 139, 185
  await createContactSheet([1, 46, 93, 139, 185]);
}

runPipeline().catch(console.error);
