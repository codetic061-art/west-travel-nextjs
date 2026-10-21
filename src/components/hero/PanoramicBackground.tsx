"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DESTINATIONS_CONFIG, type DestinationId } from "@/config/destinations";
import { useHero } from "./HeroProvider";

/**
 * Cohesive Panoramic Background & Interactive Destination Video Stage:
 * - Default state: One continuous dusk panorama across Egypt, Türkiye, and Dubai.
 * - Selected state (Egypt, Türkiye, or Dubai):
 *   1. Immediately crossfades to the destination's static poster (`posterImageWebp` / `heroImageWebp`).
 *   2. Mounts and loads ONLY the selected destination's `<video>` (`hero-egypt.mp4`, `hero-turkiye.mp4`, or `hero-dubai.mp4`).
 *   3. Smoothly crossfades the muted, inline, looping video above the poster once playback starts.
 *   4. Falls back cleanly to the poster on autoplay restriction, video error, `prefers-reduced-motion`, or `saveData`.
 */
export function PanoramicBackground() {
  const { t, theme, activeDestination } = useHero();
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [videoReadyFor, setVideoReadyFor] = useState<DestinationId | null>(null);
  const [videoErrorFor, setVideoErrorFor] = useState<DestinationId | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setHasEntered(true);
    } else {
      const raf = window.requestAnimationFrame(() => setHasEntered(true));
      return () => window.cancelAnimationFrame(raf);
    }
    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setHasEntered(true);
    };
    mediaQuery.addEventListener("change", handler);

    // Check Network Information API for data-saver mode on mobile
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (
      nav.connection?.saveData ||
      nav.connection?.effectiveType === "slow-2g" ||
      nav.connection?.effectiveType === "2g"
    ) {
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

  // Trigger lazy playback ONLY for the selected destination video
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

    try {
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
    } catch {
      setVideoErrorFor(activeDestination);
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

  const isPosterFallbackActive =
    Boolean(activeDestination) && (!shouldPlayVideo || videoErrorFor === activeDestination);

  const scaleValue = reducedMotion ? 1 : hasEntered ? 1.03 : 1.07;

  return (
    <div
      aria-hidden="true"
      data-active-destination={activeDestination ?? "panoramic"}
      data-active-video-src={activeConfig ? activeConfig.videoMp4 : "none"}
      data-active-canva-design={activeConfig ? activeConfig.canvaAsset.designId : "none"}
      data-video-playing={isVideoVisible ? "true" : "false"}
      data-poster-fallback={isPosterFallbackActive ? "true" : "false"}
      data-bg-entered={hasEntered ? "true" : "false"}
      className="pointer-events-none absolute inset-0 overflow-hidden select-none bg-[#04111D]"
    >
      {/* 1. Base Panoramic Backdrop (Egypt, Istanbul & Dubai horizon) */}
      <div
        className={`relative h-full w-full transition-opacity duration-700 ease-out ${
          activeDestination ? "opacity-20" : hasEntered || reducedMotion ? "opacity-100" : "opacity-0"
        } ${isLight ? "brightness-[1.06] saturate-[1.04]" : "brightness-100"}`}
      >
        <div
          className="absolute inset-0 transition-transform duration-1000 ease-out motion-reduce:transition-none"
          style={{
            transform: reducedMotion
              ? undefined
              : `translate3d(${pointerOffset.x * -0.4}px, ${pointerOffset.y * -0.3}px, 0) scale(${scaleValue})`,
          }}
        >
          <Image
            src="/images/west-travel/hero-cinematic-panorama.webp"
            alt=""
            fill
            priority
            quality={82}
            sizes="100vw"
            className="object-cover object-[36%_50%] sm:object-[50%_50%]"
          />
        </div>
      </div>

      {/* 2. Interactive Destination Spotlight Poster Crossfade Layer (Immediate display while video loads) */}
      {DESTINATIONS_CONFIG.map((dest) => {
        const isActive = activeDestination === dest.id;
        return (
          <div
            key={dest.id}
            data-destination-poster={dest.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            } ${isLight ? "brightness-[1.05]" : "brightness-100"}`}
          >
            <Image
              src={dest.posterImageWebp || dest.heroImageWebp}
              alt={t.destinations[dest.id].imageAlt}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-1000 ease-out"
              style={{
                objectPosition: dest.objectPosition,
                transform: isActive && !reducedMotion ? "scale(1.02)" : "scale(1)",
              }}
            />
          </div>
        );
      })}

      {/* 3. Single Lazy-Loaded Background Video Element for the Active Destination Only */}
      {activeConfig && shouldPlayVideo && (
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-700 ease-out ${
            isVideoVisible ? "opacity-100" : "opacity-0"
          } ${isLight ? "brightness-[1.04]" : "brightness-100"}`}
        >
          <video
            ref={videoRef}
            key={activeConfig.id}
            poster={activeConfig.posterImageJpg || activeConfig.heroImageJpg}
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
            onLoadedData={() => setVideoReadyFor(activeConfig.id)}
            onCanPlay={() => setVideoReadyFor(activeConfig.id)}
            onPlaying={() => setVideoReadyFor(activeConfig.id)}
            onError={() => setVideoErrorFor(activeConfig.id)}
            className="h-full w-full object-cover"
            style={{ objectPosition: activeConfig.objectPosition }}
          >
            <source src={activeConfig.videoMp4} type="video/mp4" />
          </video>
        </div>
      )}

      {/* 4. Readability Scrims (Preserves Hero text, CTA, navigation, and search controls contrast) */}
      <div
        className="absolute inset-0 z-20 transition-colors duration-500"
        style={{ background: `linear-gradient(90deg, rgba(4,17,29,${isLight ? 0.36 : 0.46}) 0%, rgba(4,17,29,0.12) 38%, transparent 56%)` }}
      />
      <div
        className="absolute inset-0 z-20 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,17,29,0.40) 0%, rgba(4,17,29,0.38) calc(max(48px, calc((100% - 1344px) / 2)) + 460px), rgba(4,17,29,0.16) calc(max(48px, calc((100% - 1344px) / 2)) + 620px), transparent calc(max(48px, calc((100% - 1344px) / 2)) + 800px))",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 z-20 h-[18%]"
        style={{ background: `linear-gradient(to bottom, rgba(4,17,29,${isLight ? 0.22 : 0.32}), transparent)` }}
      />
      <div
        className="absolute inset-0 z-20 lg:hidden"
        style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(4,17,29,0.18) 35%, rgba(4,17,29,0.30) 62%, transparent 82%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-20 h-[24%]"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(5,19,32,0.62) 58%, #051320)" }}
      />
    </div>
  );
}
