"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCw, ShieldCheck, Sparkles, Layers } from "lucide-react";

interface EquipmentPreset {
  id: string;
  name: string;
  type: string;
  weight: string;
  tolerance: string;
  materialName: string;
  description: string;
  finishHex: number;
}

const PRESETS: EquipmentPreset[] = [
  {
    id: "eleiko-disc",
    name: "Eleiko IWF Calibrated Competition Disc",
    type: "Olympic Free Weight",
    weight: "20.00 KG / 44.09 LBS",
    tolerance: "±10 Grams Certified",
    materialName: "Swedish High-Density Cast Steel & Matte Urethane",
    description: "Precision-lathed center hole with chrome friction-ring. Calibrated to Olympic IWF championship specifications.",
    finishHex: 0x1f232d,
  },
  {
    id: "crimson-disc",
    name: "Ironforge Custom Crimson Edition Disc",
    type: "Signature Master Plate",
    weight: "25.00 KG / 55.11 LBS",
    tolerance: "±5 Grams Calibrated",
    materialName: "Anodized Aerospace Titanium & Hardened Polyurethane",
    description: "Laser-etched numbered perimeter with knurled deep-dish grip edge designed for aggressive plate changes.",
    finishHex: 0xc81e28,
  },
  {
    id: "chrome-barbell",
    name: "Swedish Spring Steel Power Barbell",
    type: "20KG Calibrated Bar",
    weight: "20.00 KG / 29MM SHAFT",
    tolerance: "215,000 PSI Tensile Strength",
    materialName: "Dual Needle Bearings & Aggressive Mountain Knurling",
    description: "Zero whip at sub-maximal loads, explosive rebound elasticity at heavy pulls, micro-grooved chrome sleeves.",
    finishHex: 0xdde6ed,
  },
];

