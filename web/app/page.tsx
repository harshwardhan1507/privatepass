"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Wallet,
  Lock,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  ExternalLink,
} from "lucide-react";
import {
  parseCredentialToBytes32,
  executeProofAndVerification,
  WalletState,
  VerificationResult,
} from "../lib/midnight";

export default function Home() {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: null,
    network: "Midnight Preview Testnet",
  });

  const [credentialInput, setCredentialInput] = useState<string>("0x01deadbeef00112233445566778899aabbccddeeff");
  const [verifiedCount, setVerifiedCount] = useState<number>(0);
  const [isProving, setIsProving] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<VerificationResult | null>(null);

  // Connect / disconnect wallet simulation
  const handleToggleWallet = () => {
    if (wallet.connected) {
      setWallet({
        connected: false,
        address: null,
        network: "Midnight Preview Testnet",
      });
    } else {
      setWallet({
        connected: true,
        address: "mn_test1q407p6k7dfg2v98g3n...7z8q",
        network: "Midnight Preview Testnet",
      });
    }
  };

  // Quick preset helper
  const setPreset = (type: "valid" | "invalid") => {
    if (type === "valid") {
      setCredentialInput("0x01deadbeef00112233445566778899aabbccddeeff");
    } else {
      setCredentialInput("0x0000000000000000000000000000000000000000");
    }
    setLastResult(null);
  };

  // Run ZK proof & verify circuit
  const handleVerify = async () => {
    if (!wallet.connected) {
      alert("Please connect your Midnight wallet first.");
      return;
    }

    setIsProving(true);
    setLastResult(null);

    try {
      const bytes = parseCredentialToBytes32(credentialInput);
      const result = await executeProofAndVerification(bytes, verifiedCount);
      setLastResult(result);
      if (result.success) {
        setVerifiedCount(result.verifiedCount);
      }
    } catch (err: any) {
      setLastResult({
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
    <main className="min-h-screen flex flex-col justify-between p-4 md:p-8 max-w-4xl mx-auto">
      {/* Top Navbar */}
      <header className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
              PrivatePass
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Midnight Level 1
              </span>
            </h1>
            <p className="text-xs text-slate-400">Zero-Knowledge Credential Verification</p>
          </div>
        </div>

        <button
          onClick={handleToggleWallet}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            wallet.connected
              ? "bg-slate-800 text-emerald-400 border border-emerald-500/30 hover:bg-slate-700"
              : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
          }`}
        >
          <Wallet className="w-4 h-4" />
          {wallet.connected ? (
            <span>{wallet.address}</span>
          ) : (
            <span>Connect Midnight Wallet</span>
          )}
        </button>
      </header>

      {/* Main Content Area */}
      <div className="py-8 space-y-6">
        {/* Hero Explanation */}
        <div className="text-center space-y-2 py-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Prove possession without revealing identity.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            PrivatePass uses Midnight&apos;s dual-state architecture to verify credentials off-chain via zero-knowledge proofs. The secret credential never touches the public ledger.
          </p>
        </div>

        {/* Counter & Dual State Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Public Ledger State</div>
            <div className="text-3xl font-black text-indigo-400 mt-2 flex items-baseline gap-2">
              {verifiedCount}
              <span className="text-xs font-normal text-slate-500">verifications</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              <code className="text-indigo-300">verifiedCount: Counter</code> — anyone can view this on-chain.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Private Witness</div>
            <div className="text-sm font-semibold text-emerald-400 mt-2 flex items-center gap-1.5">
              <EyeOff className="w-4 h-4" />
              <span>100% Shielded</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              <code className="text-emerald-300">getCredential(): Bytes&lt;32&gt;</code> — remains off-chain in prover witness.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Deliberate Disclosure</div>
            <div className="text-sm font-semibold text-amber-400 mt-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>disclose(valid)</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Only the 1-bit boolean validity statement is declassified for ledger assertion.
            </p>
          </div>
        </div>

        {/* Verification Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400" />
              Private Credential (32-byte Witness)
            </label>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Presets:</span>
              <button
                type="button"
                onClick={() => setPreset("valid")}
                className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
              >
                Valid (0x01...)
              </button>
              <button
                type="button"
                onClick={() => setPreset("invalid")}
                className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20"
              >
                Invalid (0x00...)
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <input
              type="text"
              value={credentialInput}
              onChange={(e) => setCredentialInput(e.target.value)}
              placeholder="Enter 32-byte hex (0x01...) or passphrase..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-slate-500">
              Valid rule: leading byte must be non-zero (<code className="text-slate-400">credential[0] != 0x00</code>).
            </p>
          </div>

          <button
            onClick={handleVerify}
            disabled={isProving}
            className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
              isProving
                ? "bg-indigo-600/50 text-indigo-200 cursor-wait"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
            }`}
          >
            {isProving ? (
              <>
                <Cpu className="w-4 h-4 animate-spin" />
                <span>Computing ZK Proof & Verifying on Midnight...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Generate ZK Proof & Verify Credential</span>
              </>
            )}
          </button>

          {/* Result Alert */}
          {lastResult && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                lastResult.success
                  ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-200"
                  : "bg-rose-950/40 border-rose-500/30 text-rose-200"
              }`}
            >
              {lastResult.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 text-xs">
                <div className="font-semibold text-sm">
                  {lastResult.success ? "ZK Proof Verified Successfully" : "Verification Rejected"}
                </div>
                <p className="text-slate-300">
                  {lastResult.success
                    ? "The Midnight circuit verified that your credential satisfies the validity constraint. Public counter incremented."
                    : lastResult.errorMessage}
                </p>
                {lastResult.success && (
                  <div className="pt-2 text-slate-400 font-mono text-[11px] space-y-0.5">
                    <div>Tx Hash: <span className="text-slate-200">{lastResult.txHash}</span></div>
                    <div>Disclosed: <span className="text-amber-300">valid = true</span></div>
                    <div>Private Credential: <span className="text-emerald-300">[Protected in ZK Witness]</span></div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Architecture & Privacy Explanation Section */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            How Privacy Works in PrivatePass
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400">
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                Off-Chain Prover (Witness)
              </div>
              <p>
                The private credential is supplied to the client-side witness provider. It runs locally inside the zero-knowledge arithmetic circuit and is never published or transmitted to public nodes.
              </p>
            </div>
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                On-Chain Verifier & Ledger
              </div>
              <p>
                The contract circuit asserts <code className="text-indigo-300">assert(disclose(valid))</code>. Only the 1-bit validation boolean is declassified to confirm validity, and <code className="text-indigo-300">verifiedCount</code> increments publicly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-4">
        <div>
          Built for <strong className="text-slate-300">Midnight Builder Challenge — Level 1: New Moon</strong>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/harshwardhan1507/privatepass"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-300 transition-colors flex items-center gap-1"
          >
            GitHub <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://midnight.network"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-300 transition-colors flex items-center gap-1"
          >
            Midnight Network <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </footer>
    </main>
  );
}
