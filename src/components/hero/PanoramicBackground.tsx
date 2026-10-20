"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DESTINATIONS_CONFIG, type DestinationId } from "@/config/destinations";
import { useHero } from "./HeroProvider";

/** One continuous panorama; destination posters and lazy videos crossfade above it. */
export function PanoramicBackground() {
  const { t, theme, activeDestination } = useHero();
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [videoReadyFor, setVideoReadyFor] = useState<DestinationId | null>(null);
  const [videoErrorFor, setVideoErrorFor] = useState<DestinationId | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Check Network Information API for data-saver mode on mobile
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    if (nav.connection?.saveData) {
      setSaveData(true);
    }

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 5;
      setPointerOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion]);

  const shouldPlayVideo = Boolean(activeDestination && !reducedMotion && !saveData);

  // Trigger lazy playback only for the selected destination video
  useEffect(() => {
    setVideoReadyFor(null);
    setVideoErrorFor(null);

    if (!activeDestination || !shouldPlayVideo) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      return;
    }

    const vid = videoRef.current;
    if (!vid) return;

    vid.load();
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setVideoReadyFor(activeDestination);
        })
        .catch(() => {
          setVideoErrorFor(activeDestination);
        });
    }
  }, [activeDestination, shouldPlayVideo]);

  const isLight = theme === "light";
  const activeConfig = activeDestination
    ? DESTINATIONS_CONFIG.find((d) => d.id === activeDestination) ?? null
    : null;

  const isVideoVisible =
    Boolean(activeDestination) &&
    shouldPlayVideo &&
    videoReadyFor === activeDestination &&
    videoErrorFor !== activeDestination;

  return (
    <div
      aria-hidden="true"
      data-active-destination={activeDestination ?? "panoramic"}
      data-video-playing={isVideoVisible ? "true" : "false"}
      className="pointer-events-none absolute inset-0 overflow-hidden select-none bg-[#04111D]"
    >
      <div
        className={`relative h-full w-full transition-opacity duration-700 ease-out ${
          activeDestination ? "opacity-25" : "opacity-100"
        } ${isLight ? "brightness-[1.06] saturate-[1.04]" : "brightness-100"}`}
      >
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{
            transform: reducedMotion
              ? undefined
              : `translate3d(${pointerOffset.x * -0.4}px, ${pointerOffset.y * -0.3}px, 0) scale(1.03)`,
          }}
        >
          {/* Narrow crops favor the pyramids and mosque rather than the far-right skyline. */}
          <Image
            src="/images/west-travel/hero-panorama.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[30%_60%] md:object-[center_58%]"
          />
        </div>
      </div>

      {/* 2. Interactive Destination Spotlight Poster & Lazy Video Crossfade Layer */}
      {DESTINATIONS_CONFIG.map((dest) => {
        const isActive = activeDestination === dest.id;
        return (
          <div
            key={dest.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            } ${isLight ? "brightness-[1.05]" : "brightness-100"}`}
          >
            {/* Static High-Resolution Poster Fallback (always ready immediately) */}
            <Image
              src={dest.heroImageWebp}
              alt={t.destinations[dest.id].imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: dest.objectPosition }}
            />
          </div>
        );
      })}

      {/* Single Lazy-Loaded Background Video Element for the Active Destination */}
      {activeConfig && shouldPlayVideo && (
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-700 ease-out ${
            isVideoVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <video
            ref={videoRef}
            key={activeConfig.id}
            src={activeConfig.videoMp4}
            poster={activeConfig.heroImageJpg}
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
            onCanPlay={() => setVideoReadyFor(activeConfig.id)}
            onPlaying={() => setVideoReadyFor(activeConfig.id)}
            onError={() => setVideoErrorFor(activeConfig.id)}
            className="h-full w-full object-cover"
            style={{ objectPosition: activeConfig.objectPosition }}
          />
        </div>
      )}

      {/* Localized scrims leave the shared sky and landmark band luminous. */}
      <div
        className="absolute inset-0 z-20 transition-colors duration-500"
        style={{ background: `linear-gradient(90deg, rgba(4,17,29,${isLight ? 0.52 : 0.62}) 0%, rgba(4,17,29,0.18) 36%, transparent 58%)` }}
      />
      <div
        className="absolute inset-x-0 top-0 z-20 h-[24%]"
        style={{ background: `linear-gradient(to bottom, rgba(4,17,29,${isLight ? 0.28 : 0.36}), transparent)` }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-20 h-[30%]"
        style={{ background: "linear-gradient(to bottom, transparent, #051320)" }}
      />
    </div>
  );
}
