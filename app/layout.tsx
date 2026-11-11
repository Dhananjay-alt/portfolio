import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Providers } from "@/providers";
import { RegisterSW } from "@/components/pwa/register-sw";
import { InlineScript } from "@/components/site/inline-script";
import { motionCssVars } from "@/lib/motion";

// Display: a characterful serif for headings only.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

// Body.
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

// Metadata: years, tags, section numbers.
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.shortName }],
  creator: siteConfig.shortName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.shortName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f0eb" },
    { media: "(prefers-color-scheme: dark)", color: "#121211" },
  ],
};

/**
 * Runs before first paint. Adds `js` (which gates every hidden initial state,
 * so the page reads in full without JavaScript) and decides which page-load
 * intro to play: the full one on the first visit of the session, a short fade
 * afterwards. If the app never hydrates, `js` is withdrawn so nothing stays
 * hidden.
 */
const BOOT_SCRIPT = `(function(){var d=document.documentElement,c=d.classList;c.add("js");try{var k="dh:intro";if(sessionStorage.getItem(k)){c.add("intro-repeat")}else{c.add("intro-first");sessionStorage.setItem(k,"1")}}catch(e){c.add("intro-repeat")}setTimeout(function(){if(!window.__dhReady){c.remove("js")}},6000)})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={motionCssVars()}
      className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <InlineScript html={BOOT_SCRIPT} />
        <Providers>{children}</Providers>
        <RegisterSW />
      </body>
    </html>
  );
}
