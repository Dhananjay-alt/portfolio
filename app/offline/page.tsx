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
        <p className="font-mono text-sm text-brand">offline</p>
        <h1 className="mt-4 text-3xl font-semibold">You&apos;re offline</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          This page isn&apos;t cached yet. Reconnect and try again — pages you&apos;ve
          already visited will still work offline.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
