"use client";

import React, { useEffect, useRef, useState } from "react";

export interface UseSectionEntranceOptions {
  threshold?: number;
  rootMargin?: string;
  /** If true, triggers immediately after mount (used only for above-the-fold Hero/Navbar). */
  immediate?: boolean;
}

export interface SectionEntranceState<T extends HTMLElement = HTMLElement> {
  ref: React.RefObject<T | null>;
  hasEntered: boolean;
  reducedMotion: boolean;
}

/**
 * Reusable viewport-triggered entrance hook with `prefers-reduced-motion` support.
 * - Below-the-fold sections wait until they enter the viewport (`threshold: 0.16`, `rootMargin: "0px 0px -10% 0px"`)
 *   so animations never fire prematurely during initial page load.
 * - Runs once when first visible and never re-hides content on minor scroll movements.
 */
export function useSectionEntrance<T extends HTMLElement = HTMLElement>(
  options: UseSectionEntranceOptions = {}
): SectionEntranceState<T> {
  const {
    threshold = 0.16,
    rootMargin = "0px 0px -10% 0px",
    immediate = false,
  } = options;
  const ref = useRef<T | null>(null);
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) {
      setHasEntered(true);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setHasEntered(true);
      }
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || hasEntered) return;

    if (immediate) {
      const raf = window.requestAnimationFrame(() => {
        setHasEntered(true);
      });
      return () => window.cancelAnimationFrame(raf);
    }

    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.disconnect();
            break;
          }
        }
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, hasEntered, immediate, rootMargin, threshold]);

  return { ref, hasEntered, reducedMotion };
}

export interface SplitTextRevealProps {
  text: string;
  /**
   * "chars": character-by-character masked vertical reveal for short prominent headings.
   * "words": word-by-word masked vertical reveal for longer titles.
   */
  mode?: "chars" | "words";
  hasEntered: boolean;
  reducedMotion: boolean;
  /** Base delay in ms before the first unit starts revealing */
  baseDelayMs?: number;
  /**
   * Deliberately paced stagger step in ms between consecutive characters (~34ms) or words (~105ms)
   * so visitors can appreciate each typographic reveal.
   */
  staggerMs?: number;
  /** Duration in ms for each character or word reveal (~840ms default) */
  durationMs?: number;
  className?: string;
  /** Optional class applied to each inner character/word span (useful for gradient text) */
  unitClassName?: string;
}

/**
 * Accessible character-by-character or word-by-word masked reveal.
 * - Tuned to slower editorial pacing (~840ms per unit, 34ms/char or 105ms/word stagger).
 * - Preserves full screen-reader accessibility via `aria-label` and `aria-hidden="true"` visual spans.
 * - Prevents layout shift by keeping words intact inside `inline-block whitespace-nowrap` wrappers.
 */
export function SplitTextReveal({
  text,
  mode = "chars",
  hasEntered,
  reducedMotion,
  baseDelayMs = 0,
  staggerMs = mode === "chars" ? 34 : 105,
  durationMs = 840,
  className = "",
  unitClassName = "",
}: SplitTextRevealProps) {
  if (reducedMotion) {
    return <span className={`${className} ${unitClassName}`.trim()}>{text}</span>;
  }

  const words = text.split(" ");
  let runningIndex = 0;

  return (
    <span className={`inline ${className}`.trim()} aria-label={text}>
      {words.map((word, wordIdx) => {
        if (mode === "words") {
          const delay = baseDelayMs + runningIndex * staggerMs;
          runningIndex += 1;
          return (
            <React.Fragment key={`w-${wordIdx}-${word}`}>
              <span
                aria-hidden="true"
                className="inline-block overflow-hidden align-bottom pb-[0.06em] -mb-[0.06em]"
              >
                <span
                  className={`inline-block will-change-transform ${unitClassName}`.trim()}
                  style={{
                    opacity: hasEntered ? 1 : 0,
                    transform: hasEntered
                      ? "translate3d(0, 0%, 0)"
                      : "translate3d(0, 88%, 0)",
                    transitionProperty: "opacity, transform",
                    transitionDuration: `${durationMs}ms`,
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {word}
                </span>
              </span>
              {wordIdx < words.length - 1 ? " " : ""}
            </React.Fragment>
          );
        }

        // Character-by-character reveal grouped by word to prevent mid-word line wraps
        const chars = Array.from(word);
        return (
          <React.Fragment key={`cw-${wordIdx}-${word}`}>
            <span
              aria-hidden="true"
              className="inline-block whitespace-nowrap align-bottom"
            >
              {chars.map((char, charIdx) => {
                const delay = baseDelayMs + runningIndex * staggerMs;
                runningIndex += 1;
                return (
                  <span
                    key={`c-${wordIdx}-${charIdx}`}
                    className="inline-block overflow-hidden align-bottom pb-[0.06em] -mb-[0.06em]"
                  >
                    <span
                      className={`inline-block will-change-transform ${unitClassName}`.trim()}
                      style={{
                        opacity: hasEntered ? 1 : 0,
                        transform: hasEntered
                          ? "translate3d(0, 0%, 0)"
                          : "translate3d(0, 92%, 0)",
                        transitionProperty: "opacity, transform",
                        transitionDuration: `${durationMs}ms`,
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                        transitionDelay: `${delay}ms`,
                      }}
                    >
                      {char}
                    </span>
                  </span>
                );
              })}
            </span>
            {wordIdx < words.length - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
    </span>
  );
}

export type MaskDirection =
  | "top-to-bottom"
  | "bottom-to-top"
  | "left-to-right"
  | "right-to-left"
  | "center-out";

/**
 * Returns compositor-friendly `clip-path` styles for directional image-mask reveals.
 * Default duration is 1140ms (within the 0.9s–1.4s target range) so image reveals are clearly appreciable.
 */
export function getDirectionalMaskStyle(
  direction: MaskDirection,
  hasEntered: boolean,
  reducedMotion: boolean,
  delayMs = 0,
  durationMs = 1140,
  borderRadius = "0px"
): React.CSSProperties {
  if (reducedMotion) {
    return { clipPath: "none", opacity: 1, transform: "none" };
  }

  let initialClip = `inset(0% 0% 0% 0% round ${borderRadius})`;
  if (!hasEntered) {
    switch (direction) {
      case "top-to-bottom":
        initialClip = `inset(0% 0% 100% 0% round ${borderRadius})`;
        break;
      case "bottom-to-top":
        initialClip = `inset(100% 0% 0% 0% round ${borderRadius})`;
        break;
      case "left-to-right":
        initialClip = `inset(0% 100% 0% 0% round ${borderRadius})`;
        break;
      case "right-to-left":
        initialClip = `inset(0% 0% 0% 100% round ${borderRadius})`;
        break;
      case "center-out":
        initialClip = `inset(10% 16% 10% 16% round ${borderRadius})`;
        break;
    }
  }

  const finalClip = `inset(0% 0% 0% 0% round ${borderRadius})`;

  return {
    clipPath: hasEntered ? finalClip : initialClip,
    WebkitClipPath: hasEntered ? finalClip : initialClip,
    opacity: hasEntered ? 1 : 0.01,
    transitionProperty: "clip-path, -webkit-clip-path, opacity",
    transitionDuration: `${durationMs}ms`,
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: `${delayMs}ms`,
  };
}
