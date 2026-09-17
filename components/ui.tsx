import Link from "next/link";
import { PromiseRecord, Project, statusClass } from "@/lib/data";

export function StatusPill({status}:{status:PromiseRecord["status"]}){return <span className={statusClass(status)}>{status}</span>}
export function Confidence({value}:{value:PromiseRecord["confidence"]}){return <span className="confidence"><i className={value.toLowerCase()} />{value} confidence</span>}
export function Progress({value}:{value:number}){return <div className="progress-wrap"><div className="progress-label"><span>Verified progress</span><strong>{value}%</strong></div><div className="progress"><i style={{width:`${value}%`}} /></div></div>}
export function PromiseCard({promise}:{promise:PromiseRecord}){return <Link href={`/promises/${promise.slug}`} className="record-card"><div className="card-top"><span className="eyebrow">{promise.sector} · {promise.level}</span><StatusPill status={promise.status}/></div><h3>{promise.title}</h3><p>{promise.location}</p><Progress value={promise.progress}/><div className="card-foot"><Confidence value={promise.confidence}/><span>Updated {promise.updated}</span></div></Link>}
export function ProjectCard({project}:{project:Project}){return <Link href={`/projects/${project.slug}`} className="record-card"><div className="card-top"><span className="eyebrow">{project.unpromised?"Unpromised delivery":"Connected project"}</span><StatusPill status={project.status}/></div><h3>{project.name}</h3><p>{project.description}</p><Progress value={project.progress}/></Link>}
export function Breadcrumbs({items}:{items:{label:string;href?:string}[]}){return <div className="breadcrumbs">{items.map((x,i)=><span key={x.label}>{i>0&&" / "}{x.href?<Link href={x.href}>{x.label}</Link>:x.label}</span>)}</div>}
