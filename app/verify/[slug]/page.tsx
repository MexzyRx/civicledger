import { redirect } from "next/navigation";

export default async function Verify({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/submit-evidence?project=${encodeURIComponent(slug)}`);
}
