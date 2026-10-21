"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Globe2, Headphones, ShieldCheck } from "lucide-react";
import { useHero } from "@/components/hero/HeroProvider";
import { WHY_WEST_TRAVEL_FEATURES, WHY_WEST_TRAVEL_SECTION_CONFIG } from "@/config/why-west-travel";
import { WHY_WEST_ASSET_COPY } from "@/i18n/why-west-travel-assets";
import {
  SplitTextReveal,
  getDirectionalMaskStyle,
  useSectionEntrance,
} from "@/components/motion/MotionPrimitives";
import { EgyptianEdges, MessageAccent, TravelMicrographics } from "./TravelArtwork";
import styles from "./WhyWestTravelSection.module.css";

const FEATURE_ICONS = {
  network: Globe2,
  transfer: ShieldCheck,
  support: Headphones,
  booking: CalendarCheck,
} as const;

// Separate campaign assets, not the legacy combined collage. See the asset handoff.
const ASSETS = {
  traveler: "/images/why-west-travel/traveler.webp",
  landmarks: "/images/why-west-travel/landmarks.webp",
} as const;

type ImageStatus = "loading" | "ready" | "failed";

/**
 * Section 3: Why West Travel — Coordinated 3-Part Editorial Reveal (Section 14):
 * - Left: Service benefits enter with a subtle stagger from the left; circular icons settle shortly after.
 * - Center: Traveler-and-landmark composition reveals through a controlled vertical mask + organic brush mask.
 * - Right: Eyebrow, word-by-word serif heading, supporting text, and "Learn More" CTA appear from the right.
 * - Decorative SVGs use a restrained opacity/route reveal without continuous oscillation.
 */
export function WhyWestTravelSection() {
  const { t, theme, locale } = useHero();
  const copy = t.whyWestTravel;
  const assetCopy = WHY_WEST_ASSET_COPY[locale];

  const { ref: sectionRef, hasEntered, reducedMotion } = useSectionEntrance<HTMLElement>({
    threshold: 0.14,
    rootMargin: "0px 0px -8% 0px",
  });

  const [traveler, setTraveler] = useState<ImageStatus>("loading");
  const [landmarks, setLandmarks] = useState<ImageStatus>("loading");

  const getDirectionalSlideStyle = (
    direction: "left" | "right" | "up",
    delayMs: number,
    durationMs = 700
  ): React.CSSProperties => {
    if (reducedMotion) {
      return { opacity: 1, transform: "none" };
    }
    const initialTransform =
      direction === "left"
        ? "translate3d(-24px, 0, 0)"
        : direction === "right"
        ? "translate3d(24px, 0, 0)"
        : "translate3d(0, 22px, 0)";
    return {
      opacity: hasEntered ? 1 : 0,
      transform: hasEntered ? "translate3d(0, 0, 0)" : initialTransform,
      transitionProperty: "opacity, transform",
      transitionDuration: `${durationMs}ms`,
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: `${delayMs}ms`,
    };
  };

  const centerVisualMaskStyle = getDirectionalMaskStyle(
    "bottom-to-top",
    hasEntered,
    reducedMotion,
    110,
    880,
    "0px"
  );

  return (
    <section
      ref={sectionRef}
      id={WHY_WEST_TRAVEL_SECTION_CONFIG.sectionId}
      aria-labelledby="why-west-travel-heading"
      data-theme-mode={theme}
      data-entered={hasEntered ? "true" : "false"}
      className={styles.section}
    >
      <EgyptianEdges />
      <div className={styles.layout}>
        {/* Right Column on Desktop: Brand Message & "Learn More" CTA */}
        <div className={styles.message}>
          <MessageAccent />
          <p
            className={styles.eyebrow}
            style={getDirectionalSlideStyle("right", 40)}
            data-reveal="right"
          >
            <span className={styles.eyebrowPrefix}>{copy.eyebrowPrefix}</span>{" "}
            <span>{copy.eyebrowHighlight}</span>
          </p>

          <h2
            id="why-west-travel-heading"
            className={styles.heading}
            data-reveal="right"
          >
            <span>
              <SplitTextReveal
                text={copy.headingLine1}
                mode="words"
                hasEntered={hasEntered}
                reducedMotion={reducedMotion}
                baseDelayMs={110}
                staggerMs={55}
                durationMs={620}
              />
            </span>{" "}
            <span>
              <SplitTextReveal
                text={copy.headingLine2}
                mode="words"
                hasEntered={hasEntered}
                reducedMotion={reducedMotion}
                baseDelayMs={230}
                staggerMs={55}
                durationMs={620}
              />
            </span>
          </h2>

          <p
            className={styles.description}
            style={getDirectionalSlideStyle("right", 280)}
            data-reveal="right"
          >
            {copy.supportingText}
          </p>

          <div
            className={styles.ctaWrap}
            style={getDirectionalSlideStyle("right", 380)}
            data-reveal="right"
          >
            <Link
              href={WHY_WEST_TRAVEL_SECTION_CONFIG.primaryCtaHref}
              className={styles.cta}
              data-why-west-cta="learn-more"
            >
              <span>{copy.primaryCta}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Center Visual Column: Landmarks + Traveler Revealed Through Controlled Directional Mask */}
        <div
          className={styles.visual}
          style={centerVisualMaskStyle}
          data-reveal="up"
          data-traveler-status={traveler}
          data-landmarks-status={landmarks}
        >
          <div className={styles.atmosphere} aria-hidden="true" />
          <TravelMicrographics showPins={landmarks === "ready"} />
          <div className={styles.landmarks}>
            {landmarks !== "failed" && (
              <Image
                src={ASSETS.landmarks}
                alt={assetCopy.landmarks}
                fill
                sizes="(max-width: 599px) 390px, (max-width: 1199px) 55vw, 700px"
                className={styles.photo}
                data-loaded={landmarks === "ready"}
                onLoad={() => setLandmarks("ready")}
                onError={() => setLandmarks("failed")}
              />
            )}
          </div>
          <div className={styles.traveler}>
            {traveler !== "failed" && (
              <Image
                src={ASSETS.traveler}
                alt={assetCopy.traveler}
                fill
                sizes="(max-width: 599px) 320px, (max-width: 1199px) 45vw, 580px"
                className={styles.photo}
                data-loaded={traveler === "ready"}
                onLoad={() => setTraveler("ready")}
                onError={() => setTraveler("failed")}
              />
            )}
          </div>
        </div>

        {/* Left Column on Desktop: Staggered Service Benefits */}
        <ul className={styles.benefits}>
          {WHY_WEST_TRAVEL_FEATURES.map((feature, index) => {
            const Icon = FEATURE_ICONS[feature.id];
            const localized = copy.features[feature.id];
            const rowDelay = 60 + index * 85;
            const iconStyle: React.CSSProperties = reducedMotion
              ? { opacity: 1, transform: "none" }
              : {
                  opacity: hasEntered ? 1 : 0,
                  transform: hasEntered ? "scale(1)" : "scale(0.86)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "540ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  transitionDelay: `${rowDelay + 75}ms`,
                };

            return (
              <li
                key={feature.id}
                className={styles.feature}
                style={getDirectionalSlideStyle("left", rowDelay)}
                data-reveal="left"
                data-why-feature={feature.id}
                data-verification-status={feature.verificationStatus}
              >
                <span className={styles.icon} style={iconStyle}>
                  <Icon aria-hidden="true" />
                  {feature.id === "support" && (
                    <span className={styles.supportLabel}>24/7</span>
                  )}
                </span>
                <div className={styles.featureCopy}>
                  <h3>{localized.title}</h3>
                  <p>{localized.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
