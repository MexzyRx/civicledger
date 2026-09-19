import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "CivicLedger — Know who represents you",
  description: "Find your representatives, see what they promised, and follow the evidence behind public projects in Nigeria.",
};

const steps = [
  { number: "01", title: "Tell us where you live", copy: "Your state, constituency, local government and ward determine the public officials who represent you." },
  { number: "02", title: "Meet your representatives", copy: "See the ten federal, state and local officials connected to your location in one clear view." },
  { number: "03", title: "Follow every commitment", copy: "Open an official’s record to review campaign promises, connected projects, progress and source evidence." },
];

const records = [
  ["10", "representatives for every citizen"],
  ["3", "levels of government"],
  ["1", "evidence trail for each claim"],
] as const;

export default function Home() {
  return <div className={styles.home}>
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>Public accountability, made personal</span>
        <h1>Know who represents you.<br/><em>Track what they promised.</em></h1>
        <p>CivicLedger connects every Nigerian to the public officials responsible for their area—and the evidence behind what those officials said they would deliver.</p>
        <div className={styles.actions}>
          <Link href="/my-area" className={styles.primary}>Explore Port Harcourt <span aria-hidden="true">→</span></Link>
          <a href="#how-it-works" className={styles.secondary}>See how it works</a>
        </div>
        <div className={styles.trust}><span>Evidence-led</span><span>Non-partisan</span><span>Built for citizens</span></div>
      </div>
      <div className={styles.ledgerCard} aria-label="Example CivicLedger record">
        <div className={styles.cardTop}><span>CIVIC RECORD</span><strong>PORT HARCOURT · WARD 6</strong></div>
        <div className={styles.cardSeal}>✓</div>
        <p>Your public officials</p>
        <strong className={styles.bigNumber}>10</strong>
        <div className={styles.levels}><span>Federal <b>4</b></span><span>State <b>3</b></span><span>Local <b>3</b></span></div>
        <div className={styles.cardFoot}><span>Promises</span><span>Projects</span><span>Evidence</span></div>
      </div>
    </section>

    <section className={styles.premise}>
      <span className={styles.sectionNumber}>01</span>
      <div><span className={styles.eyebrow}>Why CivicLedger exists</span><h2>Public promises should not disappear after election day.</h2></div>
      <p>Responsibility is often scattered across different levels of government, while evidence is buried in speeches, reports and news stories. CivicLedger brings those records together so citizens can see who is responsible, what was promised and what has actually happened.</p>
    </section>

    <section className={styles.how} id="how-it-works">
      <div className={styles.sectionIntro}><span className={styles.eyebrow}>How it works</span><h2>From your location to the evidence.</h2><p>No political expertise required. CivicLedger turns a complex system of representation into one simple journey.</p></div>
      <div className={styles.steps}>{steps.map((step)=><article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
    </section>

    <section className={styles.principle}>
      <div className={styles.principleCopy}><span className={styles.eyebrow}>Our principle</span><h2>Evidence before judgement.</h2><p>CivicLedger is not a political scorecard. Every status should be traceable to public records, credible reporting or verified citizen observations. When the evidence is incomplete, we say so.</p><Link href="/methodology">Read our methodology <span aria-hidden="true">→</span></Link></div>
      <div className={styles.recordStats}>{records.map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    </section>

    <section className={styles.citizens}>
      <div><span className={styles.eyebrow}>More than a database</span><h2>Citizens help complete the record.</h2></div>
      <p>Public documents show what government says. People on the ground can show what is happening. CivicLedger is designed to let citizens submit observations and supporting evidence without changing the official record until it has been reviewed.</p>
    </section>

    <section className={styles.finalCta}>
      <span className={styles.eyebrow}>Start with your area</span>
      <h2>See democracy from where you live.</h2>
      <p>Explore the CivicLedger prototype for Port Harcourt City, Rivers State.</p>
      <Link href="/my-area" className={styles.lightButton}>Open My Area <span aria-hidden="true">→</span></Link>
    </section>
  </div>;
}
