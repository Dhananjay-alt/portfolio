import { cn } from "@/lib/utils";

/**
 * Painted golden-hour landscape standing in for the cinematic hero photo:
 * dusty-lilac sky warming to a low sun, layered ridgelines in haze, and a
 * film-grain pass so it reads as photographic rather than vector.
 *
 * To use a real photograph instead, render a `next/image` with `fill` and
 * `object-cover` in place of this component — the hero layout is unchanged.
 */
export function GoldenHourBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("grain absolute inset-0 overflow-hidden", className)}>
      {/* Sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #c3c6d4 0%, #d6cfd5 22%, #e8d6cb 42%, #f1d2b0 58%, #efc08f 70%, #e2a978 78%, #b98a6f 86%, #7c6152 100%)",
        }}
      />
      {/* Low sun + bloom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 34% 26% at 70% 74%, rgba(255, 241, 214, 0.95) 0%, rgba(255, 219, 165, 0.55) 30%, rgba(255, 200, 140, 0) 70%), radial-gradient(ellipse 80% 40% at 70% 78%, rgba(255, 214, 160, 0.45) 0%, rgba(255, 214, 160, 0) 70%)",
        }}
      />
      {/* High, thin cloud streaks */}
      <div
        className="absolute inset-x-0 top-[18%] h-[30%] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 40% 8% at 22% 40%, rgba(255, 244, 236, 0.7), transparent 70%), radial-gradient(ellipse 30% 6% at 78% 22%, rgba(255, 240, 230, 0.6), transparent 70%), radial-gradient(ellipse 26% 5% at 54% 70%, rgba(255, 236, 220, 0.5), transparent 70%)",
        }}
      />
      {/* Ridgelines, far → near */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[42%] w-full"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <path
          d="M0 170 C 120 140 220 150 320 128 C 430 104 520 132 640 118 C 760 104 840 70 960 96 C 1080 122 1180 92 1290 104 C 1360 112 1410 120 1440 116 L1440 400 L0 400 Z"
          fill="#c9977c"
          opacity="0.5"
        />
        <path
          d="M0 230 C 140 200 250 214 380 190 C 520 166 610 206 760 196 C 900 186 1000 150 1130 168 C 1250 184 1350 176 1440 186 L1440 400 L0 400 Z"
          fill="#a17462"
          opacity="0.72"
        />
        <path
          d="M0 300 C 180 270 320 290 470 276 C 640 260 760 300 940 292 C 1110 284 1260 262 1440 276 L1440 400 L0 400 Z"
          fill="#6e5246"
        />
        <path
          d="M0 352 C 240 336 480 350 720 344 C 960 338 1200 350 1440 342 L1440 400 L0 400 Z"
          fill="#4d3a33"
        />
      </svg>
      {/* Atmospheric haze over the ridges */}
      <div
        className="absolute inset-x-0 bottom-0 h-[46%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(242, 208, 170, 0) 0%, rgba(242, 208, 170, 0.28) 40%, rgba(66, 29, 36, 0.18) 100%)",
        }}
      />
    </div>
  );
}
