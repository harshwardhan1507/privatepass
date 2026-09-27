"use client";

import React from "react";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-14 pt-6 pb-8 border-t border-border-subtle flex flex-wrap items-center justify-between gap-4 text-[13px] text-mutedText">
      <div>Built for Midnight Builder Challenge — Level 1: New Moon</div>
      <div className="flex items-center gap-5">
        <a
          href="https://github.com/harshwardhan1507/privatepass"
          target="_blank"
          rel="noreferrer"
          className="text-secondaryText hover:text-primaryText transition-colors flex items-center gap-1.5"
        >
          GitHub
          <ExternalLink className="w-3.5 h-3.5 text-mutedText" />
        </a>
        <a
          href="https://midnight.network"
          target="_blank"
          rel="noreferrer"
          className="text-secondaryText hover:text-primaryText transition-colors flex items-center gap-1.5"
        >
          Midnight Network
          <ExternalLink className="w-3.5 h-3.5 text-mutedText" />
        </a>
      </div>
    </footer>
  );
}
