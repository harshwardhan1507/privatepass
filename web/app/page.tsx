"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProofCard } from "@/components/ProofCard";
import { ExplanationCards } from "@/components/ExplanationCards";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [walletAddress] = useState<string>("mn_test1q407p6k7dfg2v98g3n...7z8q");
  const [verifiedCount, setVerifiedCount] = useState<number>(0);

  const handleVerificationSuccess = (newCount: number) => {
    setVerifiedCount(newCount);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-5xl mx-auto px-6 md:px-8">
      <div>
        <Header walletAddress={walletAddress} />
        <main className="space-y-6">
          <Hero />
          <ProofCard
            verifiedCount={verifiedCount}
            onVerificationSuccess={handleVerificationSuccess}
          />
          <ExplanationCards />
        </main>
      </div>
      <Footer />
    </div>
  );
}
