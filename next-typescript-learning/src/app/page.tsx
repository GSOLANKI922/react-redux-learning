import { auth } from "@/auth";
import { useSession } from "next-auth/react";

export default async function Home() {
  const sesssion = await auth();
  console.log(sesssion, "sesssiodddn");

  return <main className="main-container">Hello</main>;
}
