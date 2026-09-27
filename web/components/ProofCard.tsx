"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowRight, Loader2 } from "lucide-react";
import {
  parseCredentialToBytes32,
  executeProofAndVerification,
  VerificationResult,
} from "../lib/midnight";

interface ProofCardProps {
  verifiedCount: number;
  onVerificationSuccess: (newCount: number) => void;
}

export function ProofCard({
  verifiedCount,
  onVerificationSuccess,
}: ProofCardProps) {
  const [preset, setPreset] = useState<"valid" | "invalid">("valid");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [credentialInput, setCredentialInput] = useState<string>(
    "0x01deadbeef00112233445566778899aabbccddeeff"
  );
  const [isProving, setIsProving] = useState<boolean>(false);
  const [result, setResult] = useState<VerificationResult | null>({
    success: false,
    verifiedCount: 0,
    disclosed: { valid: false },
    privateWitnessPreserved: true,
    txHash: "",
    timestamp: new Date().toISOString(),
    errorMessage:
      "PrivatePass: credential is not valid (circuit assert failed — leading byte is 0x00).",
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPreset = (type: "valid" | "invalid") => {
    setPreset(type);
    setDropdownOpen(false);
    if (type === "valid") {
      setCredentialInput("0x01deadbeef00112233445566778899aabbccddeeff");
    } else {
      setCredentialInput("0x0000000000000000000000000000000000000000");
    }
  };

  const handleVerify = async () => {
    setIsProving(true);
    try {
      const bytes = parseCredentialToBytes32(credentialInput);
      const res = await executeProofAndVerification(bytes, verifiedCount);
      setResult(res);
      if (res.success) {
        onVerificationSuccess(res.verifiedCount);
      }
    } catch (err: any) {
      setResult({
        success: false,
        verifiedCount,
        disclosed: { valid: false },
        privateWitnessPreserved: true,
        txHash: "",
        timestamp: new Date().toISOString(),
        errorMessage: err?.message || "Unexpected verification error",
      });
    } finally {
      setIsProving(false);
    }
  };

  return (
    <section className="bg-surface border border-border rounded-2xl p-6 md:p-8 space-y-5 shadow-2xl">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-semibold text-[17px] tracking-tight">
            Generate Zero-Knowledge Proof
          </h2>
          <p className="text-mutedText text-[13px] mt-0.5">
            Enter your credential to generate a zero-knowledge proof. It never leaves your device.
          </p>
        </div>

        {/* Preset Selector Dropdown */}
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          <span className="text-mutedText text-[13px]">Preset</span>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-elevated border border-border hover:border-slate-600 transition-colors text-[13px] text-white"
          >
            <span>{preset === "valid" ? "Valid (0x01...)" : "Invalid (0x00...)"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-mutedText" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-40 rounded-lg bg-surface-elevated border border-border shadow-xl z-20 py-1">
              <button
                type="button"
                onClick={() => handleSelectPreset("valid")}
                className={`w-full text-left px-3 py-1.5 text-[13px] transition-colors ${
                  preset === "valid"
                    ? "text-indigo-400 bg-surface-dark font-medium"
                    : "text-secondaryText hover:text-white hover:bg-surface-dark"
                }`}
              >
                Valid (0x01...)
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset("invalid")}
                className={`w-full text-left px-3 py-1.5 text-[13px] transition-colors ${
                  preset === "invalid"
                    ? "text-indigo-400 bg-surface-dark font-medium"
                    : "text-secondaryText hover:text-white hover:bg-surface-dark"
                }`}
              >
                Invalid (0x00...)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Credential Input */}
      <div className="space-y-2">
        <input
          type="text"
          value={credentialInput}
          onChange={(e) => setCredentialInput(e.target.value)}
          placeholder="Enter 32-byte credential (0x...)"
          className="w-full bg-surface-dark border border-border rounded-xl px-4 py-3.5 text-[13px] md:text-[14px] font-mono text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/80 transition-all"
        />
        <p className="text-mutedText text-[12px] md:text-[13px]">
          Valid rule: leading byte must be non-zero (credential[0] != 0x00).
        </p>
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        onClick={handleVerify}
        disabled={isProving}
        className="w-full py-3.5 px-4 rounded-xl font-medium text-[14px] text-white bg-gradient-to-r from-[#3B82F6] via-[#4F46E5] to-[#7C3AED] hover:opacity-95 active:scale-[0.995] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
      >
        {isProving ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Generating Proof and Verifying...</span>
          </>
        ) : (
          <>
            <span>Generate Proof and Verify</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Verification Result Card */}
      {result && (
        <div
          className={`rounded-xl p-4 transition-all border ${
            result.success
              ? "bg-[#0B1713] border-[#153326]"
              : "bg-[#150D12] border-[#2D161F]"
          }`}
        >
          <div
            className={`font-medium text-[14px] ${
              result.success ? "text-[#34D399]" : "text-[#F87171]"
            }`}
          >
            {result.success ? "Verification Succeeded" : "Verification Rejected"}
          </div>
          <p className="text-secondaryText text-[13px] mt-1 leading-relaxed">
            {result.success
              ? `The Midnight circuit verified that your credential satisfies the validity constraint. Public counter incremented to ${result.verifiedCount}.`
              : result.errorMessage}
          </p>
          {result.success && result.txHash && (
            <div className="pt-2 text-[11px] font-mono text-mutedText flex flex-wrap gap-x-4 gap-y-1">
              <span>Tx: <span className="text-slate-300">{result.txHash}</span></span>
              <span>Disclosed: <span className="text-indigo-400">valid = true</span></span>
              <span>Credential: <span className="text-emerald-400">[Shielded in ZK Witness]</span></span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
