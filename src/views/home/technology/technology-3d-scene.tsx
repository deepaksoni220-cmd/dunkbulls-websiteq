"use client";

import { useEffect, useRef, useState } from "react";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Box3,
  Color,
  DirectionalLight,
  DoubleSide,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { subscribeToTicker } from "@/lib/animation/ticker";

export type Colorway = "black" | "off-white" | "white";

export interface Technology3DSceneProps {
  className?: string;
}

const COLORWAYS: Record<Colorway, { label: string; model: string }> = {
  black: {
    label: "OBSIDIAN BLACK",
    model: "/assets/models/dunkbulls-Low_T-shirt_black.glb",
  },
  "off-white": {
    label: "CHALK OFF-WHITE",
    model: "/assets/models/Low_T-shirt_offwhite.glb",
  },
  white: {
    label: "QEST WITE",
    model: "/assets/models/Low_T-shirt_white.glb",
  },
};

const STAGE_TELEMETRY = [
  {
    phase: "01",
    label: "260 GSM COMBED COTTON",
    spec: "WEIGHT: 260 GSM // PRE-SHRUNK // HIGH-DENSITY WEAVE",
    rotY: -0.22,
    rotX: 0.04,
    camZ: 4.1,
    camY: 0.0,
    targetY: 0.0,
  },
  {
    phase: "02",
    label: "TIGHT-SPUN DROP SHOULDER",
    spec: "KNIT: 24GG INTERLOCK // ZERO WARPING // FLATLOCK SEAMS",
    rotY: -0.62,
    rotX: 0.08,
    camZ: 3.3,
    camY: 0.18,
    targetY: 0.28,
  },
  {
    phase: "03",
    label: "1x1 TWIN-NEEDLE RIBBED COLLAR",
    spec: "COLLAR: 1x1 HIGH-RECOVERY // ZERO-SAG INTERNAL BINDING",
    rotY: 0.0,
    rotX: 0.28,
    camZ: 2.7,
    camY: 0.48,
    targetY: 0.62,
  },
  {
    phase: "04",
    label: "BREATHABLE NATURAL FIBER",
    spec: "FIBER: 100% ORGANIC COTTON // NATURAL THERMAL REGULATION",
    rotY: 0.78,
    rotX: -0.06,
    camZ: 3.7,
    camY: -0.08,
    targetY: -0.05,
  },
  {
    phase: "05",
    label: "CARBON SOFT-WASH FINISH",
    spec: "SURFACE: CARBON-WASHED // BROKEN-IN LUXURY HANDFEEL",
    rotY: 0.16,
    rotX: -0.08,
    camZ: 3.9,
    camY: -0.05,
    targetY: 0.0,
  },
];

const TRANSITION = "transition duration-[var(--duration-fast)] ease-entrance";

