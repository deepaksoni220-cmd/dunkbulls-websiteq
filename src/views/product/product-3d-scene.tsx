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
  SRGBColorSpace,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

export type ProductColorway = "black" | "off-white" | "qest-wite";

export interface Product3DSceneProps {
  colorway: ProductColorway;
  className?: string;
}

const COLORWAY_MODELS: Record<ProductColorway, string> = {
  black: "/assets/models/dunkbulls-Low_T-shirt_black.glb",
  "off-white": "/assets/models/Low_T-shirt_offwhite.glb",
  "qest-wite": "/assets/models/Low_T-shirt_white.glb",
};

export const Product3DScene = ({
  colorway = "black",
  className = "",
}: Product3DSceneProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let disposed = false;
    let animId = 0;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new Scene();
    const camera = new PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.6);

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
    renderer.toneMappingExposure = 1.0;

    // Studio lighting designed specifically for fabric texture & depth
    const ambientLight = new AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    // Warm key light from top-front-right
    const keyLight = new DirectionalLight(0xfff5e4, 1.6);
    keyLight.position.set(3.5, 4.0, 3.5);
    scene.add(keyLight);

    // Soft warm neutral fill light from front-left (prevents color-washing of off-white)
    const fillLight = new DirectionalLight(0xfaf7f0, 0.85);
    fillLight.position.set(-3.5, 1.5, 2.5);
    scene.add(fillLight);

    // Rim light defining shoulder & collar silhouette
    const rimLight = new DirectionalLight(0xffffff, 1.1);
    rimLight.position.set(0.0, 4.5, -3.5);
    scene.add(rimLight);

    // Subtle upward bounce light
    const bounceLight = new DirectionalLight(0xfff9f0, 0.4);
    bounceLight.position.set(0.0, -3.0, 2.0);
    scene.add(bounceLight);

    const pivot = new Object3D();
    scene.add(pivot);

    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotY = 0;
    let rotX = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const modelPath = COLORWAY_MODELS[colorway] || COLORWAY_MODELS.black;

    const onModelLoaded = (model: Object3D) => {
      if (disposed) return;

      model.traverse((child) => {
        if (!(child instanceof Mesh)) return;

        const upgradeMat = (source: MeshStandardMaterial) => {
          if (source.map) {
            source.map.colorSpace = SRGBColorSpace;
          }
          return new MeshPhysicalMaterial({
            color: 0xffffff,
            map: source.map,
            metalness: 0.0,
            roughness: 0.86,
            sheen: colorway === "black" ? 0.2 : colorway === "off-white" ? 0.22 : 0.35,
            sheenRoughness: 0.85,
            sheenColor: new Color(
              colorway === "black"
                ? 0x22242a
                : colorway === "off-white"
                ? 0xdfd8cc
                : 0xffffff
            ),
            side: DoubleSide,
          });
        };

        if (Array.isArray(child.material)) {
          child.material = child.material.map((m) => upgradeMat(m as MeshStandardMaterial));
        } else if (child.material) {
          child.material = upgradeMat(child.material as MeshStandardMaterial);
        }
      });

      // Accurately center and frame the t-shirt within viewport
      const box = new Box3().setFromObject(model);
      const center = box.getCenter(new Vector3());
      const size = box.getSize(new Vector3());
      const maxDim = Math.max(size.x, size.y, size.z) || 1;

      // Scale to 2.2 to leave balanced top & bottom margin
      const scale = 2.2 / maxDim;

      model.position.set(
        -center.x * scale,
        -center.y * scale,
        -center.z * scale
      );
      model.scale.setScalar(scale);

      pivot.add(model);
      setLoading(false);
    };

    if (modelPath.endsWith(".obj")) {
      const lastSlash = modelPath.lastIndexOf("/");
      const basePath = lastSlash >= 0 ? modelPath.substring(0, lastSlash + 1) : "";
      const fileName = lastSlash >= 0 ? modelPath.substring(lastSlash + 1) : modelPath;
      const mtlName = fileName.replace(/\.obj$/i, ".mtl");

      const mtlLoader = new MTLLoader();
      if (basePath) mtlLoader.setPath(basePath);
      mtlLoader.load(
        mtlName,
        (materials) => {
          materials.preload();
          const objLoader = new OBJLoader();
          objLoader.setMaterials(materials);
          if (basePath) objLoader.setPath(basePath);
          objLoader.load(fileName, onModelLoaded, undefined, () => setLoading(false));
        },
        undefined,
        () => {
          const objLoader = new OBJLoader();
          if (basePath) objLoader.setPath(basePath);
          objLoader.load(fileName, onModelLoaded, undefined, () => setLoading(false));
        }
      );
    } else {
      const draco = new DRACOLoader().setDecoderPath("/draco/");
      const loader = new GLTFLoader().setDRACOLoader(draco);

      loader.load(
        modelPath,
        (gltf) => onModelLoaded(gltf.scene),
        undefined,
        () => {
          setLoading(false);
        }
      );
    }

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      setAutoRotate(false);
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      targetRotY += deltaX * 0.008;
      targetRotX = Math.max(-0.35, Math.min(0.35, targetRotX + deltaY * 0.006));
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    window.addEventListener("resize", onResize);

    const animate = () => {
      if (disposed) return;
      animId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging) {
        targetRotY += 0.006;
      }

      rotY += (targetRotY - rotY) * 0.08;
      rotX += (targetRotX - rotX) * 0.08;

      pivot.rotation.y = rotY;
      pivot.rotation.x = rotX;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);

      scene.traverse((obj) => {
        if (obj instanceof Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, [colorway, autoRotate]);

  return (
    <div
      ref={containerRef}
      className={`hero-lattice-panel relative flex aspect-square w-full items-center justify-center overflow-hidden border border-hero-rule select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="size-full cursor-grab active:cursor-grabbing touch-none"
      />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 font-mono text-hero-caption text-neutral-400">
          <span className="animate-pulse">LOADING 3D VIEW...</span>
        </div>
      )}

      <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase">
        <span className="size-2 animate-ping rounded-full bg-emerald-500" />
        <span>3D VIEW // {colorway.toUpperCase()}</span>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setAutoRotate((v) => !v)}
          className="border border-neutral-300 bg-white/90 px-2.5 py-1 font-mono text-xs font-bold text-neutral-800 shadow-sm transition hover:border-black hover:bg-black hover:text-white"
        >
          {autoRotate ? "PAUSE SPIN" : "AUTO SPIN"}
        </button>
      </div>

      <span className="absolute top-2 left-2 size-2 border-t border-l border-neutral-400" />
      <span className="absolute top-2 right-2 size-2 border-t border-r border-neutral-400" />
      <span className="absolute bottom-2 left-2 size-2 border-b border-l border-neutral-400" />
      <span className="absolute bottom-2 right-2 size-2 border-b border-r border-neutral-400" />
    </div>
  );
};
