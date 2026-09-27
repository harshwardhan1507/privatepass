import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrivatePass | Privacy-Preserving Credential Verification",
  description: "Prove you possess a valid credential without revealing it on Midnight Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
