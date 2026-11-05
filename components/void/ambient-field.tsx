import { Constellation } from "./constellation";

/** Sparse, low-opacity triangles drifting behind every page. */
export function AmbientField() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <Constellation shape="ambient" count={140} seed={21} intensity={0.32} />
    </div>
  );
}
