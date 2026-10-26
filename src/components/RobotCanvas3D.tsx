import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ArmorFinish, RobotModelType } from '../types';
import { Eye, Layers, RotateCcw, Sparkles, Zap, Shield, Cpu } from 'lucide-react';
import { soundEffects } from '../utils/audioSynthesizer';

interface RobotCanvas3DProps {
  modelType?: RobotModelType;
  initialFinish?: ArmorFinish;
  interactive?: boolean;
  className?: string;
  showControls?: boolean;
  onPartSelect?: (partName: string) => void;
}

export const RobotCanvas3D: React.FC<RobotCanvas3DProps> = ({
  modelType = 'humanoid_2050',
  initialFinish = 'acrylic_translucent',
  interactive = true,
  className = 'w-full h-full min-h-[420px]',
  showControls = true,
  onPartSelect
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [armorFinish, setArmorFinish] = useState<ArmorFinish>(initialFinish);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [activeSubsystem, setActiveSubsystem] = useState<string>('Neural Core');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [explodedRatio, setExplodedRatio] = useState<number>(0);

  // References to keep animation loop & controls consistent
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const materialsMapRef = useRef<{
    armor: THREE.Material;
    acrylic: THREE.Material;
    glowCyan: THREE.Material;
    glowViolet: THREE.Material;
    darkChassis: THREE.Material;
    metalJoints: THREE.Material;
  } | null>(null);

  const explodedPartsRef = useRef<{ mesh: THREE.Object3D; basePos: THREE.Vector3; explodeDir: THREE.Vector3 }[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL Guard as per skill
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Setup Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0a0b10, 0.035);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.3, 4.2);

    // 3. Setup WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Procedural Studio RoomEnvironment Lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Key Light (Warm cyan-white)
    const keyLight = new THREE.DirectionalLight(0xdff9ff, 2.2);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    // Fill Light (Cool violet)
    const fillLight = new THREE.DirectionalLight(0xa78bfa, 1.4);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    // Sky/Ground Ambient
    const hemiLight = new THREE.HemisphereLight(0x00f2fe, 0x111827, 0.8);
    scene.add(hemiLight);

    // Ground Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.55,
      depthWrite: false
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.15;
    scene.add(shadowPlane);

    // Holographic ground radar grid ring
    const gridHelper = new THREE.PolarGridHelper(2.5, 12, 6, 48, 0x00f2fe, 0x1e293b);
    gridHelper.position.y = -1.14;
    scene.add(gridHelper);

    // 5. Materials Setup
    const darkChassis = new THREE.MeshStandardMaterial({
      color: 0x111625,
      roughness: 0.35,
      metalness: 0.85
    });

    const metalJoints = new THREE.MeshStandardMaterial({
      color: 0x384152,
      roughness: 0.2,
      metalness: 0.95
    });

    const glowCyan = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: false
    });

    const glowViolet = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6
    });

    // PBR Armor Material (Default Ceramic)
    const armorMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.16,
      metalness: 0.15
    });

    // Translucent Acrylic Armor (Physical)
    const acrylicMat = new THREE.MeshPhysicalMaterial({
      color: 0xdff9ff,
      metalness: 0.1,
      roughness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.88,
      transparent: true,
      opacity: isSoftwareGl ? 0.45 : 0.9,
      ior: 1.49,
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });

    materialsMapRef.current = {
      armor: armorMat,
      acrylic: acrylicMat,
      glowCyan,
      glowViolet,
      darkChassis,
      metalJoints
    };

    // 6. Assemble Procedural 2050 Humanoid Model (Group of ~10 articulated parts)
    const robotGroup = new THREE.Group();
    robotGroup.position.y = -0.1;
    scene.add(robotGroup);
    explodedPartsRef.current = [];

    const activeArmor = initialFinish === 'acrylic_translucent' ? acrylicMat : armorMat;

    // Helper to register parts for exploded view
    const registerPart = (mesh: THREE.Object3D, explodeDir: THREE.Vector3) => {
      explodedPartsRef.current.push({
        mesh,
        basePos: mesh.position.clone(),
        explodeDir: explodeDir.clone().normalize()
      });
    };

    // A. Torso Chassis & Inner Reactor
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, 0.45, 0);

    // Inner Skeleton Core
    const innerSpineGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.7, 16);
    const innerSpine = new THREE.Mesh(innerSpineGeo, darkChassis);
    torsoGroup.add(innerSpine);

    // Glowing Quantum Reactor Sphere inside chest
    const reactorGeo = new THREE.SphereGeometry(0.16, 24, 24);
    const reactorMesh = new THREE.Mesh(reactorGeo, glowCyan);
    reactorMesh.position.set(0, 0.12, 0.06);
    torsoGroup.add(reactorMesh);

    // Chest Armor Plate (Ceramic or Acrylic)
    const chestPlateGeo = new THREE.BoxGeometry(0.55, 0.45, 0.28);
    const chestPlate = new THREE.Mesh(chestPlateGeo, activeArmor);
    chestPlate.position.set(0, 0.1, 0.04);
    chestPlate.name = 'ChestArmor';
    torsoGroup.add(chestPlate);
    registerPart(chestPlate, new THREE.Vector3(0, 0.3, 1));

    // Abdominal Fiber-Optic Conduits
    for (let i = -2; i <= 2; i++) {
      const conduitGeo = new THREE.TorusGeometry(0.18, 0.018, 8, 16, Math.PI * 0.7);
      const conduitMesh = new THREE.Mesh(conduitGeo, glowCyan);
      conduitMesh.rotation.x = Math.PI / 2;
      conduitMesh.rotation.z = -Math.PI * 0.35;
      conduitMesh.position.set(0, -0.15 + i * 0.05, 0.02);
      torsoGroup.add(conduitMesh);
    }
    robotGroup.add(torsoGroup);

    // B. Futuristic Head with Visor & Neural Crown
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.05, 0);

    const craniumGeo = new THREE.SphereGeometry(0.22, 24, 24);
    craniumGeo.scale(1, 1.15, 1.1);
    const craniumMesh = new THREE.Mesh(craniumGeo, activeArmor);
    craniumMesh.name = 'Cranium';
    headGroup.add(craniumMesh);
    registerPart(craniumMesh, new THREE.Vector3(0, 1, 0.2));

    // Optical Eye Visor (Glowing Cyan Bar)
    const visorGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.08, 24, 1, true, -Math.PI * 0.35, Math.PI * 0.7);
    const visorMesh = new THREE.Mesh(visorGeo, glowCyan);
    visorMesh.position.set(0, 0.04, 0.08);
    headGroup.add(visorMesh);

    // Neck Joint with Bionic Pivot
    const neckGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.18, 16);
    const neckMesh = new THREE.Mesh(neckGeo, metalJoints);
    neckMesh.position.set(0, -0.22, 0);
    headGroup.add(neckMesh);

    robotGroup.add(headGroup);

    // C. Left & Right Shoulder, Arms & Bionic Hands
    const buildArm = (isLeft: boolean) => {
      const armGroup = new THREE.Group();
      const side = isLeft ? 1 : -1;
      armGroup.position.set(side * 0.38, 0.7, 0);

      // Shoulder Sphere
      const shoulderGeo = new THREE.SphereGeometry(0.11, 16, 16);
      const shoulderMesh = new THREE.Mesh(shoulderGeo, metalJoints);
      armGroup.add(shoulderMesh);

      // Shoulder Pauldron Armor
      const pauldronGeo = new THREE.SphereGeometry(0.14, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
      const pauldronMesh = new THREE.Mesh(pauldronGeo, activeArmor);
      pauldronMesh.rotation.z = side * -0.3;
      armGroup.add(pauldronMesh);
      registerPart(pauldronMesh, new THREE.Vector3(side * 1, 0.5, 0));

      // Bicep Limb
      const bicepGeo = new THREE.CylinderGeometry(0.07, 0.06, 0.34, 16);
      const bicepMesh = new THREE.Mesh(bicepGeo, darkChassis);
      bicepMesh.position.set(side * 0.04, -0.24, 0);
      armGroup.add(bicepMesh);

      // Forearm with Hydraulic Actuator & Armor
      const forearmGeo = new THREE.BoxGeometry(0.11, 0.35, 0.11);
      const forearmMesh = new THREE.Mesh(forearmGeo, activeArmor);
      forearmMesh.position.set(side * 0.05, -0.6, 0.02);
      armGroup.add(forearmMesh);

      // Glowing Nerve Accent Strip
      const nerveGeo = new THREE.BoxGeometry(0.02, 0.3, 0.02);
      const nerveMesh = new THREE.Mesh(nerveGeo, glowCyan);
      nerveMesh.position.set(side * 0.11, -0.6, 0.02);
      armGroup.add(nerveMesh);

      // Dexterous Hand
      const handGeo = new THREE.BoxGeometry(0.08, 0.12, 0.05);
      const handMesh = new THREE.Mesh(handGeo, metalJoints);
      handMesh.position.set(side * 0.05, -0.84, 0.02);
      armGroup.add(handMesh);

      return armGroup;
    };

    const leftArm = buildArm(true);
    const rightArm = buildArm(false);
    robotGroup.add(leftArm);
    robotGroup.add(rightArm);

    // D. Pelvis & Lower Hydraulic Legs
    const pelvisGeo = new THREE.BoxGeometry(0.38, 0.16, 0.22);
    const pelvisMesh = new THREE.Mesh(pelvisGeo, darkChassis);
    pelvisMesh.position.set(0, 0.02, 0);
    robotGroup.add(pelvisMesh);

    const buildLeg = (isLeft: boolean) => {
      const legGroup = new THREE.Group();
      const side = isLeft ? 1 : -1;
      legGroup.position.set(side * 0.16, -0.05, 0);

      // Hip Joint
      const hipGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const hipMesh = new THREE.Mesh(hipGeo, metalJoints);
      legGroup.add(hipMesh);

      // Thigh Armor
      const thighGeo = new THREE.BoxGeometry(0.15, 0.44, 0.16);
      const thighMesh = new THREE.Mesh(thighGeo, activeArmor);
      thighMesh.position.set(0, -0.3, 0);
      legGroup.add(thighMesh);
      registerPart(thighMesh, new THREE.Vector3(side * 0.5, -0.2, 0.5));

      // Knee Joint
      const kneeGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.14, 16);
      kneeGeo.rotateZ(Math.PI / 2);
      const kneeMesh = new THREE.Mesh(kneeGeo, metalJoints);
      kneeMesh.position.set(0, -0.56, 0);
      legGroup.add(kneeMesh);

      // Shin & Hydraulic Calf
      const shinGeo = new THREE.BoxGeometry(0.13, 0.46, 0.14);
      const shinMesh = new THREE.Mesh(shinGeo, darkChassis);
      shinMesh.position.set(0, -0.82, -0.01);
      legGroup.add(shinMesh);

      // Foot Base
      const footGeo = new THREE.BoxGeometry(0.12, 0.08, 0.26);
      const footMesh = new THREE.Mesh(footGeo, metalJoints);
      footMesh.position.set(0, -1.08, 0.06);
      legGroup.add(footMesh);

      return legGroup;
    };

    const leftLeg = buildLeg(true);
    const rightLeg = buildLeg(false);
    robotGroup.add(leftLeg);
    robotGroup.add(rightLeg);

    // Floating Dust Particles
    const particleCount = isSoftwareGl ? 30 : 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 6;
      particlePos[i + 1] = (Math.random() - 0.5) * 4 + 0.5;
      particlePos[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Setup Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1.8;
    controls.maxDistance = 6.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't clip beneath ground
    controls.target.set(0, 0.45, 0);
    controls.update();

    // 8. Animation Loop
    let frameId = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Subtle breathing floating motion
      robotGroup.position.y = -0.1 + Math.sin(elapsed * 1.5) * 0.025;

      // Rotate particle dust
      particles.rotation.y = elapsed * 0.05;

      // Pulse reactor glow
      const pulse = 0.85 + Math.sin(elapsed * 4) * 0.15;
      reactorMesh.scale.set(pulse, pulse, pulse);

      // Auto-rotation when idle
      if (isAutoRotating) {
        robotGroup.rotation.y += delta * 0.28;
      }

      // Exploded View smoothly damped
      const targetExplode = explodedRatio;
      explodedPartsRef.current.forEach((item) => {
        const offset = item.explodeDir.clone().multiplyScalar(targetExplode * 0.4);
        item.mesh.position.copy(item.basePos.clone().add(offset));
      });

      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    tick();

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Material Finish & Wireframe dynamically
  useEffect(() => {
    if (!materialsMapRef.current || !sceneRef.current) return;
    const { armor, acrylic, darkChassis } = materialsMapRef.current;

    let targetMat: THREE.Material = armor;

    if (armorFinish === 'ceramic_white') {
      (armor as THREE.MeshStandardMaterial).color.setHex(0xf8fafc);
      (armor as THREE.MeshStandardMaterial).roughness = 0.16;
      (armor as THREE.MeshStandardMaterial).metalness = 0.15;
      targetMat = armor;
    } else if (armorFinish === 'acrylic_translucent') {
      targetMat = acrylic;
    } else if (armorFinish === 'carbon_stealth') {
      (armor as THREE.MeshStandardMaterial).color.setHex(0x1a1e29);
      (armor as THREE.MeshStandardMaterial).roughness = 0.45;
      (armor as THREE.MeshStandardMaterial).metalness = 0.35;
      targetMat = armor;
    } else if (armorFinish === 'titanium_gold') {
      (armor as THREE.MeshStandardMaterial).color.setHex(0xfacc15);
      (armor as THREE.MeshStandardMaterial).roughness = 0.15;
      (armor as THREE.MeshStandardMaterial).metalness = 0.92;
      targetMat = armor;
    }

    (targetMat as THREE.MeshStandardMaterial).wireframe = wireframeMode;
    (darkChassis as THREE.MeshStandardMaterial).wireframe = wireframeMode;

    // Traverse scene and swap armor meshes
    sceneRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.name === 'ChestArmor' || child.name === 'Cranium') {
          child.material = targetMat;
        }
      }
    });
  }, [armorFinish, wireframeMode]);

  const handleFinishChange = (finish: ArmorFinish) => {
    soundEffects.playCyberClick();
    setArmorFinish(finish);
  };

  const handleWireframeToggle = () => {
    soundEffects.playScannerPulse();
    setWireframeMode((prev) => !prev);
  };

  const resetCamera = () => {
    soundEffects.playCyberClick();
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.target.set(0, 0.45, 0);
    }
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-[#0a0b10] ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Cyber HUD Overlays (Non-blocking, top edge) */}
      <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-tech tracking-wider uppercase bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>CYBER-CORE 2050 // ACTIVE</span>
        </span>
        <span className="hidden sm:inline-block px-2 py-1 rounded-md text-[10px] font-tech bg-slate-900/60 border border-slate-700/40 text-slate-400">
          45 FPS PBR ENGINE
        </span>
      </div>

      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <button
          onClick={() => {
            soundEffects.playCyberClick();
            setIsAutoRotating((prev) => !prev);
          }}
          title={isAutoRotating ? 'Jeda Rotasi Otomatis' : 'Mulai Rotasi'}
          className={`p-2 rounded-lg border text-xs transition-all ${
            isAutoRotating
              ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
              : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
        </button>
        <button
          onClick={resetCamera}
          title="Reset Sudut Kamera"
          className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white text-xs"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Collapsible Ergonomic Bottom Control Dock (Follows 3D Skill Directives) */}
      {showControls && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-10">
          <div className="p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 shadow-2xl flex flex-wrap items-center justify-between gap-2">
            {/* Armor Material Finish Selector */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] uppercase font-tech text-slate-400 mr-1 hidden sm:inline">Armor:</span>
              <button
                onClick={() => handleFinishChange('acrylic_translucent')}
                className={`px-2 py-1 rounded text-[11px] font-tech transition-all ${
                  armorFinish === 'acrylic_translucent'
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Akrilik
              </button>
              <button
                onClick={() => handleFinishChange('ceramic_white')}
                className={`px-2 py-1 rounded text-[11px] font-tech transition-all ${
                  armorFinish === 'ceramic_white'
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Keramik
              </button>
              <button
                onClick={() => handleFinishChange('carbon_stealth')}
                className={`px-2 py-1 rounded text-[11px] font-tech transition-all ${
                  armorFinish === 'carbon_stealth'
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Karbon
              </button>
            </div>

            {/* Wireframe / X-Ray Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleWireframeToggle}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-tech border transition-all ${
                  wireframeMode
                    ? 'bg-cyan-500 text-black font-semibold border-cyan-300'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-cyan-500/40'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>{wireframeMode ? 'Solid' : 'X-Ray'}</span>
              </button>

              {/* Exploded View Slider */}
              <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-800">
                <span className="text-[10px] font-tech text-slate-400">Pecah:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={explodedRatio}
                  onChange={(e) => setExplodedRatio(parseFloat(e.target.value))}
                  className="w-16 h-1 accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
