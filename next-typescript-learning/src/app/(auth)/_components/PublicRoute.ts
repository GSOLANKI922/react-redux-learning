"use client";
import { useSession } from "next-auth/react";

const PublicRoute = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = useSession();
  console.log(session?.data, "session");
  return children;
};

export default PublicRoute;