export default function Equipment3DViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePreset, setActivePreset] = useState<EquipmentPreset>(PRESETS[0]);
  const [isRotating, setIsRotating] = useState(true);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const discMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    currentMount.appendChild(renderer.domElement);

    // Studio lighting
    const ambient = new THREE.AmbientLight(0x141824, 2.0);
    scene.add(ambient);

    const topSpot = new THREE.SpotLight(0xffffff, 4.5);
    topSpot.position.set(3, 6, 4);
    topSpot.angle = Math.PI / 4;
    topSpot.penumbra = 0.5;
    scene.add(topSpot);

    const redRim = new THREE.PointLight(0xff1e27, 6.0, 12);
    redRim.position.set(-4, -1, 3);
    scene.add(redRim);

    const backFill = new THREE.DirectionalLight(0x718096, 1.5);
    backFill.position.set(0, -3, -4);
    scene.add(backFill);

    // Object Group
    const group = new THREE.Group();
    scene.add(group);
    meshGroupRef.current = group;

    // Outer Plate Ring
    const plateRadius = 1.8;
    const plateThickness = 0.35;
    const plateGeo = new THREE.CylinderGeometry(plateRadius, plateRadius, plateThickness, 64);
    plateGeo.rotateX(Math.PI / 2);

    const plateMat = new THREE.MeshStandardMaterial({
      color: activePreset.finishHex,
      metalness: 0.88,
      roughness: 0.28,
    });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    discMeshRef.current = plateMesh;
    group.add(plateMesh);

    // Center Chrome Ring (Barbell hole collar)
    const collarGeo = new THREE.CylinderGeometry(0.55, 0.55, plateThickness + 0.05, 32);
    collarGeo.rotateX(Math.PI / 2);
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.98,
      roughness: 0.12,
    });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    group.add(collarMesh);

    // Center Bore hole
    const holeGeo = new THREE.CylinderGeometry(0.3, 0.3, plateThickness + 0.08, 32);
    holeGeo.rotateX(Math.PI / 2);
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x08080a });
    const holeMesh = new THREE.Mesh(holeGeo, holeMat);
    group.add(holeMesh);

    // Inner bevel lip for grip
    const lipGeo = new THREE.TorusGeometry(1.2, 0.06, 16, 64);
    const lipMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.9,
      roughness: 0.2,
    });
    const lipMesh = new THREE.Mesh(lipGeo, lipMat);
    group.add(lipMesh);

    // Drag interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !meshGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      meshGroupRef.current.rotation.y += deltaX * 0.01;
      meshGroupRef.current.rotation.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Resize
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Render loop
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isRotating && !isDragging && meshGroupRef.current) {
        meshGroupRef.current.rotation.y += delta * 0.55;
        meshGroupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.8) * 0.15;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(reqId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      plateGeo.dispose();
      collarGeo.dispose();
      holeGeo.dispose();
      lipGeo.dispose();
      plateMat.dispose();
      collarMat.dispose();
      holeMat.dispose();
      lipMat.dispose();
    };
  }, []);

  // Update material color on preset change
  useEffect(() => {
    if (discMeshRef.current) {
      (discMeshRef.current.material as THREE.MeshStandardMaterial).color.setHex(activePreset.finishHex);
    }
  }, [activePreset]);

  return (
    <div className="w-full rounded-2xl glass-panel border border-white/10 overflow-hidden p-6 lg:p-10 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-crimson/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full h-80 sm:h-96 md:h-[420px] relative rounded-xl bg-obsidian-950/80 border border-white/5 flex items-center justify-center overflow-hidden">
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Canvas floating controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-silver-400 pointer-events-none">
              <span className="flex items-center gap-1.5 bg-obsidian-800/80 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
                <RotateCw className="w-3.5 h-3.5 text-crimson animate-spin" /> Click & drag to rotate 360°
              </span>
              <button
                type="button"
                onClick={() => setIsRotating((prev) => !prev)}
                className="pointer-events-auto bg-obsidian-800/90 hover:bg-obsidian-700 text-silver-300 hover:text-white px-3 py-1 rounded-full border border-white/10 transition-colors"
              >
                {isRotating ? "Pause Spin" : "Auto Spin"}
              </button>
            </div>
          </div>

          {/* Preset Selector tabs */}
          <div className="flex flex-wrap gap-2 mt-4 w-full justify-center">
            {PRESETS.map((preset) => {
              const active = preset.id === activePreset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setActivePreset(preset)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium tracking-wide uppercase transition-all flex items-center gap-2 border ${
                    active
                      ? "bg-crimson text-white border-crimson shadow-glow-red"
                      : "bg-obsidian-800/60 text-silver-400 border-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/30"
                    style={{ backgroundColor: `#${preset.finishHex.toString(16).padStart(6, "0")}` }}
                  />
                  {preset.name.split(" ")[0]} {preset.weight.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Technical Specifications */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-crimson/10 border border-crimson/30 text-crimson text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> Calibrated Bio-Mechanics
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {activePreset.name}
            </h3>
            <p className="text-sm text-silver-400 leading-relaxed">{activePreset.description}</p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-lg bg-obsidian-800/40 border border-white/5 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-crimson mt-0.5 shrink-0" />
              <div>
                <p className="text-xs uppercase text-silver-500 font-mono">Calibrated Weight & Scale</p>
                <p className="text-sm font-semibold text-white">{activePreset.weight}</p>
                <p className="text-xs text-silver-400">{activePreset.tolerance}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-obsidian-800/40 border border-white/5 flex items-start gap-3">
              <Layers className="w-5 h-5 text-silver-300 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs uppercase text-silver-500 font-mono">Metallurgy & Engineering</p>
                <p className="text-sm font-semibold text-white">{activePreset.materialName}</p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-silver-400">
            <span>Official Equipment Partner</span>
            <span className="font-mono text-silver-200 font-semibold tracking-wider">ELEIKO & ARSENAL STRENGTH</span>
          </div>
        </div>
      </div>
    </div>
  );
}
