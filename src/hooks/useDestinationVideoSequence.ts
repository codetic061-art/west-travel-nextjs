"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DESTINATIONS_CONFIG,
  type DestinationAssetConfig,
  type DestinationId,
} from "@/config/destinations";

export const POSTER_HOLD_DURATION_MS = 3000;

type UseDestinationVideoSequenceOptions = {
  activeDestinationId: DestinationId | null;
  reducedMotion: boolean;
  posterHoldDurationMs?: number;
};

type UseDestinationVideoSequenceResult = {
  activeConfig: DestinationAssetConfig | null;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  shouldLoadVideo: boolean;
  isPosterHoldActive: boolean;
  isPosterHoldElapsed: boolean;
  isVideoPlayable: boolean;
  isVideoRevealed: boolean;
  isWaitingForVideoAfterHold: boolean;
  isPosterFallbackActive: boolean;
  posterHoldDurationMs: number;
  sequenceTick: number;
  handleVideoLoadedData: React.ReactEventHandler<HTMLVideoElement>;
  handleVideoCanPlay: React.ReactEventHandler<HTMLVideoElement>;
  handleVideoPlaying: React.ReactEventHandler<HTMLVideoElement>;
  handleVideoError: React.ReactEventHandler<HTMLVideoElement>;
};

const isNetworkConstrained = (): boolean => {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const connection = nav.connection;
  if (!connection) return false;
  if (connection.saveData) return true;
  return connection.effectiveType === "2g";
};

export function useDestinationVideoSequence(
  options: UseDestinationVideoSequenceOptions
): UseDestinationVideoSequenceResult {
  const { activeDestinationId, reducedMotion } = options;
  const posterHoldDurationMs = options.posterHoldDurationMs ?? POSTER_HOLD_DURATION_MS;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activeDestinationIdRef = useRef<DestinationId | null>(activeDestinationId);
  const posterHoldTimerRef = useRef<number | null>(null);

  const [posterHoldCompletedFor, setPosterHoldCompletedFor] = useState<DestinationId | null>(null);
  const [videoPlayableFor, setVideoPlayableFor] = useState<DestinationId | null>(null);
  const [videoErroredFor, setVideoErroredFor] = useState<DestinationId | null>(null);
  const [isDataSaverFriendly, setIsDataSaverFriendly] = useState(false);
  const [sequenceTick, setSequenceTick] = useState(0);

  useEffect(() => {
    setIsDataSaverFriendly(isNetworkConstrained());
  }, []);

  useEffect(() => {
    activeDestinationIdRef.current = activeDestinationId;

    if (posterHoldTimerRef.current !== null) {
      window.clearTimeout(posterHoldTimerRef.current);
      posterHoldTimerRef.current = null;
    }

    setPosterHoldCompletedFor(null);
    setVideoPlayableFor(null);
    setVideoErroredFor(null);
    setSequenceTick((tick) => tick + 1);

    if (activeDestinationId === null) return;

    if (!reducedMotion && !isDataSaverFriendly) {
      posterHoldTimerRef.current = window.setTimeout(() => {
        setPosterHoldCompletedFor(activeDestinationId);
        posterHoldTimerRef.current = null;
      }, posterHoldDurationMs);
    } else {
      setPosterHoldCompletedFor(activeDestinationId);
    }

    return () => {
      if (posterHoldTimerRef.current !== null) {
        window.clearTimeout(posterHoldTimerRef.current);
        posterHoldTimerRef.current = null;
      }
    };
  }, [activeDestinationId, reducedMotion, isDataSaverFriendly, posterHoldDurationMs]);

  const activeConfig = useMemo(() => {
    if (activeDestinationId === null) return null;
    return (
      DESTINATIONS_CONFIG.find(
        (destination) => destination.id === activeDestinationId
      ) ?? null
    );
  }, [activeDestinationId]);

  const shouldLoadVideo =
    activeDestinationId !== null && !reducedMotion && !isDataSaverFriendly;

  const isPosterHoldElapsed =
    activeDestinationId !== null && posterHoldCompletedFor === activeDestinationId;

  const isVideoPlayable =
    activeDestinationId !== null &&
    videoPlayableFor === activeDestinationId &&
    videoErroredFor !== activeDestinationId;

  const isPosterHoldActive =
    activeDestinationId !== null && shouldLoadVideo && !isPosterHoldElapsed;

  const isVideoRevealed = shouldLoadVideo && isPosterHoldElapsed && isVideoPlayable;

  const isWaitingForVideoAfterHold =
    shouldLoadVideo &&
    isPosterHoldElapsed &&
    !isVideoPlayable &&
    videoErroredFor !== activeDestinationId;

  const isPosterFallbackActive =
    (activeDestinationId !== null && !shouldLoadVideo) ||
    (activeDestinationId !== null && videoErroredFor === activeDestinationId);

  useEffect(() => {
    if (!isVideoRevealed) return;
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime !== 0) {
      try {
        video.currentTime = 0;
      } catch {
        // currentTime reset is best-effort
      }
    }
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // autoplay can be blocked; poster stays until the next playable event
      });
    }
  }, [isVideoRevealed]);

  const markVideoPlayable = useCallback(() => {
    const id = activeDestinationIdRef.current;
    if (id !== null) setVideoPlayableFor(id);
  }, []);

  const handleVideoLoadedData = markVideoPlayable;
  const handleVideoCanPlay = markVideoPlayable;
  const handleVideoPlaying = markVideoPlayable;

  const handleVideoError = useCallback(() => {
    const id = activeDestinationIdRef.current;
    if (id !== null) {
      setVideoPlayableFor(null);
      setVideoErroredFor(id);
    }
  }, []);

  return {
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
  };
}
