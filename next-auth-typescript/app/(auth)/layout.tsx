import { redirect } from "next/navigation";
import AuthHeader from "./_components/AuthHeader";
import { getServerAuthSession } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  // if (session?.user?.token as string) {
  //   redirect("/");
  // }
  return (
    <section>
      <AuthHeader />
      <main className="auth-page"> {children}</main>
    </section>
  );
}
