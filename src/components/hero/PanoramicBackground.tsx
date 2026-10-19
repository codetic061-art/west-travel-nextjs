"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DESTINATIONS_CONFIG, type DestinationId } from "@/config/destinations";
import { useHero } from "./HeroProvider";

/**
 * Recreates the reference's dramatic three-destination diagonal panoramic composition:
 * - Left Slice: Egypt (Giza Pyramids & golden sunset over desert palms)
 * - Center Diagonal Slice: Türkiye (Istanbul Blue Mosque & illuminated Bosphorus ferry)
 * - Right Slice: Dubai (Burj Khalifa & glowing modern skyline)
 *
 * When a destination card is selected, smoothly crossfades to that destination's
 * full-bleed high-resolution poster image and lazy-loads only the selected
 * destination's muted, inline, looping background video (respecting prefers-reduced-motion
 * and mobile data-saver preferences).
 */
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
  const egypt = DESTINATIONS_CONFIG.find((d) => d.id === "egypt")!;
  const turkiye = DESTINATIONS_CONFIG.find((d) => d.id === "turkiye")!;
  const dubai = DESTINATIONS_CONFIG.find((d) => d.id === "dubai")!;
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
      {/* 1. Base Three-Destination Diagonal Panoramic Composition */}
      <div
        className={`relative h-full w-full transition-opacity duration-700 ease-out ${
          activeDestination ? "opacity-25" : "opacity-100"
        } ${isLight ? "brightness-[1.06] saturate-[1.04]" : "brightness-100"}`}
      >
        {/* Left Panoramic Zone — EGYPT (Giza Pyramids & Golden Sunset Sky) */}
        <div
          className="absolute inset-y-0 left-0 w-full md:w-[56%] transition-transform duration-700 ease-out"
          style={{
            transform: reducedMotion
              ? undefined
              : `translate3d(${pointerOffset.x * -0.4}px, ${pointerOffset.y * -0.3}px, 0) scale(1.02)`,
          }}
        >
          <Image
            src={egypt.heroImageWebp}
            alt={t.destinations.egypt.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 56vw"
            className="object-cover"
            style={{ objectPosition: egypt.sliceObjectPosition }}
          />
        </div>

        {/* Center Diagonal Zone — TÜRKİYE (Istanbul Mosque Skyline & Illuminated Bosphorus Ferry) */}
        <div
          className="hidden md:block absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            clipPath: "polygon(52.5% 0%, 84.5% 0%, 69.5% 100%, 36.5% 100%)",
            WebkitMaskImage:
              "linear-gradient(106deg, transparent 34%, rgba(0,0,0,0.92) 41%, black 45%, black 75%, rgba(0,0,0,0.9) 80%, transparent 86%)",
            maskImage:
              "linear-gradient(106deg, transparent 34%, rgba(0,0,0,0.92) 41%, black 45%, black 75%, rgba(0,0,0,0.9) 80%, transparent 86%)",
            transform: reducedMotion
              ? undefined
              : `translate3d(${pointerOffset.x * 0.2}px, ${pointerOffset.y * -0.2}px, 0) scale(1.02)`,
          }}
        >
          <div className="absolute inset-y-0 left-[31%] w-[56%]">
            <Image
              src={turkiye.heroImageWebp}
              alt={t.destinations.turkiye.imageAlt}
              fill
              priority
              sizes="56vw"
              className="object-cover"
              style={{ objectPosition: turkiye.sliceObjectPosition }}
            />
          </div>
        </div>

        {/* Right Panoramic Zone — DUBAI (Burj Khalifa & Blue-Hour Waterfront Skyline) */}
        <div
          className="hidden md:block absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            clipPath: "polygon(82.5% 0%, 100% 0%, 100% 100%, 67.5% 100%)",
            WebkitMaskImage:
              "linear-gradient(106deg, transparent 65%, rgba(0,0,0,0.9) 71%, black 76%, black 100%)",
            maskImage:
              "linear-gradient(106deg, transparent 65%, rgba(0,0,0,0.9) 71%, black 76%, black 100%)",
            transform: reducedMotion
              ? undefined
              : `translate3d(${pointerOffset.x * 0.45}px, ${pointerOffset.y * 0.25}px, 0) scale(1.02)`,
          }}
        >
          <div className="absolute inset-y-0 left-[58%] w-[42%]">
            <Image
              src={dubai.heroImageWebp}
              alt={t.destinations.dubai.imageAlt}
              fill
              priority
              sizes="42vw"
              className="object-cover"
              style={{ objectPosition: dubai.sliceObjectPosition }}
            />
          </div>
        </div>

        {/* Aligned Architectural Diagonal Seam Lines (SVG matches exact polygon percentages at every aspect ratio) */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="hidden md:block absolute inset-0 h-full w-full pointer-events-none"
        >
          <defs>
            <linearGradient id="seam-gold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.18" />
              <stop offset="48%" stopColor="#F4C266" stopOpacity="0.52" />
              <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.22" />
            </linearGradient>
            <linearGradient id="seam-teal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.16" />
              <stop offset="50%" stopColor="#5EEAD4" stopOpacity="0.40" />
              <stop offset="100%" stopColor="#E5A93C" stopOpacity="0.24" />
            </linearGradient>
          </defs>
          {/* Seam 1: Egypt -> Türkiye */}
          <line
            x1="53"
            y1="0"
            x2="37"
            y2="100"
            stroke="url(#seam-gold)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          {/* Seam 2: Türkiye -> Dubai */}
          <line
            x1="83.2"
            y1="0"
            x2="68.2"
            y2="100"
            stroke="url(#seam-teal)"
            strokeWidth="1.1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
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

      {/* 3. Carefully Tuned Atmospheric Readability Overlays (Dark & Light Mode) */}
      <div
        className={`absolute inset-0 z-20 transition-colors duration-500 ${
          isLight
            ? "bg-gradient-to-r from-[#051524]/78 via-[#071D30]/32 to-[#061828]/42"
            : "bg-gradient-to-r from-[#04101C]/88 via-[#061829]/36 to-[#041220]/64"
        }`}
      />

      {/* Top & Bottom Vignette Scrims for Navbar and Booking Bar */}
      <div
        className={`absolute inset-0 z-20 ${
          isLight
            ? "bg-gradient-to-b from-[#051422]/45 via-transparent to-[#051422]/68"
            : "bg-gradient-to-b from-[#030E18]/72 via-transparent to-[#030E18]/88"
        }`}
      />
    </div>
  );
}
