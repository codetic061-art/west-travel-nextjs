"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Globe2, Headphones, ShieldCheck } from "lucide-react";
import { useHero } from "@/components/hero/HeroProvider";
import { WHY_WEST_TRAVEL_FEATURES, WHY_WEST_TRAVEL_SECTION_CONFIG } from "@/config/why-west-travel";
import { WHY_WEST_ASSET_COPY } from "@/i18n/why-west-travel-assets";
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

/** Visible SSR content enhanced with one-time, per-element entrance animations. */
function useEntrance() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (motion.matches) continue;
        const element = entry.target as HTMLElement;
        if (typeof element.animate !== "function") continue;
        const direction = element.dataset.reveal;
        const from = direction === "left" ? "translateX(-14px)" : direction === "right" ? "translateX(14px)" : "translateY(10px)";
        animations.push(element.animate(
          [{ opacity: 0, transform: from }, { opacity: 1, transform: "none" }],
          { duration: 650, delay: Number(element.dataset.delay ?? 0), easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" }
        ));
      }
    }, { threshold: 0.12 });

    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => observer.observe(element));
    const handleMotion = () => {
      if (motion.matches) animations.forEach((animation) => animation.cancel());
    };
    motion.addEventListener("change", handleMotion);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      motion.removeEventListener("change", handleMotion);
    };
  }, []);

  return ref;
}

export function WhyWestTravelSection() {
  const { t, theme, locale } = useHero();
  const copy = t.whyWestTravel;
  const assetCopy = WHY_WEST_ASSET_COPY[locale];
  const sectionRef = useEntrance();
  const [traveler, setTraveler] = useState<ImageStatus>("loading");
  const [landmarks, setLandmarks] = useState<ImageStatus>("loading");

  return (
    <section
      ref={sectionRef}
      id={WHY_WEST_TRAVEL_SECTION_CONFIG.sectionId}
      aria-labelledby="why-west-travel-heading"
      data-theme-mode={theme}
      className={styles.section}
    >
      <EgyptianEdges />
      <div className={styles.layout}>
        <div className={styles.message}>
          <MessageAccent />
          <p className={styles.eyebrow} data-reveal="right">
            <span className={styles.eyebrowPrefix}>{copy.eyebrowPrefix}</span>{" "}<span>{copy.eyebrowHighlight}</span>
          </p>
          <h2 id="why-west-travel-heading" className={styles.heading} data-reveal="right" data-delay="70">
            <span>{copy.headingLine1}</span>{" "}<span>{copy.headingLine2}</span>
          </h2>
          <p className={styles.description} data-reveal="right" data-delay="140">{copy.supportingText}</p>
          <div className={styles.ctaWrap} data-reveal="right" data-delay="210">
            <Link href={WHY_WEST_TRAVEL_SECTION_CONFIG.primaryCtaHref} className={styles.cta} data-why-west-cta="learn-more">
              <span>{copy.primaryCta}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={styles.visual} data-reveal="up" data-delay="90" data-traveler-status={traveler} data-landmarks-status={landmarks}>
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

        <ul className={styles.benefits}>
          {WHY_WEST_TRAVEL_FEATURES.map((feature, index) => {
            const Icon = FEATURE_ICONS[feature.id];
            const localized = copy.features[feature.id];
            return (
              <li key={feature.id} className={styles.feature} data-reveal="left" data-delay={index * 65} data-why-feature={feature.id} data-verification-status={feature.verificationStatus}>
                <span className={styles.icon}><Icon aria-hidden="true" />{feature.id === "support" && <span className={styles.supportLabel}>24/7</span>}</span>
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
