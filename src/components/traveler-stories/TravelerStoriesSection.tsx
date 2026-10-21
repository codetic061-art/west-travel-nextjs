"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useHero } from "@/components/hero/HeroProvider";
import {
  getTravelerStories,
  TRAVELER_STORIES_I18N,
  TRAVELER_STORIES_SECTION_CONFIG,
  type StoryId,
  type TravelerStoriesLocaleCopy,
  type TravelerStoryRecord,
} from "@/config/traveler-stories";
import {
  SplitTextReveal,
  getDirectionalMaskStyle,
  useSectionEntrance,
} from "@/components/motion/MotionPrimitives";
import {
  ClotheslineRope,
  LowerLeftGizaArtwork,
  LowerRightPostmark,
  UpperTravelMicrographics,
  WoodenClothespin,
} from "./StoriesArtwork";
import styles from "./TravelerStoriesSection.module.css";

export interface TravelerStoriesSectionProps {
  /**
   * Optional array of verified customer review records from the backend.
   * Falls back to SAMPLE_TRAVELER_STORIES (explicitly marked as sample preview data)
   * when omitted.
   */
  stories?: readonly TravelerStoryRecord[];
}

type MotionDirection = "idle" | "next" | "prev";

function getSlotAngleDeg(slotOffset: number, visibleCount: number): number {
  if (visibleCount === 1) {
    if (slotOffset === 0) return -1.1;
    return slotOffset < 0 ? -3.5 : 3.5;
  }
  if (visibleCount === 2) {
    if (slotOffset === 0) return -1.8;
    if (slotOffset === 1) return 1.8;
    return slotOffset < 0 ? -3.8 : 3.8;
  }
  // Desktop 4 visible slots: [-2.8deg, +1.5deg, -1.5deg, +2.8deg]
  switch (slotOffset) {
    case 0:
      return TRAVELER_STORIES_SECTION_CONFIG.slotRestingAnglesDeg[0];
    case 1:
      return TRAVELER_STORIES_SECTION_CONFIG.slotRestingAnglesDeg[1];
    case 2:
      return TRAVELER_STORIES_SECTION_CONFIG.slotRestingAnglesDeg[2];
    case 3:
      return TRAVELER_STORIES_SECTION_CONFIG.slotRestingAnglesDeg[3];
    default:
      return slotOffset < 0 ? -4.2 : 4.2;
  }
}

function getSlotSagPx(slotOffset: number, visibleCount: number): number {
  if (visibleCount === 1) {
    return slotOffset === 0 ? 14 : 4;
  }
  if (visibleCount === 2) {
    return slotOffset === 0 || slotOffset === 1 ? 9 : 0;
  }
  // Desktop 4 visible slots follow the quadratic catenary curve of the SVG rope
  switch (slotOffset) {
    case 0:
      return TRAVELER_STORIES_SECTION_CONFIG.slotRopeSagPx[0];
    case 1:
      return TRAVELER_STORIES_SECTION_CONFIG.slotRopeSagPx[1];
    case 2:
      return TRAVELER_STORIES_SECTION_CONFIG.slotRopeSagPx[2];
    case 3:
      return TRAVELER_STORIES_SECTION_CONFIG.slotRopeSagPx[3];
    default:
      return -10;
  }
}

