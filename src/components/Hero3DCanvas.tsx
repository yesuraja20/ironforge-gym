"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Hero3DCanvasProps {
  className?: string;
}

export default function Hero3DCanvas({ className = "" }: Hero3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Detect mobile or reduced-motion preference
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        setIsLowPower(true);
        return;
      }
    }

    const currentMount = mountRef.current;
    if (!currentMount) return;

    // WebGL support check
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setIsSupported(false);
        return;
      }
    } catch {
      setIsSupported(false);
      return;
    }

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    currentMount.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x0f111a, 2.5);
    scene.add(ambientLight);

    // Cool metallic key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Dramatic Crimson Rim Light
    const crimsonRimLight = new THREE.PointLight(0xff1e27, 8.0, 15);
    crimsonRimLight.position.set(-4.5, -2, 2.5);
    scene.add(crimsonRimLight);

    // Second Crimson Top Accent Light
    const redAccentLight = new THREE.DirectionalLight(0xff3344, 2.8);
    redAccentLight.position.set(2, -4, -3);
    scene.add(redAccentLight);

    // BRAND EMBLEM GROUP
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // 1. OUTER FORGED HEXAGONAL BEZEL (Refined Heavy Steel)
    const outerRadius = 2.1;
    const innerRadius = 1.7;
    const ringGeo = new THREE.RingGeometry(innerRadius, outerRadius, 6);
    // Extrude hexagon
    const extrudeSettings = {
      steps: 1,
      depth: 0.35,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelOffset: 0,
      bevelSegments: 4,
    };

    // Shape for hexagon plate
    const hexShape = new THREE.Shape();
    const sides = 6;
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 6;
      const x = Math.cos(angle) * outerRadius;
      const y = Math.sin(angle) * outerRadius;
      if (i === 0) hexShape.moveTo(x, y);
      else hexShape.lineTo(x, y);
    }
    hexShape.closePath();

    // Hexagon Hole for inner cut
    const hexHole = new THREE.Path();
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 6;
      const x = Math.cos(angle) * innerRadius;
      const y = Math.sin(angle) * innerRadius;
      if (i === 0) hexHole.moveTo(x, y);
      else hexHole.lineTo(x, y);
    }
    hexHole.closePath();
    hexShape.holes.push(hexHole);

    const hexGeometry = new THREE.ExtrudeGeometry(hexShape, extrudeSettings);
    hexGeometry.center();

    // Brushed Metallic Material
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0xd9e2ec,
      metalness: 0.94,
      roughness: 0.22,
    });

    const outerHexMesh = new THREE.Mesh(hexGeometry, steelMaterial);
    emblemGroup.add(outerHexMesh);

    // 2. INNER STEEL SHIELD CORE (Dark Titanium with crimson accents)
    const coreGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.2, 32);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x14161f,
      metalness: 0.85,
      roughness: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMaterial);
    coreMesh.rotation.x = Math.PI / 2;
    emblemGroup.add(coreMesh);

    // 3. CENTRAL FORGED "IRONFORGE" BARBELL / MONOGRAM
    const barbellBarGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.2, 16);
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.1,
    });
    const barMesh = new THREE.Mesh(barbellBarGeo, chromeMaterial);
    barMesh.rotation.z = Math.PI / 4;
    barMesh.position.z = 0.22;
    emblemGroup.add(barMesh);

    // Left & Right Plate Collars on Barbell
    const plateGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.12, 24);
    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0xff1e27,
      metalness: 0.7,
      roughness: 0.25,
      emissive: 0x770005,
      emissiveIntensity: 0.4,
    });

    const leftPlate = new THREE.Mesh(plateGeo, plateMaterial);
    leftPlate.rotation.z = Math.PI / 4;
    leftPlate.position.set(-0.65, 0.65, 0.22);
    emblemGroup.add(leftPlate);

    const rightPlate = new THREE.Mesh(plateGeo, plateMaterial);
    rightPlate.rotation.z = Math.PI / 4;
    rightPlate.position.set(0.65, -0.65, 0.22);
    emblemGroup.add(rightPlate);

    // 4. FLOATING FORGE SPARK PARTICLES
    const particleCount = window.innerWidth < 768 ? 40 : 90;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      particleSpeeds[i] = 0.005 + Math.random() * 0.012;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff3b44,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // MOUSE PARALLAX INTERACTION
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 2;
      mouseY = y * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // RESIZE LISTENER
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth idle rotation + mouse tilt
      targetRotationY = elapsedTime * 0.4 + mouseX * 0.5;
      targetRotationX = Math.sin(elapsedTime * 0.3) * 0.15 - mouseY * 0.35;

      emblemGroup.rotation.y += (targetRotationY - emblemGroup.rotation.y) * 0.05;
      emblemGroup.rotation.x += (targetRotationX - emblemGroup.rotation.x) * 0.05;

      // Subtle breathing float on Z/Y
      emblemGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12;

      // Pulse crimson point light
      crimsonRimLight.intensity = 7.0 + Math.sin(elapsedTime * 2.5) * 2.0;

      // Animate particles rising upward
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i];
        if (positions[i * 3 + 1] > 3.5) {
          positions[i * 3 + 1] = -3.5;
          positions[i * 3] = (Math.random() - 0.5) * 8;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      hexGeometry.dispose();
      coreGeo.dispose();
      barbellBarGeo.dispose();
      plateGeo.dispose();
      particleGeometry.dispose();
      steelMaterial.dispose();
      coreMaterial.dispose();
      chromeMaterial.dispose();
      plateMaterial.dispose();
      particleMaterial.dispose();
    };
  }, []);

  if (!isSupported || isLowPower) {
    // Elegant fallback: SVG/Image metallic emblem with subtle CSS pulse
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-crimson/20 blur-3xl animate-pulse" />
          <div className="relative w-64 h-64 border-2 border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm bg-obsidian-800/40">
            <div className="w-52 h-52 border border-crimson/40 rounded-full flex items-center justify-center rotate-45">
              <div className="w-40 h-40 border border-white/30 flex items-center justify-center">
                <span className="text-4xl font-extrabold tracking-widest text-metal">IF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`w-full h-full relative cursor-grab active:cursor-grabbing select-none pointer-events-auto ${className}`}
      aria-label="Interactive 3D Forged Ironforge Emblem"
    />
  );
}
