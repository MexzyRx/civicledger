"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { promises, projects, representatives } from "@/lib/data";

type Props = { initialProject?: string };

const signals = [
  { value: "Supports fulfilment", title: "Supports fulfilment", copy: "The commitment or project appears delivered." },
  { value: "Shows partial fulfilment", title: "Shows partial fulfilment", copy: "Some delivery is visible, but work remains." },
  { value: "Contradicts fulfilment", title: "Contradicts fulfilment", copy: "The available evidence challenges the current claim." },
  { value: "Unable to determine", title: "Unable to determine", copy: "The evidence is relevant, but the outcome is unclear." },
] as const;

export default function EvidenceIntake({ initialProject = "" }: Props) {
  const seededProject = projects.find(item => item.slug === initialProject);
  const seededPromise = seededProject?.promiseSlug ? promises.find(item => item.slug === seededProject.promiseSlug) : undefined;
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [official, setOfficial] = useState(seededPromise?.officialSlugs[0] || "");
  const [recordType, setRecordType] = useState<"promise" | "project">(seededProject ? "project" : "promise");
  const [recordSlug, setRecordSlug] = useState(seededProject?.slug || "");
  const [signal, setSignal] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(seededProject?.location || "Port Harcourt City");
  const [observedDate, setObservedDate] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const availablePromises = useMemo(() => official ? promises.filter(item => item.officialSlugs.includes(official)) : promises, [official]);
  const availableProjects = useMemo(() => {
    if (!official) return projects;
    const linkedSlugs = new Set(availablePromises.flatMap(item => item.projectSlugs));
    return projects.filter(item => linkedSlugs.has(item.slug));
  }, [official, availablePromises]);
  const selectedOfficial = representatives.find(item => item.slug === official);
  const selectedRecord = recordType === "promise" ? promises.find(item => item.slug === recordSlug) : projects.find(item => item.slug === recordSlug);

  function chooseOfficial(value: string) {
    setOfficial(value);
    setRecordSlug("");
  }

  function chooseType(value: "promise" | "project") {
    setRecordType(value);
    setRecordSlug("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedRecord || !signal || !consent) return;
    const recordLabel = "title" in selectedRecord ? selectedRecord.title : selectedRecord.name;
    const item = {
      id: Date.now(),
      official: selectedOfficial?.name || "Not specified",
      officialRole: selectedOfficial?.role || "",
      recordType,
      recordSlug,
      record: recordLabel,
      project: recordLabel,
      status: signal,
      description,
      location,
      date: observedDate,
      sourceUrl,
      attachment: fileName,
      contributor: name,
      contributorEmail: email,
      moderation: "Pending",
      created: new Date().toISOString(),
    };
    const current = JSON.parse(localStorage.getItem("civicledger-submissions") || "[]");
    localStorage.setItem("civicledger-submissions", JSON.stringify([item, ...current]));
    setDone(true);
  }

  if (done) return <div className="intake-success"><span>✓</span><p className="kicker">Submission received</p><h1>Your evidence is now awaiting review.</h1><p>Thank you for helping complete the public record. Your submission will not change CivicLedger’s published assessment until a moderator reviews it.</p><div><Link href="/my-area" className="button">Return to My Area</Link><Link href="/admin/submissions" className="text-link">View demo moderation queue →</Link></div></div>;

  return <form className="intake-card" onSubmit={submit}>
    <div className="intake-progress" aria-label={`Step ${step} of 3`}><div className={step >= 1 ? "active" : ""}><i>1</i><span>Select record</span></div><b/><div className={step >= 2 ? "active" : ""}><i>2</i><span>Add evidence</span></div><b/><div className={step >= 3 ? "active" : ""}><i>3</i><span>Review</span></div></div>

    {step === 1 ? <section className="intake-step"><span className="kicker">Step 1 of 3</span><h2>What public record is this about?</h2><p>Connect your evidence to the official, promise or project it helps verify.</p><label>Public official<select required value={official} onChange={event => chooseOfficial(event.target.value)}><option value="">Select an official</option>{representatives.map(item => <option value={item.slug} key={item.slug}>{item.role} — {item.name}</option>)}</select></label><fieldset><legend>Record type</legend><div className="record-type"><label><input type="radio" checked={recordType === "promise"} onChange={() => chooseType("promise")}/><span><strong>Campaign promise</strong><small>A commitment attributed to an official</small></span></label><label><input type="radio" checked={recordType === "project"} onChange={() => chooseType("project")}/><span><strong>Public project</strong><small>Physical delivery connected to a commitment</small></span></label></div></fieldset><label>{recordType === "promise" ? "Promise" : "Project"}<select required value={recordSlug} onChange={event => setRecordSlug(event.target.value)}><option value="">Select a {recordType}</option>{(recordType === "promise" ? availablePromises : availableProjects).map(item => <option value={item.slug} key={item.slug}>{"title" in item ? item.title : item.name}</option>)}</select></label>{official && recordType === "project" && availableProjects.length === 0 ? <p className="intake-alert">No connected projects are currently listed for this official. You can submit evidence against one of their tracked promises instead.</p> : null}<div className="intake-actions"><span/><button type="button" className="button" disabled={!official || !recordSlug} onClick={() => setStep(2)}>Continue →</button></div></section> : null}

    {step === 2 ? <section className="intake-step"><span className="kicker">Step 2 of 3</span><h2>What does your evidence show?</h2><p>Describe only what you observed or can support with a credible source.</p><fieldset><legend>Evidence indicates</legend><div className="signal-grid">{signals.map(item => <label key={item.value}><input required type="radio" name="signal" value={item.value} checked={signal === item.value} onChange={() => setSignal(item.value)}/><span><strong>{item.title}</strong><small>{item.copy}</small></span></label>)}</div></fieldset><label>What did you observe?<textarea required minLength={20} maxLength={1600} rows={6} value={description} onChange={event => setDescription(event.target.value)} placeholder="Describe what you saw or what the source establishes. Include specific details that a reviewer can check."/><small className="field-hint">Minimum 20 characters · Avoid speculation or allegations.</small></label><div className="form-row"><label>Location<input required value={location} onChange={event => setLocation(event.target.value)} placeholder="Community, ward or project site"/></label><label>Date observed or published<input required type="date" value={observedDate} onChange={event => setObservedDate(event.target.value)}/></label></div><label>Supporting source link <small>Optional</small><input type="url" value={sourceUrl} onChange={event => setSourceUrl(event.target.value)} placeholder="https://news-site.gov.ng/report"/></label><label className="file-field">Photo or document <small>Optional · PNG, JPG or PDF</small><input type="file" accept="image/png,image/jpeg,application/pdf" onChange={event => setFileName(event.target.files?.[0]?.name || "")}/>{fileName ? <span>✓ {fileName}</span> : null}</label><div className="intake-actions"><button type="button" className="button secondary" onClick={() => setStep(1)}>← Back</button><button type="button" className="button" disabled={!signal || description.trim().length < 20 || !location || !observedDate} onClick={() => setStep(3)}>Review evidence →</button></div></section> : null}

    {step === 3 ? <section className="intake-step"><span className="kicker">Step 3 of 3</span><h2>Review your submission</h2><p>Confirm the record and evidence are accurate before sending them for moderation.</p><div className="review-record"><span>Connected record</span><strong>{selectedRecord && ("title" in selectedRecord ? selectedRecord.title : selectedRecord.name)}</strong><small>{selectedOfficial?.role} · {selectedOfficial?.name}</small></div><dl className="review-grid"><div><dt>What it indicates</dt><dd>{signal}</dd></div><div><dt>Date</dt><dd>{observedDate}</dd></div><div><dt>Location</dt><dd>{location}</dd></div><div><dt>Supporting material</dt><dd>{fileName || sourceUrl || "Description only"}</dd></div></dl><blockquote className="review-quote">{description}</blockquote><div className="optional-contact"><h3>Can we contact you if clarification is needed?</h3><p>Optional. These details will not be displayed publicly.</p><div className="form-row"><label>Name<input value={name} onChange={event => setName(event.target.value)}/></label><label>Email<input type="email" value={email} onChange={event => setEmail(event.target.value)}/></label></div></div><label className="check intake-consent"><input required type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)}/> <span>I confirm this is an honest account and I have the right to share the supporting material.</span></label><div className="moderation-note"><strong>What happens next?</strong><p>A moderator will review the evidence for relevance, source quality and duplication. It will not automatically change the published fulfilment status.</p></div><div className="intake-actions"><button type="button" className="button secondary" onClick={() => setStep(2)}>← Edit evidence</button><button type="submit" className="button" disabled={!consent}>Submit for review →</button></div></section> : null}
  </form>;
}
