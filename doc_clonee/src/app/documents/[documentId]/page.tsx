import react from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const slug = (await params).documentId;
  return <div>My Post: {slug}</div>;
}
