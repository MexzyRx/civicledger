import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, OfficialPortrait, PromiseCard, StatusPill } from "@/components/ui";
import { getRepresentative, getRepresentativePromises, Status } from "@/lib/data";
import "./content.css";

const statuses: Status[] = ["Completed", "In Progress", "Not Started", "Modified", "Broken / Abandoned", "Insufficient Evidence"];
export default async function RepresentativeDetail({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const representative=getRepresentative(slug);
  if(!representative)notFound();
  const records=getRepresentativePromises(slug);
  const completed=records.filter(p=>p.status==="Completed").length;
  const ongoing=records.filter(p=>p.status==="In Progress").length;
  const fulfilment=records.length?Math.round(completed/records.length*100):0;
  const average=records.length?Math.round(records.reduce((sum,p)=>sum+p.progress,0)/records.length):0;
  return <div className="page narrow representative-detail">
    <Breadcrumbs items={[{label:"My Area",href:"/my-area"},{label:"Representatives",href:"/representatives"},{label:representative.name}]}/>
    <section className="official-header"><OfficialPortrait representative={representative} large/><div><span className="kicker">{representative.level} government · {representative.role}</span><h1>{representative.name}</h1><p>{representative.jurisdiction}</p><div className="official-meta"><span>{representative.party}</span><span>{representative.term}</span><span>{records.length} promises tracked</span></div></div></section>
    <div className="demo-disclosure"><strong>Explore an illustrative delivery record</strong><p>Campaign scenarios and all fulfilment figures are simulated. Any sourced public commitment is labelled separately. These figures are not verified ratings of the official.</p>{representative.pairedWith&&<p>Joint-ticket commitments are shared with the counterpart, not counted as separate promises across the platform.</p>}</div>
    <div className="profile-stats" aria-label="Simulated fulfilment statistics">{[[records.length,"Promises tracked"],[completed,"Completed"],[ongoing,"In progress"],[`${fulfilment}%`,"Fulfilment rate"]].map(([value,label])=><div className="panel" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    <div className="detail-grid"><main>
      <section className="panel"><h2>Delivery snapshot</h2><p>Fulfilment rate = completed promises ÷ all tracked promises. Average simulated progress: <strong>{average}%</strong>. These are different measures, not a political score.</p><div className="status-breakdown">{statuses.map(status=><div key={status}><StatusPill status={status}/><strong>{records.filter(p=>p.status===status).length}</strong></div>)}</div></section>
      <section className="subsection"><div className="section-heading"><div><span className="kicker">Campaign commitments</span><h2>Promises and fulfilment</h2><p>Open any promise for its target, rationale and available project links.</p></div></div><div className="stack">{records.map(item=><PromiseCard key={item.slug} promise={item}/>)}</div></section>
    </main><aside className="panel facts"><h3>Office record</h3><dl><dt>Office</dt><dd>{representative.role}</dd><dt>Jurisdiction</dt><dd>{representative.jurisdiction}</dd><dt>Term</dt><dd>{representative.term}</dd><dt>What this office controls</dt><dd>{representative.responsibility}</dd><dt>Commitments assessed as</dt><dd>{representative.commitmentType}</dd></dl>{representative.pairedWith&&<Link className="paired-link" href={`/representatives/${representative.pairedWith}`}>View joint-ticket counterpart →</Link>}</aside></div>
  </div>
}
