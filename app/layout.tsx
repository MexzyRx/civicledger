import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { title: "CivicLedger", description: "Promises. Projects. Evidence." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><header className="site-header"><Link href="/" className="brand"><span className="brand-mark">CL</span><span>CivicLedger</span></Link><nav><Link href="/my-area">My Area</Link><Link href="/promises">Promises</Link><Link href="/ask">Ask CivicLedger</Link><Link href="/methodology">Methodology</Link></nav></header><div style={{background:"#f3e7c8",color:"#614b12",textAlign:"center",padding:"7px 16px",fontSize:11,fontWeight:700}}>Hackathon demo dataset · Verify every source before public release</div><main>{children}</main><footer><div><strong>CivicLedger</strong><p>Promises. Projects. Evidence.</p></div><p>Built as open civic infrastructure for Nigeria.</p></footer></body></html>;
}
