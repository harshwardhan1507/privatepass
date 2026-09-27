"use client";

import React, { useState } from "react";
import { ExternalLink, Copy, Check } from "lucide-react";

interface HeaderProps {
  walletAddress: string;
}

export function Header({ walletAddress }: HeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 py-6 border-b border-border-subtle">
      {/* Left Branding */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-white text-[17px] tracking-tight">
            PrivatePass
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-surface-elevated text-secondaryText border border-border">
            Midnight · Level 1
          </span>
        </div>
        <p className="text-[12px] text-mutedText mt-0.5">
          Zero-Knowledge Credential Verification
        </p>
      </div>

      {/* Right Navigation & Wallet */}
      <div className="flex items-center gap-5">
        <a
          href="https://github.com/harshwardhan1507/privatepass"
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-secondaryText hover:text-primaryText transition-colors flex items-center gap-1.5"
        >
          GitHub
          <ExternalLink className="w-3.5 h-3.5 text-mutedText" />
        </a>

        <a
          href="https://midnight.network"
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-secondaryText hover:text-primaryText transition-colors flex items-center gap-1.5"
        >
          Midnight Network
          <ExternalLink className="w-3.5 h-3.5 text-mutedText" />
        </a>

        {/* Wallet Address Chip */}
        <button
          onClick={handleCopy}
          title="Click to copy address"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-elevated border border-border hover:border-slate-600 transition-colors text-[12px] font-mono text-secondaryText"
        >
          <span>{walletAddress}</span>
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-mutedText hover:text-secondaryText" />
          )}
        </button>
      </div>
    </header>
  );
}
