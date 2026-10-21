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
 * Reusable hook to detect `prefers-reduced-motion: reduce`.
 */
export function usePrefersReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return reducedMotion;
}

/**
 * Reusable viewport-triggered entrance hook with `prefers-reduced-motion` support.
 * - Below-the-fold sections wait until they genuinely enter the viewport (`threshold: 0.22`,
 *   `rootMargin: "0px 0px -12% 0px"`) so image-mask and text reveals are clearly visible to the user
 *   at normal scrolling speed rather than firing prematurely offscreen.
 * - Double-buffered via `requestAnimationFrame` so the browser paints the initial masked/thin-line
 *   state before transitioning to the revealed state (preventing any flash of final content).
 * - Runs once when first visible and never re-hides content on minor scroll movements.
 */
export function useSectionEntrance<T extends HTMLElement = HTMLElement>(
  options: UseSectionEntranceOptions = {}
): SectionEntranceState<T> {
  const {
    threshold = 0.22,
    rootMargin = "0px 0px -12% 0px",
    immediate = false,
  } = options;
  const ref = useRef<T | null>(null);
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setHasEntered(true);
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || hasEntered) return;

    let raf1 = 0;
    let raf2 = 0;

    const triggerReveal = () => {
      raf1 = window.requestAnimationFrame(() => {
        raf2 = window.requestAnimationFrame(() => {
          setHasEntered(true);
        });
      });
    };

    if (immediate) {
      triggerReveal();
      return () => {
        window.cancelAnimationFrame(raf1);
        window.cancelAnimationFrame(raf2);
      };
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
          if (entry.isIntersecting && entry.intersectionRatio >= Math.min(threshold, 0.15)) {
            triggerReveal();
            observer.disconnect();
            break;
          }
        }
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
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
   * Deliberately paced stagger step in ms between consecutive characters (~36ms) or words (~115ms)
   * so visitors can appreciate each typographic reveal.
   */
  staggerMs?: number;
  /** Duration in ms for each character or word reveal (~920ms default) */
  durationMs?: number;
  className?: string;
  /** Optional class applied to each inner character/word span (useful for gradient text) */
  unitClassName?: string;
}

/**
 * Accessible character-by-character or word-by-word masked reveal.
 * - Tuned to slower editorial pacing (~920ms per unit, 36ms/char or 115ms/word stagger).
 * - Preserves full screen-reader accessibility via `aria-label` and `aria-hidden="true"` visual spans.
 * - Prevents layout shift by keeping words intact inside `inline-block whitespace-nowrap` wrappers.
 */
export function SplitTextReveal({
  text,
  mode = "chars",
  hasEntered,
  reducedMotion,
  baseDelayMs = 0,
  staggerMs = mode === "chars" ? 36 : 115,
  durationMs = 920,
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
                      : "translate3d(0, 92%, 0)",
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
                          : "translate3d(0, 96%, 0)",
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
 * Returns compositor-friendly `clip-path` styles that progressively uncover an image
 * from a thin visible line/strip (~2.5% slit) rather than sliding the image or fading from 0 opacity.
 * - Before the reveal begins (`!hasEntered`), the image is masked down to a thin strip at the starting
 *   edge (`inset(0% 0% 97.5% 0%)` for top-to-bottom, `inset(97.5% 0% 0% 0%)` for bottom-to-top,
 *   `inset(48.8% 0% 48.8% 0%)` for center-out horizontal slit, etc.).
 * - Keeps `opacity: 1` during the expansion so the user genuinely sees the photograph being drawn/uncovered
 *   from the thin line over `1280ms` (`1.28s` default).
 */
export function getDirectionalMaskStyle(
  direction: MaskDirection,
  hasEntered: boolean,
  reducedMotion: boolean,
  delayMs = 0,
  durationMs = 1280,
  borderRadius = "0px"
): React.CSSProperties {
  if (reducedMotion) {
    return { clipPath: "none", opacity: 1, transform: "none" };
  }

  let initialClip = `inset(0% 0% 97.5% 0% round ${borderRadius})`;
  if (!hasEntered) {
    switch (direction) {
      case "top-to-bottom":
        initialClip = `inset(0% 0% 97.5% 0% round ${borderRadius})`;
        break;
      case "bottom-to-top":
        initialClip = `inset(97.5% 0% 0% 0% round ${borderRadius})`;
        break;
      case "left-to-right":
        initialClip = `inset(0% 97.5% 0% 0% round ${borderRadius})`;
        break;
      case "right-to-left":
        initialClip = `inset(0% 0% 0% 97.5% round ${borderRadius})`;
        break;
      case "center-out":
        initialClip = `inset(48.8% 0% 48.8% 0% round ${borderRadius})`;
        break;
    }
  }

  const finalClip = `inset(0% 0% 0% 0% round ${borderRadius})`;

  return {
    clipPath: hasEntered ? finalClip : initialClip,
    WebkitClipPath: hasEntered ? finalClip : initialClip,
    opacity: 1,
    willChange: "clip-path",
    transitionProperty: "clip-path, -webkit-clip-path",
    transitionDuration: `${durationMs}ms`,
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: `${delayMs}ms`,
  };
}

/**
 * Returns subtle inner image scale-settle styles (`scale(1.05)` -> `scale(1.0)`) that complement
 * the thin-line `clip-path` expansion without distorting or jumping the image.
 */
export function getImageScaleSettleStyle(
  hasEntered: boolean,
  reducedMotion: boolean,
  delayMs = 0,
  durationMs = 1380
): React.CSSProperties {
  if (reducedMotion) {
    return { transform: "none" };
  }

  return {
    transform: hasEntered ? "scale(1)" : "scale(1.05)",
    transitionProperty: "transform",
    transitionDuration: `${durationMs}ms`,
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: `${delayMs}ms`,
  };
}
