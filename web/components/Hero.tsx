"use client";

import React from "react";

export function Hero() {
  return (
    <section className="pt-12 md:pt-14 pb-0 space-y-4">
      <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-[#F5F7FA] tracking-tight leading-[1.05]">
        Prove possession<br />
        <span
          className="inline-block"
          style={{
            background: "linear-gradient(90deg, #4F9CF9, #8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          without revealing identity.
        </span>
      </h1>
      <p className="text-[#9CA6B7] text-[15px] md:text-[16px] leading-relaxed max-w-[680px]">
        PrivatePass uses Midnight&apos;s dual-state architecture to verify credentials off-chain via zero-knowledge proofs. The secret credential never touches the public ledger.
      </p>
    </section>
  );
}
