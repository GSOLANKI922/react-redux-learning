"use client";
import { useSession } from "next-auth/react";

const PublicRoute = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return children;
};

export default PublicRoute;
