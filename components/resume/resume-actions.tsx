"use client";

import { Download, Printer } from "lucide-react";
import { profile } from "@/content/profile";

export function ResumeActions() {
  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <a
        href={profile.resumeUrl}
        download
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
      >
        <Download className="size-4" /> Download PDF
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
      >
        <Printer className="size-4" /> Print
      </button>
    </div>
  );
}
