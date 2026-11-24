"use client";

import { profile } from "@/content/profile";

export function ResumeActions() {
  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-4 print:hidden">
      <a href={profile.resumeUrl} download className="btn btn-fill">
        Download PDF
      </a>
      <button type="button" onClick={() => window.print()} className="tap link">
        Print
      </button>
    </div>
  );
}
