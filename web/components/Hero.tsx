"use client";

import React from "react";

export function Hero() {
  return (
    <section className="pt-12 pb-8 space-y-3">
      <h1 className="text-3xl md:text-[44px] font-bold text-primaryText tracking-tight leading-[1.15]">
        Prove possession<br />
        <span className="bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#9333EA] dark:from-[#3B82F6] dark:via-[#6366F1] dark:to-[#A855F7] bg-clip-text text-transparent">
          without revealing identity.
        </span>
      </h1>
      <p className="text-secondaryText text-[14px] md:text-[15px] leading-relaxed max-w-xl">
        PrivatePass uses Midnight&apos;s dual-state architecture to verify credentials off-chain via zero-knowledge proofs. The secret credential never touches the public ledger.
      </p>
    </section>
  );
}
