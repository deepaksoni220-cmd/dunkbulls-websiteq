"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "dunkbull-entrance-seen";

/**
 * Fullscreen one-time cinematic entrance video before entering the store.
 * Remembers session so it only plays on the first visit.
 * Supports ?intro=1 query parameter to replay anytime.
 */
export const EntranceVideo = () => {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);
  // Sound is ON by default
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [audioBlockedByBrowser, setAudioBlockedByBrowser] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const forceReplay = window.location.search.includes("intro=1");
      const seen = !forceReplay && sessionStorage.getItem(STORAGE_KEY);
      if (!seen) {
        setActive(true);
        // Mark preloader as completed so the user experiences a direct transition to the hero
        sessionStorage.setItem("dunkbull-preloaded", "1");
      }
    } catch {
      // If sessionStorage is unavailable, bypass entrance gracefully
    }
  }, []);

  const dismiss = useCallback(() => {
    if (done) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setDone(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    // Remove from DOM after fade-out transition
    window.setTimeout(() => {
      setActive(false);
    }, 300);
  }, [done]);

  const unmute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1.0;
    video.play().catch(() => {});
    setAudioEnabled(true);
    setAudioBlockedByBrowser(false);
  }, []);

  const mute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    setAudioEnabled(false);
    setAudioBlockedByBrowser(false);
  }, []);

  const toggleSound = useCallback(
    (e?: React.SyntheticEvent) => {
      e?.stopPropagation();
      const video = videoRef.current;
      if (!video) return;
      if (!audioEnabled || video.muted) {
        unmute();
      } else {
        mute();
      }
    },
    [audioEnabled, unmute, mute]
  );

  useEffect(() => {
    if (!active || done) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
      } else if (e.key === "m" || e.key === "M") {
        toggleSound();
      } else if (audioBlockedByBrowser) {
        // Any keypress unlocks audio if blocked by browser
        unmute();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      root.style.overflow = prevOverflow;
    };
  }, [active, done, dismiss, audioBlockedByBrowser, toggleSound, unmute]);

  // Attempt unmuted audio autoplay by default
  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;

    // Audio ON by default
    video.muted = false;
    video.volume = 1.0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Browser allowed unmuted autoplay!
          setAudioEnabled(true);
          setAudioBlockedByBrowser(false);
        })
        .catch(() => {
          // Browser autoplay policy restricted unmuted playback until user interacts.
          // Play muted temporarily and prompt user to tap once to unlock the audio.
          video.muted = true;
          setAudioBlockedByBrowser(true);
          video.play().catch(() => {});
        });
    }
  }, [active]);

  if (!mounted || !active) return null;

  const handleBackdropClick = () => {
    if (audioBlockedByBrowser || !audioEnabled) {
      unmute();
    }
  };

  const onTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  };

  return (
    <div
      aria-label="DUNKBULL Entrance Experience"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      onPointerDown={handleBackdropClick}
      className={`fixed inset-0 z-[120] flex flex-col justify-between bg-black font-mono transition-opacity duration-[var(--duration-normal)] ease-entrance select-none ${
        audioBlockedByBrowser ? "cursor-pointer" : ""
      } ${done ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src="/assets/video/entrance.mp4"
        playsInline
        autoPlay
        muted={!audioEnabled || audioBlockedByBrowser}
        onTimeUpdate={onTimeUpdate}
        onEnded={dismiss}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Subtle vignette / overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/25" />

      {/* Central Unmute Prompt (visible only when browser policy forced muted playback) */}
      {audioBlockedByBrowser && !done && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              unmute();
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              unmute();
            }}
            aria-label="Tap anywhere to hear sound"
            className="pointer-events-auto group flex items-center gap-3.5 border border-white/60 bg-black/85 px-6 py-3.5 text-white shadow-2xl backdrop-blur-md transition duration-[var(--duration-fast)] ease-entrance hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer active:scale-95 animate-pulse"
          >
            <span className="text-xl select-none" aria-hidden="true">
              🔊
            </span>
            <div className="flex flex-col text-left">
              <span className="font-mono text-hero-caption leading-hero-display tracking-hero-caption font-bold uppercase">
                TAP ANYWHERE FOR SOUND
              </span>
              <span className="font-mono text-hero-caption leading-hero-caption text-white/70 group-hover:text-black/70">
                AUDIO IS ON • CLICK TO UNLOCK
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Top Header Controls */}
      <div className="relative z-10 flex items-center justify-between p-5 sm:p-8">
        <span className="text-hero-caption leading-hero-display tracking-hero-caption text-white/70 uppercase">
          [ DUNKBULL ORIGINALS ]
        </span>

        <button
          type="button"
          onClick={toggleSound}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={audioEnabled ? "Mute audio" : "Unmute audio"}
          className="flex items-center gap-2 border border-white/30 bg-black/50 px-3 py-1.5 text-hero-caption leading-hero-display text-white backdrop-blur-md transition duration-[var(--duration-fast)] ease-entrance hover:border-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white tap-area cursor-pointer"
        >
          <span aria-hidden="true">{audioEnabled && !audioBlockedByBrowser ? "🔊" : audioEnabled ? "🔈" : "🔇"}</span>
          <span>AUDIO:</span>
          <span className="font-bold">
            {audioEnabled && !audioBlockedByBrowser ? "ON" : audioEnabled ? "ON (TAP SCREEN)" : "MUTED"}
          </span>
        </button>
      </div>

      {/* Bottom Footer Controls */}
      <div className="relative z-10 flex flex-col gap-4 p-5 sm:p-8">
        <div className="flex items-end justify-between">
          <p className="hidden text-hero-caption leading-hero-display text-white/50 sm:block">
            PRESS [ESC] OR CLICK ENTER TO SKIP • [M] TO TOGGLE AUDIO
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              dismiss();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Enter store"
            className="group ml-auto flex items-center gap-3 border border-white/40 bg-black/60 px-5 py-3 text-hero-body leading-hero-display text-white backdrop-blur-md transition duration-[var(--duration-fast)] ease-entrance hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white tap-area cursor-pointer"
          >
            <span className="font-bold tracking-wider">ENTER STORE</span>
            <span className="transition-transform duration-[var(--duration-fast)] ease-entrance group-hover:translate-x-1">
              &rarr;
            </span>
          </button>
        </div>

        {/* Video progress indicator line */}
        <div className="h-0.5 w-full bg-white/20">
          <div
            className="h-full bg-white transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
