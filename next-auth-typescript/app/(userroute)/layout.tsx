import { getServerAuthSession } from "@/lib/auth";
import UserPageLayout from "./_components/UserPageLayout";
import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerAuthSession();
  const session = await getSession();
  // if (!session?.user?.token) {
  //   redirect("/login");
  // }

  return (
    <section>
      <UserPageLayout>{children}</UserPageLayout>
    </section>
  );
}
