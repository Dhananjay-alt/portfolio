"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Shuffle } from "lucide-react";

type Frame = { array: number[]; compare: [number, number] | null; sorted: number };

/** Generate the animation frames for a bubble sort (simple, visually legible). */
function bubbleFrames(input: number[]): Frame[] {
  const arr = [...input];
  const frames: Frame[] = [];
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      frames.push({ array: [...arr], compare: [j, j + 1], sorted: n - i });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        frames.push({ array: [...arr], compare: [j, j + 1], sorted: n - i });
      }
    }
  }
  frames.push({ array: [...arr], compare: null, sorted: 0 });
  return frames;
}

const SIZE = 28;

function randomArray() {
  return Array.from({ length: SIZE }, () => Math.floor(Math.random() * 90) + 10);
}

// Deterministic so server and client render identically; randomized after mount.
function seedArray() {
  return Array.from({ length: SIZE }, (_, i) =>
    Math.round(10 + 80 * (0.5 + 0.5 * Math.sin(i * 0.7))),
  );
}

export function SortingVisualizer() {
  const [data, setData] = useState<number[]>(seedArray);

  // Randomize on the client only, avoiding an SSR/client hydration mismatch.
  useEffect(() => {
    setData(randomArray());
  }, []);
  const [frame, setFrame] = useState<Frame>({ array: data, compare: null, sorted: 0 });
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setFrame({ array: data, compare: null, sorted: 0 });
  }, [data]);

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const shuffle = useCallback(() => {
    if (running) return;
    setData(randomArray());
  }, [running]);

  const run = useCallback(() => {
    if (running) return;
    const frames = bubbleFrames(data);
    let i = 0;
    setRunning(true);
    timer.current = setInterval(() => {
      setFrame(frames[i]);
      i += 1;
      if (i >= frames.length) {
        if (timer.current) clearInterval(timer.current);
        setRunning(false);
      }
    }, 60);
  }, [data, running]);

  const max = Math.max(...frame.array);

  return (
    <div>
      <div
        className="flex h-72 items-end justify-center gap-[3px] rounded-xl bg-secondary/30 p-4"
        role="img"
        aria-label="Bubble sort visualization"
      >
        {frame.array.map((v, idx) => {
          const isComparing = frame.compare?.includes(idx);
          const isSorted = frame.sorted !== 0 && idx >= frame.sorted;
          const settled = frame.compare === null;
          return (
            <div
              key={idx}
              className="flex-1 rounded-t-sm transition-[height] duration-75"
              style={{
                height: `${(v / max) * 100}%`,
                background: isComparing
                  ? "var(--brand-2)"
                  : isSorted || settled
                    ? "var(--brand)"
                    : "var(--muted-foreground)",
              }}
            />
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] disabled:opacity-50"
        >
          <Play className="size-4" /> {running ? "Sorting…" : "Bubble sort"}
        </button>
        <button
          type="button"
          onClick={shuffle}
          disabled={running}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-50"
        >
          <Shuffle className="size-4" /> Shuffle
        </button>
      </div>
    </div>
  );
}
