import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[80vh] place-items-center px-6 text-center">
      <div>
        <p className="label">404</p>
        <h1 className="text-h2 mt-4">
          This page drifted off-chain.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-mute">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
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
