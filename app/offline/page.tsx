import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false },
};

export default function OfflinePage() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="label">offline</p>
        <h1 className="text-h2 mt-4">You&apos;re offline</h1>
        <p className="mx-auto mt-4 max-w-md text-mute">
          This page isn&apos;t cached yet. Reconnect and try again — pages you&apos;ve
          already visited will still work offline.
        </p>
        <Link
          href="/"
          className="btn btn-fill mt-8"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
