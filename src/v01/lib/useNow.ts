"use client";

import { useSyncExternalStore } from "react";

const TICK_MS = 60_000;

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, TICK_MS);
  return () => clearInterval(id);
}

/** Rounded down to the minute so the snapshot is stable between renders. */
function clientNow() {
  return Math.floor(Date.now() / TICK_MS) * TICK_MS;
}

/**
 * The current time, in epoch ms, refreshed each minute.
 *
 * The page is prerendered, so the server's idea of "now" is the build time.
 * Hydration starts from that value (no mismatch), then the browser's clock
 * takes over, which is what lets a past event drop off without a redeploy.
 */
export function useNow(serverNow: number): number {
  return useSyncExternalStore(subscribe, clientNow, () => serverNow);
}
