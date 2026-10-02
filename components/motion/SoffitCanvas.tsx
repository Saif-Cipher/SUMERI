"use client";

import { useEffect, useRef } from "react";

export const SOFFIT_CONFIG = {
  bgColor: "#c8cff0",
  colorA: "#d4c8e8",
  colorB: "#dcdcf3",
  colorC: "#e0e4f5",
  colorD: "#f5f5fd",
  scale: 1,
  speed: 0.33,
  tilt: 1.87,
  rock: 0.12,
  horizon: 0.36,
  breathe: 0.29,
  spread: 0.41,
  curve: 3.32,
  direct: 0.97,
  bounce: 0.38,
  bounceCurve: 4.25,
  spillCentre: 0.3,
  spillWidth: 2.18,
  spillFloor: 0.26,
  amount: 0.2,
  warp: 2.58,
  warpScale: 0.78,
  flow: 0.475,
  roughness: 0.29,
  lacunarity: 1.99,
  motes: 0.074,
  moteScale: 7,
  ambient: 0.24,
  contrast: 2.45,
  midpoint: 0.57,
  sink: 0.24,
  glow: 0.38,
  grain: 0,
  grainAnim: 0,
  dither: 0.58,
  vignette: 0.21,
  steer: -0.13,
  lift: 0.11,
  sweep: 0.5,
  cursor: 1,
  parallax: 0.0137,
  maxDpr: 1,
};

const VERT = `#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2  iResolution;
uniform float iTime;
uniform vec2  iMouse;
uniform float uScale;

uniform vec3  uBg, uColorA, uColorB, uColorC, uColorD;
uniform float uSpeed, uTilt, uRock, uHorizon, uBreathe, uSpread, uCurve, uDirect;
uniform float uBounce, uBounceCurve;
uniform float uSpillCentre, uSpillWidth, uSpillFloor;
uniform float uAmount, uWarp, uWarpScale, uFlow, uRoughness, uLacunarity, uMotes, uMoteScale;
uniform float uAmbient, uContrast, uMidpoint, uSink, uGlow;
uniform float uGrain, uDither, uVignette;
uniform float uSteer, uLift, uSweep, uParallax;

#define OCTAVES 4

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float snoise(vec2 p) {
  const float K1 = 0.366025404, K2 = 0.211324865;
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  float m = step(a.y, a.x);
  vec2 o = vec2(m, 1.0 - m);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
  vec3 n = h * h * h * h * vec3(dot(a, hash2(i)), dot(b, hash2(i + o)), dot(c, hash2(i + 1.0)));
  return dot(n, vec3(70.0));
}

float fbm(vec2 p) {
  float v = 0.0, amp = 0.5;
  for (int i = 0; i < OCTAVES; i++) {
    v += amp * snoise(p);
    p *= uLacunarity;
    amp *= uRoughness;
  }
  return v;
}

vec3 ramp4(float t) {
  vec3 c = mix(uColorA, uColorB, smoothstep(0.00, 0.36, t));
  c = mix(c, uColorC, smoothstep(0.32, 0.70, t));
  c = mix(c, uColorD, smoothstep(0.66, 1.00, t));
  return c;
}

float triDither(vec2 fc) {
  float a = fract(sin(dot(fc, vec2(12.9898, 78.233))) * 43758.5453);
  float b = fract(sin(dot(fc + 17.0, vec2(12.9898, 78.233))) * 43758.5453);
  return (a + b - 1.0) / 255.0;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution) / iResolution.y;
  uv *= uScale;
  vec2 iM = iMouse * uScale;
  float t = iTime * uSpeed;

  vec2 p = uv - iM * uParallax;

  float tilt = uTilt + sin(t * 0.13) * uRock + iM.x * uSteer;
  vec2 dir = vec2(cos(tilt), sin(tilt));
  float axis = dot(p, dir);
  float across = dot(p, vec2(-dir.y, dir.x));

  vec2 q = vec2(fbm(p * uWarpScale + vec2(0.0, t * uFlow)),
                fbm(p * uWarpScale + vec2(5.2, 1.3) - t * uFlow * 0.7));
  float air = fbm(p + uWarp * q + vec2(t * 0.12, -t * 0.09)) * 0.5 + 0.5;

  float horizon = uHorizon + sin(t * 0.09 + 2.1) * uBreathe - iM.y * uLift;
  float alt = clamp(0.5 + (axis - horizon) * uSpread + (air - 0.5) * uAmount, 0.0, 1.0);

  float ac = (across - uSpillCentre - iM.x * uSweep) / max(0.05, uSpillWidth);
  float spill = mix(uSpillFloor, 1.0, exp(-ac * ac));

  float directL = pow(alt, uCurve) * spill;
  float bounceL = pow(1.0 - alt, uBounceCurve) * (1.0 - spill * 0.6);

  float lum = uAmbient + directL * uDirect + bounceL * uBounce;

  float mot = snoise(p * uMoteScale - vec2(0.0, t * 0.15)) * 0.5 + 0.5;
  lum += (mot - 0.5) * uMotes;

  lum = (lum - uMidpoint) * uContrast + uMidpoint;
  lum = clamp(lum, 0.0, 1.4);

  vec3 col = ramp4(clamp(lum, 0.0, 1.0));

  if (lum < 0.0) {
    col = mix(col, uBg, clamp(-lum * uSink, 0.0, 1.0));
  } else if (lum > 1.0) {
    col = mix(col, vec3(1.0), clamp((lum - 1.0) * uGlow, 0.0, 1.0));
  }

  col += triDither(gl_FragCoord.xy) * uDither;

  float vig = 1.0 - dot(uv, uv) * uVignette;
  col *= clamp(vig, 0.0, 1.0);

  fragColor = vec4(col, 1.0);
}`;