export function TravelerStoriesSection({
  stories: customStories,
}: TravelerStoriesSectionProps) {
  const { locale, t, theme } = useHero();
  const dictWithOptionalStories = t as unknown as {
    travelerStories?: TravelerStoriesLocaleCopy;
  };
  const copy =
    dictWithOptionalStories.travelerStories ??
    TRAVELER_STORIES_I18N[locale] ??
    TRAVELER_STORIES_I18N.en;

  const stories = getTravelerStories(customStories);
  const totalStories = stories.length;
  const hasSampleEntries = stories.some((s) => s.isSampleData);

  const { ref: sectionRef, hasEntered, reducedMotion } = useSectionEntrance<HTMLElement>({
    threshold: 0.14,
    rootMargin: "0px 0px -8% 0px",
  });

  // Monotonic step counter drives one-by-one circular replacement so every card DOM node
  // keeps its stable key as it enters from the right, shifts across the 4 slots, and exits left.
  const [stepCount, setStepCount] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(
    TRAVELER_STORIES_SECTION_CONFIG.desktopVisibleCount
  );
  const [motionDirection, setMotionDirection] = useState<MotionDirection>("idle");
  const [isRopeFlexing, setIsRopeFlexing] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const swingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  const activeIndex = ((stepCount % totalStories) + totalStories) % totalStories;

  // Synchronize responsive visible card count (4 desktop, 2 tablet, 1 mobile)
  useEffect(() => {
    const updateViewportCounts = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(TRAVELER_STORIES_SECTION_CONFIG.mobileVisibleCount);
      } else if (width < 1024) {
        setVisibleCount(TRAVELER_STORIES_SECTION_CONFIG.tabletVisibleCount);
      } else {
        setVisibleCount(TRAVELER_STORIES_SECTION_CONFIG.desktopVisibleCount);
      }
    };

    updateViewportCounts();
    window.addEventListener("resize", updateViewportCounts);
    return () => window.removeEventListener("resize", updateViewportCounts);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setMotionDirection("idle");
      setIsRopeFlexing(false);
    }
  }, [reducedMotion]);

  useEffect(() => {
    return () => {
      if (swingTimeoutRef.current) {
        clearTimeout(swingTimeoutRef.current);
      }
    };
  }, []);

  const triggerStep = useCallback(
    (delta: number) => {
      if (delta === 0 || totalStories === 0) return;
      const direction: MotionDirection = delta > 0 ? "next" : "prev";
      setStepCount((prev) => prev + delta);

      if (reducedMotion) {
        setMotionDirection("idle");
        setIsRopeFlexing(false);
        return;
      }

      setMotionDirection(direction);
      setIsRopeFlexing(true);

      if (swingTimeoutRef.current) {
        clearTimeout(swingTimeoutRef.current);
      }
      swingTimeoutRef.current = setTimeout(() => {
        setMotionDirection("idle");
        setIsRopeFlexing(false);
      }, 690);
    },
    [reducedMotion, totalStories]
  );

  const handleNext = useCallback(() => {
    triggerStep(1);
  }, [triggerStep]);

  const handlePrev = useCallback(() => {
    triggerStep(-1);
  }, [triggerStep]);

  const handleSelectDot = useCallback(
    (targetIdx: number) => {
      if (targetIdx === activeIndex || totalStories === 0) return;
      const forwardDelta = (targetIdx - activeIndex + totalStories) % totalStories;
      const backwardDelta = forwardDelta - totalStories;
      const shortestDelta =
        Math.abs(forwardDelta) <= Math.abs(backwardDelta)
          ? forwardDelta
          : backwardDelta;
      triggerStep(shortestDelta);
    },
    [activeIndex, totalStories, triggerStep]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null || e.touches.length !== 1) return;
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null) return;
    const deltaX = touchDeltaXRef.current;
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;

    const swipeThreshold = 42;
    if (deltaX <= -swipeThreshold) {
      handleNext();
    } else if (deltaX >= swipeThreshold) {
      handlePrev();
    }
  };

  const getHeaderRevealStyle = (delayMs: number): React.CSSProperties =>
    reducedMotion
      ? { opacity: 1, transform: "none" }
      : {
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? "translate3d(0, 0, 0)" : "translate3d(0, 16px, 0)",
          transitionProperty: "opacity, transform",
          transitionDuration: "680ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: `${delayMs}ms`,
        };

  // Render slots from -1 (left offscreen buffer) through visibleCount (right offscreen buffer)
  const slotIndices: number[] = [];
  for (let k = stepCount - 1; k <= stepCount + visibleCount; k += 1) {
    slotIndices.push(k);
  }

  return (
    <section
      ref={sectionRef}
      id={TRAVELER_STORIES_SECTION_CONFIG.sectionId}
      aria-labelledby="traveler-stories-heading"
      data-theme-mode={theme}
      data-entered={hasEntered ? "true" : "false"}
      data-active-story-index={activeIndex}
      data-review-dataset={
        hasSampleEntries
          ? "sample_development_preview"
          : "verified_customer_reviews"
      }
      className={styles.section}
    >
      {/* Decorative Upper Flight Paths (Camera on Left Route, Airplane on Right Route) */}
      <UpperTravelMicrographics />

      {/* Decorative Lower-Left Egyptian Giza Pyramids & Palm Trees Illustration */}
      <LowerLeftGizaArtwork />

      {/* Subtle Lower-Right Editorial Postmark Stamp */}
      <LowerRightPostmark />

      <div className={styles.container}>
        {/* Section Heading & Introductory Copy with Scroll-Triggered Reveal */}
        <header className={styles.header}>
          <p className={styles.eyebrow} style={getHeaderRevealStyle(0)}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <span>{copy.eyebrow || TRAVELER_STORIES_SECTION_CONFIG.eyebrow}</span>
            <span className={styles.eyebrowRuleRight} aria-hidden="true" />
          </p>
          <h2 id="traveler-stories-heading" className={styles.heading}>
            <SplitTextReveal
              text={copy.heading || TRAVELER_STORIES_SECTION_CONFIG.heading}
              mode="chars"
              hasEntered={hasEntered}
              reducedMotion={reducedMotion}
              baseDelayMs={65}
              staggerMs={22}
              durationMs={600}
            />
          </h2>
          <p className={styles.subtitle} style={getHeaderRevealStyle(180)}>
            {copy.supportingText || TRAVELER_STORIES_SECTION_CONFIG.supportingText}
          </p>
        </header>

        {/* Physical Clothesline Stage & Hanging Polaroid Carousel */}
        <div
          className={styles.clotheslineStage}
          style={getHeaderRevealStyle(230)}
          role="region"
          aria-roledescription="carousel"
          aria-label={copy.carouselAriaLabel}
          onKeyDown={handleKeyDown}
        >
          {/* Full-Width Curved Braided Clothesline Rope */}
          <ClotheslineRope isFlexing={isRopeFlexing} />

          <div className={styles.carouselRow}>
            {/* Desktop & Tablet Left Arrow Control */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label={copy.prevStoryLabel}
              data-carousel-control="prev"
              className={styles.navButton}
            >
              <ChevronLeft aria-hidden="true" />
            </button>

            {/* Hanging Polaroids Viewport */}
            <div
              className={styles.cardsViewport}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              data-visible-cards={visibleCount}
            >
              {slotIndices.map((absoluteStepKey) => {
                const slotOffset = absoluteStepKey - stepCount;
                const isVisible = slotOffset >= 0 && slotOffset < visibleCount;
                const storyIdx =
                  ((absoluteStepKey % totalStories) + totalStories) % totalStories;
                const story = stories[storyIdx];
                const localizedItem =
                  copy.items[story.id as StoryId] ?? {
                    quote: story.defaultQuote,
                    location: story.defaultLocation,
                    imageAlt: story.defaultImageAlt,
                  };

                const angleDeg = reducedMotion
                  ? 0
                  : getSlotAngleDeg(slotOffset, visibleCount);
                const sagPx = getSlotSagPx(slotOffset, visibleCount);

                let swingState = "idle";
                if (!reducedMotion && isVisible && motionDirection !== "idle") {
                  if (
                    motionDirection === "next" &&
                    slotOffset === visibleCount - 1
                  ) {
                    swingState = "enter-next";
                  } else if (motionDirection === "prev" && slotOffset === 0) {
                    swingState = "enter-prev";
                  } else if (motionDirection === "next") {
                    swingState = "shift-next";
                  } else if (motionDirection === "prev") {
                    swingState = "shift-prev";
                  }
                }

                const slotStyle = {
                  "--slot-offset": slotOffset,
                  "--slot-sag-y": `${sagPx}px`,
                  "--card-angle": `${angleDeg}deg`,
                  "--slot-z": isVisible ? 4 + (slotOffset % 2) : 1,
                } as React.CSSProperties;

                const imageSrc = failedImages[story.id]
                  ? story.imageJpg
                  : story.imageWebp;

                const photoMaskStyle = getDirectionalMaskStyle(
                  "top-to-bottom",
                  hasEntered,
                  reducedMotion,
                  260 + Math.max(0, slotOffset) * 85,
                  760,
                  "2px"
                );

                return (
                  <article
                    key={`rope-item-${absoluteStepKey}`}
                    className={styles.cardSlot}
                    style={slotStyle}
                    data-slot-offset={slotOffset}
                    data-slot-visible={isVisible ? "true" : "false"}
                    data-story-id={story.id}
                    data-sample-review={story.isSampleData ? "true" : "false"}
                    data-verification-status={story.verificationStatus}
                    aria-hidden={!isVisible}
                  >
                    <div
                      className={styles.polaroidPendulum}
                      data-swing-state={swingState}
                    >
                      {/* Wooden Clothespin Overlapping the Rope and Polaroid Top Edge */}
                      <WoodenClothespin />

                      {/* Compact Near-Square Polaroid Paper Frame */}
                      <div className={styles.polaroidCard}>
                        {/* Landscape Destination Photograph with Directional Top-to-Bottom Reveal */}
                        <div className={styles.photoFrame} style={photoMaskStyle}>
                          <Image
                            src={imageSrc}
                            alt={localizedItem.imageAlt}
                            fill
                            sizes="(max-width: 639px) 280px, (max-width: 1023px) 290px, 300px"
                            className={styles.photo}
                            priority={isVisible && slotOffset < 2}
                            onError={() => {
                              if (!failedImages[story.id]) {
                                setFailedImages((prev) => ({
                                  ...prev,
                                  [story.id]: true,
                                }));
                              }
                            }}
                          />
                        </div>

                        {/* Review Details in Strict Order: 1. Stars, 2. Name, 3. Excerpt, 4. Location */}
                        <div className={styles.reviewBody}>
                          {/* 1. Star Rating */}
                          {typeof story.rating === "number" && (
                            <div className={styles.ratingRow}>
                              <div
                                className={styles.stars}
                                role="img"
                                aria-label={`${story.rating} ${copy.starRatingLabel}`}
                              >
                                {[1, 2, 3, 4, 5].map((starNumber) => (
                                  <Star
                                    key={starNumber}
                                    aria-hidden="true"
                                    className={
                                      starNumber <= (story.rating ?? 5)
                                        ? styles.starIcon
                                        : styles.starIconEmpty
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 2. Traveler Name */}
                          <h3 className={styles.reviewerName}>
                            {story.reviewerName}
                          </h3>

                          {/* 3. Short Review Excerpt */}
                          <p className={styles.reviewQuote}>
                            &ldquo;{localizedItem.quote}&rdquo;
                          </p>

                          {/* 4. Destination or Location */}
                          {localizedItem.location && (
                            <p className={styles.reviewLocation}>
                              {localizedItem.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Desktop & Tablet Right Arrow Control */}
            <button
              type="button"
              onClick={handleNext}
              aria-label={copy.nextStoryLabel}
              data-carousel-control="next"
              className={styles.navButton}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>

          {/* Pagination Indicators & Mobile Touch Controls */}
          <div className={styles.footerControls}>
            <div className={styles.paginationRow}>
              <button
                type="button"
                onClick={handlePrev}
                aria-label={copy.prevStoryLabel}
                className={styles.mobileNavButton}
              >
                <ChevronLeft aria-hidden="true" />
              </button>

              <div
                className={styles.dotsList}
                role="tablist"
                aria-label={copy.paginationAriaLabel}
              >
                {stories.map((story, idx) => {
                  const isSelected = activeIndex === idx;
                  return (
                    <button
                      key={`story-dot-${story.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-label={`${copy.goToStoryPrefix} ${story.reviewerName}`}
                      onClick={() => handleSelectDot(idx)}
                      className={styles.dotButton}
                    >
                      <span className={styles.dotIndicator} />
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label={copy.nextStoryLabel}
                className={styles.mobileNavButton}
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
