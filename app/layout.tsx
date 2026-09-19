import type { Metadata } from "next";
import Link from "next/link";
import ChatWidget from "@/components/chat-widget";
import "./globals.css";
import "./representatives.css";
import "./chat-widget.css";

export const metadata: Metadata = { title: "CivicLedger", description: "Promises. Projects. Evidence." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><header className="site-header"><Link href="/" className="brand"><span className="brand-mark">✓</span><span>CivicLedger</span></Link><nav><Link href="/my-area">My Area</Link><Link href="/representatives">Representatives</Link><Link href="/promises">Promises</Link><Link href="/methodology">Methodology</Link></nav><ChatWidget/></header><main>{children}</main><footer><div><strong>CivicLedger</strong><p>Promises. Projects. Evidence.</p></div><p>Built as open civic infrastructure for Nigeria.</p></footer></body></html>;
}
