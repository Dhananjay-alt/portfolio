"use client";

import { profile } from "@/content/profile";

export function ResumeActions() {
  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-4 print:hidden">
      <a href={profile.resumeUrl} download className="btn btn-fill">
        Download PDF
        <span aria-hidden="true" className="arrow arrow-down">
          ↓
        </span>
      </a>
      <button type="button" onClick={() => window.print()} className="link">
        Print
      </button>
    </div>
  );
}
