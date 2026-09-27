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
    <header className="flex flex-wrap items-center justify-between gap-4 py-5 border-b border-[#171D27]">
      {/* Left Branding */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-[#F5F7FA] text-[16px] tracking-tight">
            PrivatePass
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#10141D] text-[#9CA6B7] border border-[#1D2430]">
            Midnight · Level 1
          </span>
        </div>
        <p className="text-[12px] text-[#687386] mt-0.5">
          Zero-Knowledge Credential Verification
        </p>
      </div>

      {/* Right Navigation & Wallet */}
      <div className="flex items-center gap-4 md:gap-5">
        <a
          href="https://github.com/harshwardhan1507/privatepass"
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-[#9CA6B7] hover:text-[#F5F7FA] transition-colors flex items-center gap-1.5"
        >
          GitHub
          <ExternalLink className="w-3.5 h-3.5 text-[#687386]" />
        </a>

        <a
          href="https://midnight.network"
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-[#9CA6B7] hover:text-[#F5F7FA] transition-colors flex items-center gap-1.5"
        >
          Midnight Network
          <ExternalLink className="w-3.5 h-3.5 text-[#687386]" />
        </a>

        {/* Wallet Address Status Pill */}
        <button
          onClick={handleCopy}
          title="Click to copy address"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#10141D] border border-[#1D2430] hover:border-[#252D3A] transition-colors text-[12px] font-mono text-[#9CA6B7] hover:text-[#F5F7FA]"
        >
          <span>{walletAddress}</span>
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-[#687386]" />
          )}
        </button>
      </div>
    </header>
  );
}
