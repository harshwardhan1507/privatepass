// PrivatePass Midnight integration layer
// Connects the Next.js frontend to the PrivatePass Compact contract

export interface WalletState {
  connected: boolean;
  address: string | null;
  network: string;
}

export interface VerificationResult {
  success: boolean;
  verifiedCount: number;
  disclosed: {
    valid: boolean;
  };
  privateWitnessPreserved: boolean;
  txHash: string;
  timestamp: string;
  errorMessage?: string;
}

// Convert user-provided credential string (hex or UTF-8 text) to 32-byte Uint8Array witness
export function parseCredentialToBytes32(input: string): Uint8Array {
  const bytes = new Uint8Array(32);
  const trimmed = input.trim();

  // If input is hex string (e.g. "0x01abc..." or "01abc...")
  if (/^(0x)?[0-9a-fA-F]+$/.test(trimmed) && trimmed.length >= 2) {
    const cleanHex = trimmed.startsWith("0x") ? trimmed.slice(2) : trimmed;
    for (let i = 0; i < 32 && i * 2 < cleanHex.length; i++) {
      bytes[i] = parseInt(cleanHex.substring(i * 2, i * 2 + 2), 16) || 0;
    }
  } else {
    // Treat as UTF-8 string passphrase
    const encoder = new TextEncoder();
    const encoded = encoder.encode(trimmed);
    for (let i = 0; i < 32 && i < encoded.length; i++) {
      bytes[i] = encoded[i];
    }
  }

  return bytes;
}

// Client-side execution of the verify circuit adhering to the Compact contract logic
export async function executeProofAndVerification(
  credentialBytes: Uint8Array,
  currentCount: number
): Promise<VerificationResult> {
  // Step 1: Simulate proof generation delay (local proof server interaction)
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Step 2: In-circuit validity check: credential[0] != 0x00
  const isValid = credentialBytes[0] !== 0x00;

  // Step 3: Circuit assertion: assert(disclose(valid), "PrivatePass: credential is not valid")
  if (!isValid) {
    return {
      success: false,
      verifiedCount: currentCount,
      disclosed: { valid: false },
      privateWitnessPreserved: true,
      txHash: "",
      timestamp: new Date().toISOString(),
      errorMessage: "PrivatePass: credential is not valid (circuit assert failed — leading byte is 0x00)",
    };
  }

  // Step 4: Disclose validity & increment public verifiedCount
  const newCount = currentCount + 1;
  const mockTxHash = "0x" + Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return {
    success: true,
    verifiedCount: newCount,
    disclosed: { valid: true },
    privateWitnessPreserved: true,
    txHash: mockTxHash,
    timestamp: new Date().toISOString(),
  };
}
