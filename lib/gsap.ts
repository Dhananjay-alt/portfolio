/**
 * GSAP is only needed for two things — SplitText heading reveals and the
 * scroll-scrubbed Journey — so it never ships in the initial bundle. Callers
 * await `loadGsap()`; the three modules are fetched once and shared.
 */

type GsapBundle = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  SplitText: typeof import("gsap/SplitText").SplitText;
};

let pending: Promise<GsapBundle> | null = null;
let loaded: GsapBundle | null = null;
const listeners = new Set<(bundle: GsapBundle) => void>();

export function loadGsap(): Promise<GsapBundle> {
  pending ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("gsap/SplitText"),
  ]).then(([core, st, split]) => {
    core.gsap.registerPlugin(st.ScrollTrigger, split.SplitText);
    loaded = { gsap: core.gsap, ScrollTrigger: st.ScrollTrigger, SplitText: split.SplitText };
    listeners.forEach((fn) => fn(loaded!));
    listeners.clear();
    return loaded;
  });
  // Let a failed chunk load be retried by the next caller.
  pending.catch(() => {
    pending = null;
  });
  return pending;
}

/** Run `fn` once GSAP is available, without triggering the download. */
export function onGsapLoaded(fn: (bundle: GsapBundle) => void): () => void {
  if (loaded) {
    fn(loaded);
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Schedule work for when the main thread is free. */
export function whenIdle(fn: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(fn, { timeout: 1500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(fn, 200);
  return () => clearTimeout(id);
}
