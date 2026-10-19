import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, FileText, Compass } from "lucide-react";
import {
  FEATURED_TRIPS_CONFIG,
  FEATURED_TRIPS_SECTION_CONFIG,
  getFeaturedJourneyBySlug,
} from "@/config/featured-trips";

export function generateStaticParams() {
  return FEATURED_TRIPS_CONFIG.map((journey) => ({
    slug: journey.slug,
  }));
}

export default async function JourneyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const journey = getFeaturedJourneyBySlug(slug);

  if (!journey) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full bg-[#FAF8F4] dark:bg-[#061523] text-[#081C2E] dark:text-white px-4 sm:px-8 lg:px-12 py-12 sm:py-16 transition-colors">
      <div className="mx-auto max-w-[1080px]">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
          <Link
            href="/#featured-trips"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 px-4 py-2 text-xs sm:text-sm font-medium text-[#081C2E] dark:text-white hover:border-[#0E7C8E] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-[#0E7C8E] dark:text-[#2DD4BF]" />
            <span>Back to Featured Trips</span>
          </Link>

          <Link
            href="/trips"
            className="text-xs sm:text-sm font-semibold text-[#0E7C8E] dark:text-[#2DD4BF] hover:underline"
          >
            View All Trips →
          </Link>
        </div>

        <article className="overflow-hidden rounded-[24px] border border-slate-200/90 dark:border-white/15 bg-white dark:bg-[#081C2E] shadow-[0_20px_50px_rgba(10,28,46,0.12)] dark:shadow-[0_24px_56px_rgba(2,9,18,0.75)]">
          <div className="relative h-[340px] sm:h-[420px] w-full">
            <Image
              src={journey.imageWebp}
              alt={journey.imageAlt}
              fill
              priority
              sizes="(max-width: 1080px) 100vw, 1080px"
              className="object-cover"
              style={{ objectPosition: journey.objectPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03111F]/90 via-[#041526]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 text-xs font-medium">
                <MapPin className="h-3.5 w-3.5 text-[#5EEAD4]" />
                <span>{journey.locationLabel}</span>
              </div>
              <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-semibold">
                {journey.title}
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {journey.description && (
              <p className="text-base sm:text-lg text-[#475869] dark:text-slate-200 leading-relaxed">
                {journey.description}
              </p>
            )}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl bg-[#F5F2EA] dark:bg-[#061523] p-5 border border-slate-200/80 dark:border-white/10">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-[#0E7C8E] dark:text-[#2DD4BF]" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Duration
                  </div>
                  <div className="text-sm font-semibold">
                    {journey.durationLabel ??
                      FEATURED_TRIPS_SECTION_CONFIG.durationPlaceholderLabel}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-[#0E7C8E] dark:text-[#2DD4BF]" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Booking Model
                  </div>
                  <div className="text-sm font-semibold">
                    {journey.startingPriceLabel ??
                      FEATURED_TRIPS_SECTION_CONFIG.quotePlaceholderLabel}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Compass className="h-5 w-5 text-[#0E7C8E] dark:text-[#2DD4BF]" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Corridor
                  </div>
                  <div className="text-sm font-semibold">
                    {journey.itineraryMetadata.corridorLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
