import EvidenceIntake from "@/components/evidence-intake";

export default async function SubmitEvidencePage({ searchParams }: { searchParams: Promise<{ project?: string }> }) {
  const { project } = await searchParams;
  return <div className="evidence-page"><div className="evidence-intro"><span className="kicker">Citizen evidence intake</span><h1>Help complete the public record.</h1><p>Share first-hand observations, documents or credible reporting that supports—or challenges—a fulfilment claim.</p><div><span>✓ Every submission is reviewed</span><span>✓ Evidence can support either outcome</span><span>✓ Published statuses never change automatically</span></div></div><EvidenceIntake initialProject={project}/></div>;
}
