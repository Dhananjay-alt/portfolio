import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[80vh] place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-sm text-brand">404</p>
        <h1 className="mt-4 text-[length:var(--text-h2)] font-semibold">
          This page drifted off-chain.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
