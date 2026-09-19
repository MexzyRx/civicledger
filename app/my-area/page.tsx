import Link from "next/link";
import Image from "next/image";
import { promises, representatives } from "@/lib/data";
import { RepresentativeCard } from "@/components/ui";

const levels = [
  { key: "Federal", title: "Federal Government", note: "National and constituency representation" },
  { key: "State", title: "Rivers State", note: "State executive and legislative representation" },
  { key: "Local", title: "Port Harcourt City LGA", note: "Local government and Ward 6 representation" }
] as const;

export default function MyArea(){
  const completed=promises.filter(item=>item.status==="Completed").length;
  const inProgress=promises.filter(item=>item.status==="In Progress").length;
  const insufficient=promises.filter(item=>item.status==="Insufficient Evidence").length;
  return <div className="area-page">
    <section className="area-hero">
      <Image className="city-photo" src="/locations/port-harcourt-city.webp" alt="Port Harcourt city traffic and skyline at dusk" fill priority sizes="100vw"/>
      <div><span className="kicker">Your area</span><h1>Port Harcourt City</h1><strong>Rivers State, Nigeria</strong><p>Know who represents you. See what they promised. Follow the evidence.</p><div className="location-actions"><Link href="/" className="location-button">⌖ <span>Change location</span>⌄</Link><span>Rivers State <b>/</b> Port Harcourt City <b>/</b> Ward 6</span></div></div>
      <a className="city-photo-credit" href="https://commons.wikimedia.org/wiki/File:Blue_is_cool_(7968926902).jpg" target="_blank" rel="noreferrer">Port Harcourt at dusk · dotun55 / CC BY-SA 2.0</a>
    </section>
    <div className="area-shell">
      <main><div className="area-title" id="representatives"><div><span className="kicker">Location-resolved</span><h2>Your representatives</h2><p>The 10 public officials connected to where you live.</p></div><Link href="/representatives">View all representatives →</Link></div><div className="government-groups">{levels.map(level=><section className="government-group" key={level.key}><header><div><span className="government-icon" aria-hidden="true">{level.key==="Federal"?"▥":level.key==="State"?"◆":"◎"}</span><div><h3>{level.title}</h3><p>{level.note}</p></div></div><span>{representatives.filter(item=>item.level===level.key).length} representatives</span></header><div className="representative-grid">{representatives.filter(item=>item.level===level.key).map(item=><RepresentativeCard key={item.slug} representative={item}/>)}</div></section>)}</div></main>
      <aside className="area-sidebar"><section className="snapshot"><div className="snapshot-head"><span aria-hidden="true">▥</span><div><h2>Area accountability snapshot</h2><p>A quick view of commitments across your representatives.</p></div></div><dl><div><dt>{representatives.length}</dt><dd>representatives</dd></div><div><dt>{promises.length}</dt><dd>promises tracked</dd></div><div><dt>{completed}</dt><dd>completed</dd></div><div><dt>{inProgress}</dt><dd>in progress</dd></div><div><dt>{insufficient}</dt><dd>insufficient evidence</dd></div></dl><Link href="/methodology">How we verify progress <span>→</span></Link></section><section className="civic-note"><span aria-hidden="true">◉</span><h2>Informed citizens.<br/>Stronger communities.</h2><p>CivicLedger helps you hold public officials to account—with evidence, not partisan scores.</p></section></aside>
    </div>
  </div>
}
