# SUMERI · Remotion 3D Render Pipeline

This document outlines the Remotion 3D video generation pipeline for the SUMERI campaign website.

## Architecture

- **Engine**: Remotion 4.0.532 + Three.js (`three@0.174.0`)
- **Composition**: `HeroWatch` (1920x1080 @ 30 FPS, 120 frames / 4.0s seamless loop)
- **Secondary Composition**: `CraftBezel` (1080x1080 @ 60 FPS, 120 frames macro rotation)

## 3D Horological Assembly

1. **Case & Bezel**:
   - High-grade 316L brushed stainless steel case body (`metalness: 0.94, roughness: 0.24`).
   - Dual-tone Batman split ceramic insert (black 12–6 o'clock half, royal navy blue 6–12 o'clock half).
   - Luminous diver triangle marker at 12 o'clock (`#eafff2`, emissive intensity 0.35).
2. **Dial & Caliber**:
   - Deep recessed dial chamber featuring authentic 800x800 high-contrast Casio Duro Marlin Batman texture map (`images_nobg/01_...`).
   - Luminous trapezoidal and circular hour markers with phosphorescent emission.
3. **Domed Crystal Glass**:
   - Physical transmission glass (`transmission: 0.94, roughness: 0.03, ior: 1.52, reflectivity: 0.85, clearcoat: 1.0`).
   - Generates authentic specular light glints as the studio light sweeps across the watch face.
4. **Studio Lighting Rig**:
   - Sweeping Key Light: 3.2 intensity warm directional light gliding from X=-2.2 to X=+2.2 over 120 frames.
   - Rim Light: 3.5 intensity sapphire blue point light defining the razor-sharp bevel edge.
   - Bounce Fill: Warm ambient bounce preserving dark dial details.
5. **Camera Motion**:
   - Controlled orbital dolly (yaw ±8°, subtle pitch tilt, focal distance tracking) adhering to the Remotion motion choreography specification.

## Render Commands

```bash
# Render still poster frame (Frame 45)
npm run remotion:poster

# Render cinematic MP4 video (H.264, 1920x1080)
npm run remotion:render

# Render optimized WebM video (VP8)
npm run remotion:render-web

# Or run the master script
node scripts/render-all.js
```

## Production Web Integration

The production website does not require Remotion Studio or Chromium at runtime. It directly consumes the pre-rendered artifacts from:
- `public/video/hero-watch-cinematic.mp4`
- `public/video/hero-watch-poster.jpg`

The DOM wrapper in `components/hero/HeroWatchVideo.tsx` layers dynamic 3D perspective mouse tilt (0.05 lerp smoothing), dynamic specular glare tracking, and contact shadow lag over the video.
