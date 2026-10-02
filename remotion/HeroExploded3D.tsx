import React, { useEffect, useRef } from "react";
import { useCurrentFrame, useVideoConfig, staticFile } from "remotion";
import * as THREE from "three";

export const HeroExploded3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // References to exploding component layers
  const masterGroupRef = useRef<THREE.Group | null>(null);
  const crystalMeshRef = useRef<THREE.Mesh | null>(null);
  const bezelGroupRef = useRef<THREE.Group | null>(null);
  const secondHandRef = useRef<THREE.Mesh | null>(null);
  const minuteHandRef = useRef<THREE.Mesh | null>(null);
  const hourHandRef = useRef<THREE.Mesh | null>(null);
  const dialMeshRef = useRef<THREE.Mesh | null>(null);
  const caseMeshRef = useRef<THREE.Mesh | null>(null);
  const crownMeshRef = useRef<THREE.Mesh | null>(null);
  const strapTopRef = useRef<THREE.Mesh | null>(null);
  const strapBottomRef = useRef<THREE.Mesh | null>(null);
  const gasketMeshRef = useRef<THREE.Mesh | null>(null);
  const casebackMeshRef = useRef<THREE.Mesh | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Transparent WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 0); // 100% Transparent
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.4);
    cameraRef.current = camera;

    // 3. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaf0, 3.4);
    keyLight.position.set(-1.8, 2.8, 3.2);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const rimLight = new THREE.PointLight(0x8eb4f8, 3.6, 12);
    rimLight.position.set(2.4, -1.8, 2.2);
    scene.add(rimLight);

    const bounceLight = new THREE.DirectionalLight(0xffeacc, 0.9);
    bounceLight.position.set(0, -3.0, 1.5);
    scene.add(bounceLight);

    // 5. Build Exploded 3D Horological Assembly
    const master = new THREE.Group();
    scene.add(master);
    masterGroupRef.current = master;

    // PBR Materials
    const brushedSteel = new THREE.MeshStandardMaterial({
      color: 0xd8dce2,
      metalness: 0.95,
      roughness: 0.22,
    });

    const polishedSteel = new THREE.MeshStandardMaterial({
      color: 0xf5f7fa,
      metalness: 0.98,
      roughness: 0.1,
    });

    const matteResin = new THREE.MeshStandardMaterial({
      color: 0x111317,
      metalness: 0.08,
      roughness: 0.76,
    });

    const batmanBezelBlack = new THREE.MeshStandardMaterial({
      color: 0x08090b,
      metalness: 0.7,
      roughness: 0.25,
    });

    const batmanBezelBlue = new THREE.MeshStandardMaterial({
      color: 0x123ca6,
      metalness: 0.75,
      roughness: 0.2,
    });

    const lumeMaterial = new THREE.MeshStandardMaterial({
      color: 0xeafff2,
      emissive: 0x48e085,
      emissiveIntensity: 0.4,
      roughness: 0.2,
    });

    const handBlue = new THREE.MeshStandardMaterial({
      color: 0x2a5bd7,
      metalness: 0.85,
      roughness: 0.25,
    });

    const rubberGasketMat = new THREE.MeshStandardMaterial({
      color: 0x1c1e24,
      roughness: 0.9,
    });

    // LAYER 01: Sapphire Crystal Glass (Topmost forward layer)
    const crystalGeo = new THREE.CylinderGeometry(1.06, 1.06, 0.04, 64);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      transparent: true,
      roughness: 0.03,
      ior: 1.52,
      reflectivity: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    crystalMesh.rotation.x = Math.PI / 2;
    master.add(crystalMesh);
    crystalMeshRef.current = crystalMesh;

    // LAYER 02: Dual-Tone Batman Rotary Bezel
    const bezelGroup = new THREE.Group();
    master.add(bezelGroup);
    bezelGroupRef.current = bezelGroup;

    const bezelOuter = new THREE.Mesh(new THREE.TorusGeometry(1.23, 0.065, 16, 64), polishedSteel);
    bezelGroup.add(bezelOuter);

    const bezelTop = new THREE.Mesh(new THREE.RingGeometry(1.05, 1.22, 32, 1, 0, Math.PI), batmanBezelBlack);
    bezelGroup.add(bezelTop);

    const bezelBottom = new THREE.Mesh(new THREE.RingGeometry(1.05, 1.22, 32, 1, Math.PI, Math.PI), batmanBezelBlue);
    bezelGroup.add(bezelBottom);

    const pipMesh = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.03, 16), lumeMaterial);
    pipMesh.position.set(0, 1.135, 0.02);
    pipMesh.rotation.z = Math.PI;
    bezelGroup.add(pipMesh);

    // LAYER 03: Precision Hands on Pinions
    // Second Hand (Thin blue sword with luminous tip)
    const secondHand = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.95, 0.01), handBlue);
    secondHand.position.set(0, 0.25, 0.13);
    secondHand.rotation.z = -0.7;
    master.add(secondHand);
    secondHandRef.current = secondHand;

    // Minute Hand (Luminous sword)
    const minuteHand = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.8, 0.015), polishedSteel);
    minuteHand.position.set(0, 0.2, 0.12);
    minuteHand.rotation.z = 0.4;
    master.add(minuteHand);
    minuteHandRef.current = minuteHand;

    // Hour Hand (Luminous sword)
    const hourHand = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.55, 0.015), polishedSteel);
    hourHand.position.set(0, 0.15, 0.11);
    hourHand.rotation.z = 2.1;
    master.add(hourHand);
    hourHandRef.current = hourHand;

    // LAYER 04: Recessed Duro Marlin Dial Disc
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      staticFile("images_nobg/01_watchzone_Casio_Duro_Marlin_Diver_s_Batman_Black_Dial_Men_s_Watch.png"),
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;

        const dialGeo = new THREE.PlaneGeometry(2.35, 2.35);
        const dialMat = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          roughness: 0.38,
          metalness: 0.15,
        });
        const dialMesh = new THREE.Mesh(dialGeo, dialMat);
        master.add(dialMesh);
        dialMeshRef.current = dialMesh;
      }
    );

    // LAYER 05: Middle 316L Stainless Steel Case Body (Central anchor)
    const caseGeo = new THREE.CylinderGeometry(1.22, 1.25, 0.28, 64);
    const caseMesh = new THREE.Mesh(caseGeo, brushedSteel);
    caseMesh.rotation.x = Math.PI / 2;
    master.add(caseMesh);
    caseMeshRef.current = caseMesh;

    // Screw-down Crown at 3 o'clock
    const crownGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.22, 32);
    const crownMesh = new THREE.Mesh(crownGeo, brushedSteel);
    crownMesh.rotation.z = Math.PI / 2;
    crownMesh.position.set(1.35, 0, 0);
    master.add(crownMesh);
    crownMeshRef.current = crownMesh;

    // Diver Resin Straps (Top and Bottom Lugs)
    const strapTop = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.6, 0.14), matteResin);
    strapTop.position.set(0, 1.85, -0.16);
    strapTop.rotation.x = 0.22;
    master.add(strapTop);
    strapTopRef.current = strapTop;

    const strapBottom = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.6, 0.14), matteResin);
    strapBottom.position.set(0, -1.85, -0.16);
    strapBottom.rotation.x = -0.22;
    master.add(strapBottom);
    strapBottomRef.current = strapBottom;

    // LAYER 06: Internal Gasket Seal Ring (Moves backward)
    const gasketGeo = new THREE.TorusGeometry(1.08, 0.035, 16, 64);
    const gasketMesh = new THREE.Mesh(gasketGeo, rubberGasketMat);
    master.add(gasketMesh);
    gasketMeshRef.current = gasketMesh;

    // LAYER 07: Threaded Diver Caseback Plate (Moves furthest backward)
    const casebackGeo = new THREE.CylinderGeometry(1.18, 1.18, 0.05, 64);
    const casebackMesh = new THREE.Mesh(casebackGeo, polishedSteel);
    casebackMesh.rotation.x = Math.PI / 2;
    master.add(casebackMesh);
    casebackMeshRef.current = casebackMesh;

    return () => {
      renderer.dispose();
      scene.clear();
    };
  }, [width, height]);

  // Frame Update Loop (0 to durationInFrames - 1)
  useEffect(() => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!renderer || !scene || !camera) return;

    // Normalized progress p in [0, 1]
    const p = Math.max(0, Math.min(1, frame / (durationInFrames - 1)));

    // Ease-in-out curve for luxury mechanical smooth unfolding
    const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

    // 1. Perspective Orientation Tilt (Tilts slightly so separated layers are clearly seen with 3D depth)
    if (masterGroupRef.current) {
      // Rotate around Y and X to create dynamic perspective angle
      masterGroupRef.current.rotation.y = -0.32 * ease; // -18 degrees
      masterGroupRef.current.rotation.x = 0.22 * ease;  // +12 degrees
      masterGroupRef.current.rotation.z = -0.05 * ease;
      // Slight vertical centering adjustment
      masterGroupRef.current.position.y = -0.05 * ease;
    }

    // 2. LAYER 01: Sapphire Crystal Lifts Out (+1.2 along Z)
    if (crystalMeshRef.current) {
      crystalMeshRef.current.position.z = 0.17 + 1.25 * ease;
      crystalMeshRef.current.rotation.x = Math.PI / 2 - 0.08 * ease;
    }

    // 3. LAYER 02: Bezel Separates (+0.82 along Z)
    if (bezelGroupRef.current) {
      bezelGroupRef.current.position.z = 0.15 + 0.85 * ease;
      bezelGroupRef.current.rotation.z = -0.6 * ease; // Bezel ratchets around
    }

    // 4. LAYER 03: Hands Elevate in Staggered Formation
    if (secondHandRef.current) {
      secondHandRef.current.position.z = 0.13 + 0.65 * ease;
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.position.z = 0.12 + 0.52 * ease;
    }
    if (hourHandRef.current) {
      hourHandRef.current.position.z = 0.11 + 0.42 * ease;
    }

    // 5. LAYER 04: Dial Plate Separates (+0.28 along Z)
    if (dialMeshRef.current) {
      dialMeshRef.current.position.z = 0.08 + 0.28 * ease;
    }

    // 6. LAYER 05: Middle Case Anchor & Crown
    if (caseMeshRef.current) {
      caseMeshRef.current.position.z = 0;
    }
    if (crownMeshRef.current) {
      // Crown unthreads slightly outward (+X)
      crownMeshRef.current.position.x = 1.35 + 0.22 * ease;
      crownMeshRef.current.rotation.z = Math.PI / 2 + 1.2 * ease;
    }

    // 7. LAYER 06: Internal Gasket Seal (-0.38 along Z)
    if (gasketMeshRef.current) {
      gasketMeshRef.current.position.z = -0.10 - 0.38 * ease;
    }

    // 8. LAYER 07: Threaded Caseback (-0.88 along Z)
    if (casebackMeshRef.current) {
      casebackMeshRef.current.position.z = -0.18 - 0.88 * ease;
      casebackMeshRef.current.rotation.z = 0.8 * ease; // Unthreading action
    }

    // 9. Sweeping Studio Key Light (Glides across separated layers)
    if (keyLightRef.current) {
      const sweepX = -2.2 + ease * 4.4;
      keyLightRef.current.position.set(sweepX, 2.8, 3.2);
    }

    // Render transparent frame
    renderer.render(scene, camera);
  }, [frame, durationInFrames]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} style={{ width, height, objectFit: "contain" }} />
    </div>
  );
};
