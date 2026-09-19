import Link from "next/link";
import Image from "next/image";
import { PromiseRecord, Project, Representative, getRepresentativePromises, statusClass } from "@/lib/data";

export function StatusPill({status}:{status:PromiseRecord["status"]}){return <span className={statusClass(status)}>{status}</span>}
export function Confidence({value}:{value:PromiseRecord["confidence"]}){return <span className="confidence"><i className={value.toLowerCase()} />{value} confidence</span>}
export function Progress({value}:{value:number}){return <div className="progress-wrap"><div className="progress-label"><span>Simulated progress</span><strong>{value}%</strong></div><div className="progress"><i style={{width:`${value}%`}} /></div></div>}
export function PromiseCard({promise}:{promise:PromiseRecord}){return <Link href={`/promises/${promise.slug}`} className="record-card"><div className="card-top"><span className="eyebrow">{promise.sector} · {promise.level}</span><StatusPill status={promise.status}/></div><h3>{promise.title}</h3><p>{promise.location}</p><p className="note">{promise.origin==="sourced"?"Sourced commitment · simulated assessment":"Simulated commitment & assessment"}</p><Progress value={promise.progress}/><div className="card-foot"><Confidence value={promise.confidence}/><span>Updated {promise.updated}</span></div></Link>}
export function ProjectCard({project}:{project:Project}){return <Link href={`/projects/${project.slug}`} className="record-card"><div className="card-top"><span className="eyebrow">{project.unpromised?"Unpromised delivery":"Connected project"}</span><StatusPill status={project.status}/></div><h3>{project.name}</h3><p>{project.description}</p><Progress value={project.progress}/></Link>}
export function OfficialPortrait({representative,large=false}:{representative:Representative;large?:boolean}){
  return <div className={`portrait ${large?"large ":""}level-${representative.level.toLowerCase()} ${representative.image?"has-photo":""}`}>
    {representative.image?<Image src={representative.image} alt={`Portrait of ${representative.name}`} fill sizes={large?"(max-width: 760px) 92px, 150px":"(max-width: 760px) 84px, 76px"}/>:<span aria-hidden="true">{representative.initials}</span>}
  </div>
}
export function RepresentativeCard({representative}:{representative:Representative}){
  const records=getRepresentativePromises(representative.slug);
  const average=records.length?Math.round(records.reduce((sum,item)=>sum+item.progress,0)/records.length):0;
  return <Link href={`/representatives/${representative.slug}`} className="representative-card">
    <OfficialPortrait representative={representative}/>
    <div className="representative-card-body">
      <div className="representative-role"><span>{representative.role}</span><i>{representative.party}</i></div>
      <h3>{representative.name}</h3>
      <p>{representative.jurisdiction}</p>
      <small>{representative.term}</small>
      <div className="representative-progress"><span>{records.length} {records.length===1?"promise":"promises"} tracked</span><div><i style={{width:`${average}%`}} /></div></div>
      <strong>View record <span aria-hidden="true">→</span></strong>
    </div>
  </Link>
}
export function Breadcrumbs({items}:{items:{label:string;href?:string}[]}){return <div className="breadcrumbs">{items.map((x,i)=><span key={x.label}>{i>0&&" / "}{x.href?<Link href={x.href}>{x.label}</Link>:x.label}</span>)}</div>}
