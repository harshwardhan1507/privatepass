# PrivatePass

> **Prove you possess a valid credential — without revealing it.**

PrivatePass is a privacy-preserving dApp built on [Midnight Network](https://midnight.network). It demonstrates how zero-knowledge proofs allow a user to prove eligibility or credential possession while keeping the underlying private data off-chain and invisible on the public ledger.

---

## Why Midnight?

Public blockchains store all transaction data and contract state visibly on-chain. This is a fundamental mismatch for use cases involving sensitive information:

- Identity credentials
- Private eligibility proofs
- Confidential verifications

Midnight solves this with a **dual-state model**:

| State | Visibility |
|-------|-----------|
| `verifiedCount` | Public — anyone can read it |
| Private credential | Private — never touches the ledger |

Zero-knowledge circuits run user-supplied private data through a validity check and produce a proof. Only the proof — not the data — is submitted on-chain.

---

## Privacy Model

```
User supplies:
  credential = "my-secret-value"   ← stays private, never on-chain

ZK Circuit:
  is_valid(credential) → true/false

Midnight ledger records:
  verifiedCount += 1               ← public, visible to all

Nobody sees:
  credential                       ← private witness, ZK-protected
```

The contract uses `disclose()` deliberately and only where required — enforcing that private data doesn't leak into public state by accident.

---

## Architecture

```
┌──────────────────────────┐
│          Vercel          │
│                          │
│       Next.js App        │
│           │              │
│      Midnight.js SDK     │
└───────────┬──────────────┘
            │
            ▼
       User's Wallet
            │
            ▼
┌──────────────────────────┐
│     Midnight Network     │
│                          │
│  PrivatePass Contract    │
│                          │
│  Public:                 │
│    verifiedCount: Uint   │
│                          │
│  Private:                │
│    credential (witness)  │
└──────────────────────────┘
```

---

## Repository Structure

```
privatepass/
├── contract/
│   ├── src/
│   │   └── privatepass.compact    ← ZK contract
│   ├── test/
│   │   └── privatepass.test.ts    ← contract tests
│   └── managed/                   ← generated (gitignored)
│
├── web/
│   ├── app/                       ← Next.js app router
│   ├── components/                ← UI components
│   └── lib/                       ← Midnight.js integration
│
├── README.md
└── package.json
```

---

## Local Setup

### Prerequisites

- Node.js v22+
- WSL (Ubuntu) for running the Compact compiler on Windows
- Compact compiler: `compact` CLI

### Install Compact compiler (Linux/WSL/macOS)

```bash
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh

compact update
```

### Install dependencies

```bash
npm install
```

### Compile the contract

```bash
cd contract
compact compile src/privatepass.compact managed/
```

### Run tests

```bash
cd contract
npm test
```

---

## Contract Compilation

> _Screenshot of successful compilation will be added here after deployment._

---

## Tests

> _Test output will be added here._

---

## Deployment

**Network:** Midnight Preview (Testnet)

**Contract address:** _TBD after deployment_

---

## Live Application

**Vercel URL:** _TBD after deployment_

---

## GitHub

https://github.com/harshwardhan1507/privatepass

---

## Built With

- [Midnight Network](https://midnight.network) — Privacy-preserving blockchain
- [Compact](https://github.com/LFDT-Minokawa/compact) — ZK smart contract language
- [Midnight.js](https://github.com/midnightntwrk/midnight-js) — TypeScript SDK
- [Next.js](https://nextjs.org) — Frontend framework
- [Tailwind CSS](https://tailwindcss.com) — Styling
