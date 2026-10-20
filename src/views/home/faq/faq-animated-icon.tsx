"use client";

import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";

export interface FaqAnimatedIconProps {
  id: string;
  className?: string;
}

/**
 * Cyberpunk / technical animated SVG icons for the FAQ section.
 *
 * All motion is driven by @react-spring/web and responds dynamically
 * to hover states and user interactions.
 */
export const FaqAnimatedIcon = ({ id, className = "" }: FaqAnimatedIconProps) => {
  const [hovered, setHovered] = useState(false);

  // Smooth spring for primary transforms (rotation, scale, displacement)
  const spring = useSpring({
    transform: hovered ? "scale(1.15)" : "scale(1)",
    rotate: hovered ? 180 : 0,
    opacity: hovered ? 1 : 0.65,
    pulse: hovered ? 1 : 0,
    config: { tension: 280, friction: 20 },
  });

  // Secondary counter-spring for multi-layered mechanical interaction
  const secondarySpring = useSpring({
    rotate: hovered ? -180 : 0,
    expand: hovered ? 2.5 : 0,
    glow: hovered ? 1 : 0.4,
    config: { tension: 220, friction: 18 },
  });

  const renderIcon = () => {
    switch (id) {
      case "01":
      case "size":
        // 01 — SIZING & FIT (Targeting Reticle & Calipers)
        return (
          <svg
            viewBox="0 0 28 28"
            fill="none"
            className="size-6 shrink-0 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Corner guide brackets that expand on hover */}
            <animated.path
              d={secondarySpring.expand.to(
                (e) =>
                  `M ${3 - e * 0.4} ${8 - e * 0.4} V ${3 - e * 0.4} H ${8 - e * 0.4}`
              )}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <animated.path
              d={secondarySpring.expand.to(
                (e) =>
                  `M ${20 + e * 0.4} ${3 - e * 0.4} H ${25 + e * 0.4} V ${8 - e * 0.4}`
              )}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <animated.path
              d={secondarySpring.expand.to(
                (e) =>
                  `M ${25 + e * 0.4} ${20 + e * 0.4} V ${25 + e * 0.4} H ${20 + e * 0.4}`
              )}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <animated.path
              d={secondarySpring.expand.to(
                (e) =>
                  `M ${8 - e * 0.4} ${25 + e * 0.4} H ${3 - e * 0.4} V ${20 + e * 0.4}`
              )}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Central measuring dimension calipers */}
            <path
              d="M7 14H21"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeDasharray="2 2"
            />
            <path
              d="M14 7V21"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeDasharray="2 2"
            />
            <animated.circle
              cx="14"
              cy="14"
              r="3"
              strokeWidth="1.5"
              fill="currentColor"
              fillOpacity={secondarySpring.glow}
            />
          </svg>
        );

      case "02":
      case "materials":
        // 02 — TECHNICAL MATERIALS (Layered Isometric Hex Lattice)
        return (
          <svg
            viewBox="0 0 28 28"
            fill="none"
            className="size-6 shrink-0 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Hexagon */}
            <animated.polygon
              points="14,3 24,8.5 24,19.5 14,25 4,19.5 4,8.5"
              strokeWidth="1.5"
              strokeLinejoin="round"
              style={{
                transformOrigin: "14px 14px",
                transform: spring.rotate.to((r) => `rotate(${r * 0.5}deg)`),
              }}
            />
            {/* Isometric interior cubes & struts */}
            <path
              d="M14 25V14M14 14L4 8.5M14 14L24 8.5"
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
            <animated.circle
              cx="14"
              cy="14"
              r="2"
              fill="currentColor"
              fillOpacity={spring.pulse.to((p) => 0.4 + p * 0.6)}
            />
          </svg>
        );

      case "03":
      case "care":
        // 03 — GARMENT CARE (Delicate Thermal Shield & Sparkle Beacon)
        return (
          <svg
            viewBox="0 0 28 28"
            fill="none"
            className="size-6 shrink-0 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Protective wash crest / basin */}
            <path
              d="M4 10L6.5 21.5C6.8 22.8 7.9 23.8 9.2 23.8H18.8C20.1 23.8 21.2 22.8 21.5 21.5L24 10"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Animated hydro-thermal wave */}
            <animated.path
              d="M4 13.5C7 11.5 9.5 15 14 13.5C18.5 12 21 15 24 13.5"
              strokeWidth="1.25"
              strokeLinecap="round"
              style={{
                transformOrigin: "14px 13.5px",
                transform: secondarySpring.expand.to((e) => `translateY(${e * 0.4}px)`),
              }}
            />
            {/* Top sparkle star nodes */}
            <animated.g
              style={{
                transformOrigin: "14px 5px",
                transform: spring.pulse.to((p) => `scale(${1 + p * 0.3})`),
              }}
            >
              <path d="M14 2V8M11 5H17" strokeWidth="1.25" strokeLinecap="round" />
            </animated.g>
            <path d="M6.5 5L8.5 7" strokeWidth="1" strokeLinecap="round" />
            <path d="M21.5 5L19.5 7" strokeWidth="1" strokeLinecap="round" />
          </svg>
        );

      case "04":
      case "shipping":
        // 04 — GLOBAL SHIPPING (Orbital Radar & Trajectory Globe)
        return (
          <svg
            viewBox="0 0 28 28"
            fill="none"
            className="size-6 shrink-0 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Globe Circle */}
            <circle cx="14" cy="14" r="10.5" strokeWidth="1.5" />
            {/* Equator */}
            <path d="M3.5 14H24.5" strokeWidth="1" strokeDasharray="2 1.5" />
            {/* Rotating Orbital Ellipse */}
            <animated.ellipse
              cx="14"
              cy="14"
              rx="4.5"
              ry="10.5"
              strokeWidth="1.25"
              style={{
                transformOrigin: "14px 14px",
                transform: spring.rotate.to((r) => `rotate(${r}deg)`),
              }}
            />
            {/* Transiting satellite marker blip */}
            <animated.circle
              cx="14"
              cy="3.5"
              r="2"
              fill="currentColor"
              style={{
                transformOrigin: "14px 14px",
                transform: spring.rotate.to((r) => `rotate(${r}deg)`),
              }}
            />
          </svg>
        );

      case "05":
      case "returns":
      default:
        // 05 — RETURNS & EXCHANGE (Dual Orbital Sync Arrows)
        return (
          <svg
            viewBox="0 0 28 28"
            fill="none"
            className="size-6 shrink-0 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Clockwise top arc arrow */}
            <animated.g
              style={{
                transformOrigin: "14px 14px",
                transform: spring.rotate.to((r) => `rotate(${r}deg)`),
              }}
            >
              <path
                d="M5 14C5 9.02944 9.02944 5 14 5C17.5 5 20.5 7 22 10"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M23 5.5V10.5H18"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </animated.g>

            {/* Counter-clockwise bottom arc arrow */}
            <animated.g
              style={{
                transformOrigin: "14px 14px",
                transform: secondarySpring.rotate.to((r) => `rotate(${r}deg)`),
              }}
            >
              <path
                d="M23 14C23 18.9706 18.9706 23 14 23C10.5 23 7.5 21 6 18"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M5 22.5V17.5H10"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </animated.g>

            {/* Core sync beacon */}
            <animated.circle
              cx="14"
              cy="14"
              r="2"
              fill="currentColor"
              fillOpacity={spring.pulse.to((p) => 0.5 + p * 0.5)}
            />
          </svg>
        );
    }
  };

  return (
    <animated.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={spring}
      className={`relative flex items-center justify-center text-hero-content-muted transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-hero-content ${className}`}
    >
      {renderIcon()}
    </animated.div>
  );
};
