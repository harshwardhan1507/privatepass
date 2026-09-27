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
    <div className="min-h-screen flex flex-col justify-between max-w-[1200px] mx-auto px-6 md:px-10">
      <div>
        <Header walletAddress={walletAddress} />
        <main className="space-y-12">
          <Hero />
          <div className="space-y-8 md:space-y-10">
            <ProofCard
              verifiedCount={verifiedCount}
              onVerificationSuccess={handleVerificationSuccess}
            />
            <ExplanationCards />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
