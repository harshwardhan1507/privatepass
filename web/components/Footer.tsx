"use client";

import React from "react";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 pt-5 pb-8 border-t border-[#1D2430] flex flex-wrap items-center justify-between gap-4 text-[13px] text-[#687386]">
      <div>Built for Midnight Builder Challenge — Level 1: New Moon</div>
      <div className="flex items-center gap-5">
        <a
          href="https://github.com/harshwardhan1507/privatepass"
          target="_blank"
          rel="noreferrer"
          className="text-[#9CA6B7] hover:text-[#F5F7FA] transition-colors flex items-center gap-1.5"
        >
          GitHub
          <ExternalLink className="w-3.5 h-3.5 text-[#687386]" />
        </a>
        <a
          href="https://midnight.network"
          target="_blank"
          rel="noreferrer"
          className="text-[#9CA6B7] hover:text-[#F5F7FA] transition-colors flex items-center gap-1.5"
        >
          Midnight Network
          <ExternalLink className="w-3.5 h-3.5 text-[#687386]" />
        </a>
      </div>
    </footer>
  );
}
