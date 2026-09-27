"use client";

import React from "react";

export function ExplanationCards() {
  const steps = [
    {
      number: "01",
      title: "Off-Chain Prover",
      description:
        "The private credential is supplied to the client-side witness provider. It runs locally inside the zero-knowledge arithmetic circuit and is never published or transmitted to public nodes.",
    },
    {
      number: "02",
      title: "Zero-Knowledge Proof",
      description:
        "A cryptographic proof is generated that your credential satisfies the validity rule, without revealing the credential itself.",
    },
    {
      number: "03",
      title: "On-Chain Verifier",
      description:
        "The contract circuit asserts `assert(disclose(valid))`. Only the 1-bit validation boolean is declassified to confirm validity, and `verifiedCount` increments publicly.",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
      {steps.map((step) => (
        <div
          key={step.number}
          className="bg-[#0C0F16] border border-[#1D2430] rounded-[12px] p-6 space-y-2 transition-colors"
        >
          <div className="font-mono text-[12px] text-[#687386]">
            {step.number}
          </div>
          <h3 className="font-semibold text-[#F5F7FA] text-[15px] tracking-tight">
            {step.title}
          </h3>
          <p className="text-[#9CA6B7] text-[13px] leading-relaxed">
            {step.description}
          </p>
        </div>
      ))}
    </section>
  );
}
