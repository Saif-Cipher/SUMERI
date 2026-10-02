import React, { useEffect, useRef } from "react";
import { useCurrentFrame, useVideoConfig, staticFile } from "remotion";
import * as THREE from "three";

export const HeroWatch3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames, fps } = useVideoConfig();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Scene object references
  const watchGroupRef = useRef<THREE.Group | null>(null);
  const bezelGroupRef = useRef<THREE.Group | null>(null);
  const secondHandRef = useRef<THREE.Mesh | null>(null);
  const minuteHandRef = useRef<THREE.Mesh | null>(null);
  const hourHandRef = useRef<THREE.Mesh | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.PointLight | null>(null);
  const shadowMeshRef = useRef<THREE.Mesh | null>(null);

  // Initialize Three.js scene once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Renderer Setup with High Precision & Transparency
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);
    cameraRef.current = camera;

    // 3. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 4. Lighting Rig (Controlled Luxury Studio Setup)
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Dynamic sweeping key light
    const keyLight = new THREE.DirectionalLight(0xfffaf0, 3.2);
    keyLight.position.set(-1.8, 2.5, 3.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    // Cool rim specular light
    const rimLight = new THREE.PointLight(0x8eb4f8, 3.5, 10);
    rimLight.position.set(2.2, -1.5, 2.0);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // Warm bounce light
    const bounceLight = new THREE.DirectionalLight(0xffeacc, 0.8);
    bounceLight.position.set(0, -3.0, 1.5);
    scene.add(bounceLight);

    // 5. Build Genuine 3D Horological Geometry
    const masterWatchGroup = new THREE.Group();
    scene.add(masterWatchGroup);
    watchGroupRef.current = masterWatchGroup;

    // PBR Materials
    const brushedSteel = new THREE.MeshStandardMaterial({
      color: 0xd8dce2,
      metalness: 0.94,
      roughness: 0.24,
    });

    const polishedSteel = new THREE.MeshStandardMaterial({
      color: 0xf0f3f6,
      metalness: 0.98,
      roughness: 0.12,
    });

    const matteResin = new THREE.MeshStandardMaterial({
      color: 0x111317,
      metalness: 0.08,
      roughness: 0.76,
    });

    const batmanBezelBlack = new THREE.MeshStandardMaterial({
      color: 0x08090b,
      metalness: 0.65,
      roughness: 0.28,
    });

    const batmanBezelBlue = new THREE.MeshStandardMaterial({
      color: 0x123ca6,
      metalness: 0.72,
      roughness: 0.22,
    });

    const lumeMaterial = new THREE.MeshStandardMaterial({
      color: 0xeafff2,
      emissive: 0x48e085,
      emissiveIntensity: 0.35,
      roughness: 0.2,
    });

    const goldAccent = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.2,
    });

    // A. 3D Watch Case Body (44mm diver proportion)
    const caseGeo = new THREE.CylinderGeometry(1.22, 1.25, 0.28, 64);
    const caseMesh = new THREE.Mesh(caseGeo, brushedSteel);
    caseMesh.rotation.x = Math.PI / 2;
    masterWatchGroup.add(caseMesh);

    // B. Bezel Assembly
    const bezelGroup = new THREE.Group();
    bezelGroup.position.z = 0.15;
    masterWatchGroup.add(bezelGroup);
    bezelGroupRef.current = bezelGroup;

    // Bezel Outer Ring with Knurling
    const bezelOuterGeo = new THREE.TorusGeometry(1.23, 0.065, 16, 64);
    const bezelOuter = new THREE.Mesh(bezelOuterGeo, polishedSteel);
    bezelGroup.add(bezelOuter);

    // Bezel Ceramic Insert: Top Black Half (12 to 6)
    const bezelTopGeo = new THREE.RingGeometry(1.05, 1.22, 32, 1, 0, Math.PI);
    const bezelTop = new THREE.Mesh(bezelTopGeo, batmanBezelBlack);
    bezelGroup.add(bezelTop);

    // Bezel Ceramic Insert: Bottom Batman Blue Half (6 to 12)
    const bezelBottomGeo = new THREE.RingGeometry(1.05, 1.22, 32, 1, Math.PI, Math.PI);
    const bezelBottom = new THREE.Mesh(bezelBottomGeo, batmanBezelBlue);
    bezelGroup.add(bezelBottom);

    // 12-o'clock Luminous Diver Pip
    const pipGeo = new THREE.ConeGeometry(0.045, 0.03, 16);
    const pipMesh = new THREE.Mesh(pipGeo, lumeMaterial);
    pipMesh.position.set(0, 1.135, 0.02);
    pipMesh.rotation.z = Math.PI;
    bezelGroup.add(pipMesh);

    // C. Recessed Dial Chamber
    const dialChamberGeo = new THREE.CylinderGeometry(1.04, 1.04, 0.08, 64);
    const dialChamberMat = new THREE.MeshStandardMaterial({
      color: 0x060709,
      roughness: 0.85,
    });
    const dialChamber = new THREE.Mesh(dialChamberGeo, dialChamberMat);
    dialChamber.rotation.x = Math.PI / 2;
    dialChamber.position.z = 0.06;
    masterWatchGroup.add(dialChamber);

    // Dial Texture Plane using Authentic Duro Marlin Cutout
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      staticFile("images_nobg/01_watchzone_Casio_Duro_Marlin_Diver_s_Batman_Black_Dial_Men_s_Watch.png"),
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;

        const dialDiscGeo = new THREE.PlaneGeometry(2.35, 2.35);
        const dialDiscMat = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          roughness: 0.38,
          metalness: 0.15,
        });
        const dialDisc = new THREE.Mesh(dialDiscGeo, dialDiscMat);
        dialDisc.position.z = 0.11;
        masterWatchGroup.add(dialDisc);
      }
    );

    // D. Domed Sapphire Crystal with Real Specular Glare
    const crystalGeo = new THREE.CylinderGeometry(1.06, 1.06, 0.04, 64);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.03,
      ior: 1.52, // Sapphire index of refraction
      reflectivity: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    crystalMesh.rotation.x = Math.PI / 2;
    crystalMesh.position.z = 0.17;
    masterWatchGroup.add(crystalMesh);

    // E. Screw-Down Crown & Crown Guards at 3 o'clock
    const crownGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.18, 32);
    const crownMesh = new THREE.Mesh(crownGeo, brushedSteel);
    crownMesh.rotation.z = Math.PI / 2;
    crownMesh.position.set(1.33, 0, 0);
    masterWatchGroup.add(crownMesh);

    // F. Curved Diver Resin Straps (Top and Bottom Lugs)
    const strapCurveTop = new THREE.BoxGeometry(0.85, 1.6, 0.14);
    const strapTop = new THREE.Mesh(strapCurveTop, matteResin);
    strapTop.position.set(0, 1.85, -0.16);
    strapTop.rotation.x = 0.22;
    masterWatchGroup.add(strapTop);

    const strapCurveBottom = new THREE.BoxGeometry(0.85, 1.6, 0.14);
    const strapBottom = new THREE.Mesh(strapCurveBottom, matteResin);
    strapBottom.position.set(0, -1.85, -0.16);
    strapBottom.rotation.x = -0.22;
    masterWatchGroup.add(strapBottom);

    // G. Soft Ground Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(3.6, 1.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x050711,
      transparent: true,
      opacity: 0.35,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, -1.9, -0.45);
    scene.add(shadowMesh);
    shadowMeshRef.current = shadowMesh;

    return () => {
      renderer.dispose();
      scene.clear();
    };
  }, [width, height]);

  // Frame Update Loop (Driven by Remotion frame clock at 60 FPS)
  useEffect(() => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!renderer || !scene || !camera) return;

    // Progress normalized [0, 1]
    const progress = frame / durationInFrames;
    const t = frame / fps;

    // 1. Cinematic Luxury Camera Orbit & Dolly
    const camAngle = Math.sin(progress * Math.PI * 2) * 0.14; // +-8 degrees
    camera.position.x = Math.sin(camAngle) * 4.2;
    camera.position.z = Math.cos(camAngle) * 4.2 - progress * 0.1;
    camera.position.y = Math.cos(progress * Math.PI * 2) * 0.18;
    camera.lookAt(0, 0, 0);

    // 2. Controlled Watch Motion (Restrained, Heavy, Tactile)
    if (watchGroupRef.current) {
      // Gentle horizontal floating yaw
      watchGroupRef.current.rotation.y = Math.sin(progress * Math.PI * 2) * 0.18;
      // Slight pitch tilt highlighting the bezel split
      watchGroupRef.current.rotation.x = -0.08 + Math.cos(progress * Math.PI * 2) * 0.06;
      // Subtle vertical breathing float (12px amplitude)
      watchGroupRef.current.position.y = Math.sin(progress * Math.PI * 2) * 0.08;
    }

    // 3. Sweeping Studio Key Light (Glances across sapphire crystal & bezel)
    if (keyLightRef.current) {
      const sweepX = -2.2 + progress * 4.4;
      keyLightRef.current.position.set(sweepX, 2.6, 2.8);
    }

    // 4. Contact Shadow Pulse
    if (shadowMeshRef.current) {
      const shadowScale = 1.0 + Math.sin(progress * Math.PI * 2) * 0.06;
      shadowMeshRef.current.scale.set(shadowScale, shadowScale, 1);
    }

    // Render this specific frame to canvas
    renderer.render(scene, camera);
  }, [frame, durationInFrames, fps]);

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
      <canvas
        ref={canvasRef}
        style={{
          width,
          height,
          objectFit: "contain",
        }}
      />
    </div>
  );
};
