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
          {/* One continuous dusk scene: open dunes and calm sky on the left (copy side), then Giza,
              Istanbul and Dubai on a shared low horizon (~69% of the image). Portrait crops centre on the
              pyramids; tablet and desktop crops keep the horizon below the copy and above the search panel. */}
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

      {/* Light, localized scrims. The copy side of the image is open sky and dunes, so the desktop
          copy gradient deepens the dusk there without covering any landmark. */}
      <div
        className="absolute inset-0 z-20 transition-colors duration-500"
        style={{ background: `linear-gradient(90deg, rgba(4,17,29,${isLight ? 0.36 : 0.46}) 0%, rgba(4,17,29,0.12) 38%, transparent 56%)` }}
      />
      {/* Desktop copy gradient, anchored to the copy column (container gutter + max-w-lg paragraph). */}
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
      {/* Narrow screens stack copy over the brightest sunset band, so they get a gentle vertical veil. */}
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
