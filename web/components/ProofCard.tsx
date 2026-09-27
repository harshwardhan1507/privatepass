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
    <section className="bg-[#0C0F16] border border-[#1D2430] rounded-[14px] p-6 sm:p-7 md:px-8 md:py-7 space-y-4 shadow-xl">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[#F5F7FA] font-semibold text-[17px] tracking-tight">
            Generate Zero-Knowledge Proof
          </h2>
          <p className="text-[#687386] text-[13px] mt-0.5">
            Enter your credential to generate a zero-knowledge proof. It never leaves your device.
          </p>
        </div>

        {/* Preset Selector Dropdown */}
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          <span className="text-[#687386] text-[13px]">Preset</span>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#10141D] border border-[#252D3A] hover:border-slate-600 transition-colors text-[13px] text-[#F5F7FA]"
          >
            <span>{preset === "valid" ? "Valid (0x01...)" : "Invalid (0x00...)"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#687386]" />
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 top-full mt-1.5 w-44 rounded-lg bg-[#10141D] border border-[#252D3A] z-30 py-1"
              style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.35)" }}
            >
              <button
                type="button"
                onClick={() => handleSelectPreset("valid")}
                className={`w-full text-left px-3 py-2 text-[13px] transition-colors ${
                  preset === "valid"
                    ? "bg-[rgba(99,102,241,0.12)] text-[#F5F7FA] font-medium"
                    : "text-[#D8DEE9] hover:bg-[#171D27] hover:text-[#F5F7FA]"
                }`}
              >
                Valid (0x01...)
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset("invalid")}
                className={`w-full text-left px-3 py-2 text-[13px] transition-colors ${
                  preset === "invalid"
                    ? "bg-[rgba(99,102,241,0.12)] text-[#F5F7FA] font-medium"
                    : "text-[#D8DEE9] hover:bg-[#171D27] hover:text-[#F5F7FA]"
                }`}
              >
                Invalid (0x00...)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Credential Input */}
      <div className="space-y-1.5">
        <input
          type="text"
          value={credentialInput}
          onChange={(e) => setCredentialInput(e.target.value)}
          placeholder="Enter 32-byte credential (0x...)"
          className="w-full bg-[#080B11] border border-[#252D3A] rounded-xl px-4 py-3 text-[14px] font-mono text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all"
        />
        <p className="text-[#687386] text-[12px] md:text-[13px]">
          Valid rule: leading byte must be non-zero (credential[0] != 0x00).
        </p>
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        onClick={handleVerify}
        disabled={isProving}
        style={{
          background: "linear-gradient(90deg, #4F8FF7, #7048E8)",
        }}
        className="w-full h-[48px] px-4 rounded-[9px] font-medium text-[14px] text-white hover:brightness-105 active:scale-[0.995] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
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
          style={
            result.success
              ? {
                  background: "rgba(16, 185, 129, 0.10)",
                  border: "1px solid rgba(16, 185, 129, 0.20)",
                }
              : {
                  background: "rgba(127, 29, 29, 0.10)",
                  border: "1px solid rgba(239, 68, 68, 0.20)",
                }
          }
          className="rounded-xl p-4 transition-all"
        >
          <div
            style={{ color: result.success ? "#34D399" : "#F87171" }}
            className="font-medium text-[14px]"
          >
            {result.success ? "Verification Succeeded" : "Verification Rejected"}
          </div>
          <p style={{ color: "#AEB6C4" }} className="text-[13px] mt-1 leading-relaxed">
            {result.success
              ? `The Midnight circuit verified that your credential satisfies the validity constraint. Public counter incremented to ${result.verifiedCount}.`
              : result.errorMessage}
          </p>
          {result.success && result.txHash && (
            <div className="pt-2 text-[11px] font-mono text-[#687386] flex flex-wrap gap-x-4 gap-y-1">
              <span>Tx: <span className="text-[#F5F7FA]">{result.txHash}</span></span>
              <span>Disclosed: <span className="text-[#818CF8]">valid = true</span></span>
              <span>Credential: <span className="text-[#34D399]">[Shielded in ZK Witness]</span></span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
