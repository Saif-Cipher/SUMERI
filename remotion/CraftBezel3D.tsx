import React, { useEffect, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import * as THREE from "three";

export const CraftBezel3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames, fps } = useVideoConfig();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const bezelGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    rendererRef.current = renderer;

    const camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 50);
    camera.position.set(0, 0, 3.5);
    cameraRef.current = camera;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaf0, 3.0);
    keyLight.position.set(2, 3, 2);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x8eb4f8, 3.0, 10);
    rimLight.position.set(-2, -2, 2);
    scene.add(rimLight);

    const group = new THREE.Group();
    scene.add(group);
    bezelGroupRef.current = group;

    // Macro Bezel Assembly
    const steel = new THREE.MeshStandardMaterial({
      color: 0xe0e4e8,
      metalness: 0.96,
      roughness: 0.22,
    });
    const blueCeramic = new THREE.MeshStandardMaterial({
      color: 0x123ca6,
      metalness: 0.75,
      roughness: 0.18,
    });
    const blackCeramic = new THREE.MeshStandardMaterial({
      color: 0x08090b,
      metalness: 0.7,
      roughness: 0.22,
    });

    const outerRing = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.08, 16, 64), steel);
    group.add(outerRing);

    const topHalf = new THREE.Mesh(new THREE.RingGeometry(0.98, 1.18, 32, 1, 0, Math.PI), blackCeramic);
    group.add(topHalf);

    const bottomHalf = new THREE.Mesh(new THREE.RingGeometry(0.98, 1.18, 32, 1, Math.PI, Math.PI), blueCeramic);
    group.add(bottomHalf);

    return () => {
      renderer.dispose();
      scene.clear();
    };
  }, [width, height]);

  useEffect(() => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!renderer || !scene || !camera || !bezelGroupRef.current) return;

    const progress = frame / durationInFrames;
    // Slow unidirectional click rotation (60 clicks per full turn)
    bezelGroupRef.current.rotation.z = -progress * Math.PI * 0.75;
    bezelGroupRef.current.rotation.x = 0.25 + Math.sin(progress * Math.PI * 2) * 0.05;
    bezelGroupRef.current.rotation.y = Math.cos(progress * Math.PI * 2) * 0.08;

    renderer.render(scene, camera);
  }, [frame, durationInFrames, fps]);

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ width, height }} />
    </div>
  );
};