function hexToVec3(hex: string): [number, number, number] {
  const c = parseInt(hex.replace("#", ""), 16);
  return [((c >> 16) & 255) / 255, ((c >> 8) & 255) / 255, (c & 255) / 255];
}

interface SoffitCanvasProps {
  className?: string;
  config?: Partial<typeof SOFFIT_CONFIG>;
}

export function SoffitCanvas({ className = "", config = {} }: SoffitCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      powerPreference: "high-performance",
    });

    if (!gl) return;

    const createShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vs = createShader(gl.VERTEX_SHADER, VERT);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    const mergedConfig = { ...SOFFIT_CONFIG, ...config };

    const locCache = new Map<string, WebGLUniformLocation | null>();
    const loc = (name: string) => {
      if (!locCache.has(name)) locCache.set(name, gl.getUniformLocation(program, name));
      return locCache.get(name)!;
    };

    const u1f = (n: string, v: number) => gl.uniform1f(loc(n), v);
    const u2f = (n: string, x: number, y: number) => gl.uniform2f(loc(n), x, y);
    const u3f = (n: string, hex: string) => {
      const [r, g, b] = hexToVec3(hex);
      gl.uniform3f(loc(n), r, g, b);
    };

    const applyConfig = () => {
      gl.useProgram(program);
      u3f("uBg", mergedConfig.bgColor);
      u3f("uColorA", mergedConfig.colorA);
      u3f("uColorB", mergedConfig.colorB);
      u3f("uColorC", mergedConfig.colorC);
      u3f("uColorD", mergedConfig.colorD);
      u1f("uScale", mergedConfig.scale);
      u1f("uSpeed", mergedConfig.speed);
      u1f("uTilt", mergedConfig.tilt);
      u1f("uRock", mergedConfig.rock);
      u1f("uHorizon", mergedConfig.horizon);
      u1f("uBreathe", mergedConfig.breathe);
      u1f("uSpread", mergedConfig.spread);
      u1f("uCurve", mergedConfig.curve);
      u1f("uDirect", mergedConfig.direct);
      u1f("uBounce", mergedConfig.bounce);
      u1f("uBounceCurve", mergedConfig.bounceCurve);
      u1f("uSpillCentre", mergedConfig.spillCentre);
      u1f("uSpillWidth", mergedConfig.spillWidth);
      u1f("uSpillFloor", mergedConfig.spillFloor);
      u1f("uAmount", mergedConfig.amount);
      u1f("uWarp", mergedConfig.warp);
      u1f("uWarpScale", mergedConfig.warpScale);
      u1f("uFlow", mergedConfig.flow);
      u1f("uRoughness", mergedConfig.roughness);
      u1f("uLacunarity", mergedConfig.lacunarity);
      u1f("uMotes", mergedConfig.motes);
      u1f("uMoteScale", mergedConfig.moteScale);
      u1f("uAmbient", mergedConfig.ambient);
      u1f("uContrast", mergedConfig.contrast);
      u1f("uMidpoint", mergedConfig.midpoint);
      u1f("uSink", mergedConfig.sink);
      u1f("uGlow", mergedConfig.glow);
      u1f("uDither", mergedConfig.dither);
      u1f("uVignette", mergedConfig.vignette);
      u1f("uSteer", mergedConfig.steer);
      u1f("uLift", mergedConfig.lift);
      u1f("uSweep", mergedConfig.sweep);
      u1f("uParallax", mergedConfig.parallax);
    };

    function resize() {
      if (!canvas || !gl) return;
      const clientW = canvas.clientWidth || window.innerWidth;
      const clientH = canvas.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, mergedConfig.maxDpr);
      const w = Math.max(1, Math.round(clientW * dpr));
      const h = Math.max(1, Math.round(clientH * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.useProgram(program);
      u2f("iResolution", w, h);
    }

    window.addEventListener("resize", resize, { passive: true });
    resize();

    // Mouse tracking
    const mouse = { x: 0, y: 0, ax: 0, ay: 0, tx: 0, ty: 0 };
    const aim = (e: PointerEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;
      const a = w / h;
      mouse.tx = ((e.clientX - rect.left) / w - 0.5) * a;
      mouse.ty = 0.5 - (e.clientY - rect.top) / h;
    };
    window.addEventListener("pointermove", aim, { passive: true });

    // Dynamic Palette listener
    let curBg = hexToVec3(mergedConfig.bgColor);
    let curA = hexToVec3(mergedConfig.colorA);
    let curB = hexToVec3(mergedConfig.colorB);
    let curC = hexToVec3(mergedConfig.colorC);
    let curD = hexToVec3(mergedConfig.colorD);

    let targetBg = [...curBg];
    let targetA = [...curA];
    let targetB = [...curB];
    let targetC = [...curC];
    let targetD = [...curD];

    const onPaletteEvent = (e: Event) => {
      const d = (e as CustomEvent).detail;
      if (!d) return;
      if (d.bgColor) targetBg = hexToVec3(d.bgColor);
      if (d.colorA) targetA = hexToVec3(d.colorA);
      if (d.colorB) targetB = hexToVec3(d.colorB);
      if (d.colorC) targetC = hexToVec3(d.colorC);
      if (d.colorD) targetD = hexToVec3(d.colorD);
    };
    window.addEventListener("soffit:setPalette", onPaletteEvent);

    const t0 = performance.now();
    let prevT = t0;
    let clock = 0;
    let animId: number;

    function frame(now: number) {
      animId = requestAnimationFrame(frame);
      const raw = now - prevT;
      prevT = now;
      if (document.hidden || !gl) return;

      const ms = raw > 50 ? 50 : raw < 4.167 ? 4.167 : raw;
      const s = ms > 36.7 ? 2.2 : ms * 0.06;
      clock += ms * 0.001;

      mouse.ax += (mouse.tx - mouse.ax) * (0.105 * s);
      mouse.ay += (mouse.ty - mouse.ay) * (0.105 * s);
      mouse.x += (mouse.ax - mouse.x) * (0.043 * s);
      mouse.y += (mouse.ay - mouse.y) * (0.043 * s);

      gl.useProgram(program);
      u1f("iTime", clock);
      u2f("iMouse", mouse.x, mouse.y);

      // Smooth color morphing towards target palette
      const cSpeed = 0.04 * s;
      let colorsNeedUpdate = false;
      for (let i = 0; i < 3; i++) {
        if (Math.abs(targetBg[i] - curBg[i]) > 0.001) { curBg[i] += (targetBg[i] - curBg[i]) * cSpeed; colorsNeedUpdate = true; }
        if (Math.abs(targetA[i] - curA[i]) > 0.001) { curA[i] += (targetA[i] - curA[i]) * cSpeed; colorsNeedUpdate = true; }
        if (Math.abs(targetB[i] - curB[i]) > 0.001) { curB[i] += (targetB[i] - curB[i]) * cSpeed; colorsNeedUpdate = true; }
        if (Math.abs(targetC[i] - curC[i]) > 0.001) { curC[i] += (targetC[i] - curC[i]) * cSpeed; colorsNeedUpdate = true; }
        if (Math.abs(targetD[i] - curD[i]) > 0.001) { curD[i] += (targetD[i] - curD[i]) * cSpeed; colorsNeedUpdate = true; }
      }
      if (colorsNeedUpdate) {
        gl.uniform3f(loc("uBg"), curBg[0], curBg[1], curBg[2]);
        gl.uniform3f(loc("uColorA"), curA[0], curA[1], curA[2]);
        gl.uniform3f(loc("uColorB"), curB[0], curB[1], curB[2]);
        gl.uniform3f(loc("uColorC"), curC[0], curC[1], curC[2]);
        gl.uniform3f(loc("uColorD"), curD[0], curD[1], curD[2]);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    applyConfig();
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", aim);
      window.removeEventListener("soffit:setPalette", onPaletteEvent);
      gl.deleteProgram(program);
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      id="bg-gl"
      className={`block w-full h-full ${className}`}
      style={{ background: config.bgColor || SOFFIT_CONFIG.bgColor }}
    />
  );
}
