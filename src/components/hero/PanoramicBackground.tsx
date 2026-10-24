"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DESTINATIONS_CONFIG } from "@/config/destinations";
import {
  POSTER_HOLD_DURATION_MS,
  useDestinationVideoSequence,
} from "@/hooks/useDestinationVideoSequence";
import { useHero } from "./HeroProvider";

/**
 * Cohesive Panoramic Background & Interactive 3-Second Poster-to-Video Stage:
 * - Default state (`activeDestination === null`): Continuous dusk panorama across Egypt, Türkiye, and Dubai.
 * - Selected state (`"egypt"`, `"turkiye"`, or `"dubai"`):
 *   1. Immediately displays the selected destination's poster image (`hero-egypt-poster.jpg`,
 *      `hero-turkiye-poster.jpg`, or `hero-dubai-poster.jpg`).
 *   2. Keeps that poster visible for **exactly 3 seconds (`3000ms`)**.
 *   3. Loads ONLY the selected destination's `<video>` (`hero-egypt.mp4`, `hero-turkiye.mp4`,
 *      or `hero-dubai.mp4`) with `preload="metadata"`, `muted`, `playsInline`, and `loop`.
 *   4. After the 3-second interval — and once the video has reached a playable state —
 *      reveals the video with a smooth 880ms crossfade.
 *   5. If the video is still loading after 3 seconds, keeps showing the poster until playback
 *      is ready so no blank or black video frame is ever shown.
 *   6. Resets the 3-second timer and repeats the sequence whenever the destination changes.
 */
export function PanoramicBackground() {
  const { t, theme, activeDestination } = useHero();
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

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

  const {
    activeConfig,
    videoRef,
    shouldLoadVideo,
    isPosterHoldActive,
    isPosterHoldElapsed,
    isVideoPlayable,
    isVideoRevealed,
    isWaitingForVideoAfterHold,
    isPosterFallbackActive,
    posterHoldDurationMs,
    sequenceTick,
    handleVideoLoadedData,
    handleVideoCanPlay,
    handleVideoPlaying,
    handleVideoError,
  } = useDestinationVideoSequence({
    activeDestinationId: activeDestination,
    reducedMotion,
    posterHoldDurationMs: POSTER_HOLD_DURATION_MS,
  });

  const isLight = theme === "light";
  const scaleValue = reducedMotion ? 1 : hasEntered ? 1.03 : 1.07;

  return (
    <div
      aria-hidden="true"
      data-active-destination={activeDestination ?? "panoramic"}
      data-active-poster-src={activeConfig ? activeConfig.posterImageJpg : "none"}
      data-active-video-src={activeConfig ? activeConfig.videoMp4 : "none"}
      data-active-canva-design={activeConfig ? activeConfig.canvaAsset.designId : "none"}
      data-poster-hold-duration-ms={posterHoldDurationMs}
      data-poster-hold-active={isPosterHoldActive ? "true" : "false"}
      data-poster-hold-elapsed={isPosterHoldElapsed ? "true" : "false"}
      data-video-playable={isVideoPlayable ? "true" : "false"}
      data-video-playing={isVideoRevealed ? "true" : "false"}
      data-waiting-for-video={isWaitingForVideoAfterHold ? "true" : "false"}
      data-poster-fallback={isPosterFallbackActive ? "true" : "false"}
      data-sequence-tick={sequenceTick}
      data-bg-entered={hasEntered ? "true" : "false"}
      className="pointer-events-none absolute inset-0 overflow-hidden select-none bg-[#04111D]"
    >
      {/* 1. Base Panoramic Backdrop (Egypt, Istanbul & Dubai horizon when no single destination is active) */}
      <div
        className={`relative h-full w-full transition-opacity duration-700 ease-out ${
          activeDestination
            ? "opacity-20"
            : hasEntered || reducedMotion
            ? "opacity-100"
            : "opacity-0"
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

      {/* 2. Immediate Destination Poster Layer (Shown immediately on selection and held for 3 full seconds, or longer if video is still buffering) */}
      {DESTINATIONS_CONFIG.map((dest) => {
        const isActive = activeDestination === dest.id;
        return (
          <div
            key={dest.id}
            data-destination-poster={dest.id}
            data-poster-src={dest.posterImageJpg}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isActive ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"
            } ${isLight ? "brightness-[1.05]" : "brightness-100"}`}
          >
            <Image
              src={dest.posterImageJpg}
              alt={t.destinations[dest.id].imageAlt}
              fill
              sizes="100vw"
              loading={isActive ? "eager" : "lazy"}
              fetchPriority={isActive ? "high" : "low"}
              priority={isActive && dest.id === "egypt"}
              className="object-cover transition-transform duration-1000 ease-out"
              style={{
                objectPosition: dest.objectPosition,
                transform: isActive && !reducedMotion ? "scale(1.02)" : "scale(1)",
              }}
            />
          </div>
        );
      })}

      {/* 3. Single Lazy-Loaded Background Video Element for the Active Destination Only (Revealed with smooth 880ms crossfade after 3-second poster hold + playable state) */}
      {activeConfig && shouldLoadVideo && (
        <div
          data-hero-video-layer={activeConfig.id}
          className={`absolute inset-0 z-[2] transition-opacity duration-[880ms] ease-in-out ${
            isVideoRevealed ? "opacity-100" : "opacity-0"
          } ${isLight ? "brightness-[1.04]" : "brightness-100"}`}
        >
          <video
            ref={videoRef}
            key={`${activeConfig.id}-${sequenceTick}`}
            src={activeConfig.videoMp4}
            poster={activeConfig.posterImageJpg}
            muted
            playsInline
            loop
            preload="metadata"
            onLoadedData={handleVideoLoadedData}
            onCanPlay={handleVideoCanPlay}
            onPlaying={handleVideoPlaying}
            onError={handleVideoError}
            className="h-full w-full object-cover"
            style={{ objectPosition: activeConfig.objectPosition }}
          >
            <source src={activeConfig.videoMp4} type="video/mp4" />
            <source src={activeConfig.videoMp4SecondaryPath} type="video/mp4" />
          </video>
        </div>
      )}

      {/* 4. Readability Scrims (Preserves Hero text, CTA, navigation, and search controls contrast) */}
      <div
        className="absolute inset-0 z-20 transition-colors duration-500"
        style={{
          background: `linear-gradient(90deg, rgba(4,17,29,${
            isLight ? 0.36 : 0.46
          }) 0%, rgba(4,17,29,0.12) 38%, transparent 56%)`,
        }}
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
        style={{
          background: `linear-gradient(to bottom, rgba(4,17,29,${
            isLight ? 0.22 : 0.32
          }), transparent)`,
        }}
      />
      <div
        className="absolute inset-0 z-20 lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(4,17,29,0.18) 35%, rgba(4,17,29,0.30) 62%, transparent 82%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-20 h-[24%]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(5,19,32,0.62) 58%, #051320)",
        }}
      />
    </div>
  );
}