export const Technology3DScene = ({ className = "" }: Technology3DSceneProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [colorway, setColorway] = useState<Colorway>("black");
  const [activeStage, setActiveStage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const manualRotOffsetRef = useRef({ x: 0, y: 0 });

  // Scroll progress (0 to 1)
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let disposed = false;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const scene = new Scene();
    const camera = new PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.1);

    const renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // Studio Lighting
    const ambientLight = new AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new DirectionalLight(0xfff8ee, 1.6);
    keyLight.position.set(3.5, 4.0, 3.5);
    scene.add(keyLight);

    const fillLight = new DirectionalLight(0xf2f4f8, 0.9);
    fillLight.position.set(-3.5, 1.5, 2.5);
    scene.add(fillLight);

    const rimLight = new DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, -2.5, -3.0);
    scene.add(rimLight);

    const modelRoot = new Object3D();
    scene.add(modelRoot);

    // Current interpolated transforms
    const current = {
      rotX: STAGE_TELEMETRY[0].rotX,
      rotY: STAGE_TELEMETRY[0].rotY,
      camZ: STAGE_TELEMETRY[0].camZ,
      camY: STAGE_TELEMETRY[0].camY,
      targetY: STAGE_TELEMETRY[0].targetY,
    };

    // Load current colorway model
    const loader = new GLTFLoader();
    setLoading(true);

    loader.load(
      COLORWAYS[colorway].model,
      (gltf) => {
        if (disposed) return;

        // Clear existing children
        while (modelRoot.children.length > 0) {
          modelRoot.remove(modelRoot.children[0]);
        }

        const model = gltf.scene;

        model.traverse((child) => {
          if (child instanceof Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const prevMat = child.material as MeshStandardMaterial;
            if (prevMat?.map) {
              prevMat.map.colorSpace = SRGBColorSpace;
            }

            const newMat = new MeshPhysicalMaterial({
              color: 0xffffff,
              roughness: 0.85,
              metalness: 0.0,
              clearcoat: 0.0,
              sheen: colorway === "black" ? 0.25 : 0.2,
              sheenRoughness: 0.85,
              sheenColor: new Color(
                colorway === "black"
                  ? 0x22242a
                  : colorway === "off-white"
                  ? 0xdfd8cc
                  : 0xffffff
              ),
              map: prevMat?.map ?? null,
              side: DoubleSide,
            });

            child.material = newMat;
          }
        });

        // Center and scale model accurately into the focal frame
        const box = new Box3().setFromObject(model);
        const center = box.getCenter(new Vector3());
        const size = box.getSize(new Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 2.2 / maxDim;

        model.position.set(
          -center.x * scale,
          -center.y * scale,
          -center.z * scale
        );
        model.scale.setScalar(scale);

        modelRoot.add(model);
        setLoading(false);
        renderer.render(scene, camera);
      },
      undefined,
      (err) => {
        console.error("Failed to load 3D t-shirt model:", err);
        setLoading(false);
      },
    );

    // Subscribe to section scroll progress
    const unsubscribeTicker = subscribeToTicker(
      () => {
        if (disposed) return;

        // Find ancestor section
        const section = container.closest("section");
        if (section instanceof HTMLElement) {
          const travel = section.offsetHeight - window.innerHeight;
          if (travel > 0) {
            const p = Math.min(
              1,
              Math.max(0, -section.getBoundingClientRect().top / travel),
            );
            scrollProgressRef.current = p;

            // Determine active stage (0 to 4)
            const stageIdx = Math.min(
              STAGE_TELEMETRY.length - 1,
              Math.floor(p * STAGE_TELEMETRY.length),
            );
            setActiveStage(stageIdx);
          }
        }

        // Interpolate target pose based on continuous progress
        const p = scrollProgressRef.current;
        const total = STAGE_TELEMETRY.length - 1;
        const exactIdx = p * total;
        const i0 = Math.floor(exactIdx);
        const i1 = Math.min(total, i0 + 1);
        const blend = exactIdx - i0;

        const s0 = STAGE_TELEMETRY[i0];
        const s1 = STAGE_TELEMETRY[i1];

        const targetRotY = s0.rotY + (s1.rotY - s0.rotY) * blend + manualRotOffsetRef.current.y;
        const targetRotX = s0.rotX + (s1.rotX - s0.rotX) * blend + manualRotOffsetRef.current.x;
        const targetCamZ = s0.camZ + (s1.camZ - s0.camZ) * blend;
        const targetCamY = s0.camY + (s1.camY - s0.camY) * blend;
        const targetLookY = s0.targetY + (s1.targetY - s0.targetY) * blend;

        // Smooth damping
        const LERP = 0.08;
        current.rotY += (targetRotY - current.rotY) * LERP;
        current.rotX += (targetRotX - current.rotX) * LERP;
        current.camZ += (targetCamZ - current.camZ) * LERP;
        current.camY += (targetCamY - current.camY) * LERP;
        current.targetY += (targetLookY - current.targetY) * LERP;

        // Apply transforms
        modelRoot.rotation.y = current.rotY;
        modelRoot.rotation.x = current.rotX;
        camera.position.set(0, current.camY, current.camZ);
        camera.lookAt(0, current.targetY, 0);

        // Gradually decay manual rotation offset back to scroll posture
        if (!isDraggingRef.current) {
          manualRotOffsetRef.current.x *= 0.94;
          manualRotOffsetRef.current.y *= 0.94;
        }

        renderer.render(scene, camera);
      },
      () => 0,
    );

    // Drag / Touch rotation handlers
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = (e.clientX - dragStartRef.current.x) * 0.006;
      const dy = (e.clientY - dragStartRef.current.y) * 0.006;
      manualRotOffsetRef.current.y += dx;
      manualRotOffsetRef.current.x = Math.max(-0.6, Math.min(0.6, manualRotOffsetRef.current.x + dy));
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const dx = (e.touches[0].clientX - dragStartRef.current.x) * 0.008;
      const dy = (e.touches[0].clientY - dragStartRef.current.y) * 0.008;
      manualRotOffsetRef.current.y += dx;
      manualRotOffsetRef.current.x = Math.max(-0.6, Math.min(0.6, manualRotOffsetRef.current.x + dy));
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      disposed = true;
      unsubscribeTicker();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      renderer.dispose();
    };
  }, [colorway]);

  const currentStageInfo = STAGE_TELEMETRY[activeStage] ?? STAGE_TELEMETRY[0];

  return (
    <div
      ref={containerRef}
      className={`relative size-full select-none font-mono ${className}`}
    >
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="size-full cursor-grab active:cursor-grabbing"
      />

      {/* Cyberpunk / Brutalist HUD Overlay */}
      {/* Corner Brackets */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-2 left-2 size-4 border-t-2 border-l-2 border-hero-rule"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-2 right-2 size-4 border-t-2 border-r-2 border-hero-rule"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-2 left-2 size-4 border-b-2 border-l-2 border-hero-rule"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-2 right-2 size-4 border-b-2 border-r-2 border-hero-rule"
      />

      {/* Top Telemetry Bar */}
      <div className="pointer-events-none absolute top-4 inset-x-6 flex items-center justify-between text-hero-caption text-hero-content/60">
        <div className="flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="uppercase tracking-wider">
            ANATOMY SCAN // [ {currentStageInfo.phase} / 05 ]
          </span>
        </div>

        <span className="hidden sm:inline-block text-hero-content/40 uppercase">
          DRAG TO ROTATE // SCROLL TO EXAMINE
        </span>
      </div>

      {/* Bottom Technical Spec Callout */}
      <div className="pointer-events-none absolute bottom-4 inset-x-6 flex flex-col gap-1 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div className="flex flex-col">
          <span className="text-hero-caption font-bold text-hero-content uppercase">
            {currentStageInfo.label}
          </span>
          <span className="text-hero-fine text-hero-content/50 uppercase">
            {currentStageInfo.spec}
          </span>
        </div>

        {/* Interactive Colorway Selector */}
        <div className="pointer-events-auto flex items-center justify-center gap-1.5 pt-2 sm:pt-0">
          {(["black", "off-white", "white"] as Colorway[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColorway(c)}
              className={`border px-2 py-0.5 text-hero-caption uppercase ${TRANSITION} ${
                colorway === c
                  ? "border-hero-content bg-hero-content text-hero-surface font-bold"
                  : "border-hero-rule text-hero-content/60 hover:border-hero-content hover:text-hero-content"
              }`}
            >
              {c === "black" ? "BLK" : c === "off-white" ? "OFF-WHT" : "WHT"}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state indicator */}
      {loading && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-hero-surface/40 backdrop-blur-xs">
          <span className="text-hero-caption text-hero-content/50 uppercase tracking-widest animate-pulse">
            CALIBRATING 260 GSM MODEL...
          </span>
        </div>
      )}
    </div>
  );
};
