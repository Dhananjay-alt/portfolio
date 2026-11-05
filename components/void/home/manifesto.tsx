const SENTENCE =
  "I design and ship complete systems — from realtime CRDT apps to on-chain protocols and agentic developer tools.";

/** Pinned statement that fills from ash to bone-white as you scroll. */
export function Manifesto() {
  return (
    <section id="stage-manifesto" className="relative h-[220svh]">
      <div className="sticky top-0 flex h-[100svh] items-center">
        <div className="void-container">
          <p className="eyebrow mb-10">Approach</p>
          <div className="relative max-w-[1100px]">
            <h2 className="text-heading-lg font-normal text-[#2a2a2a]">{SENTENCE}</h2>
            <p
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 text-heading-lg font-normal text-white"
              style={{
                clipPath: "inset(0 0 calc(100% - var(--manifesto-wipe, 0%)) 0)",
              }}
            >
              {SENTENCE}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
