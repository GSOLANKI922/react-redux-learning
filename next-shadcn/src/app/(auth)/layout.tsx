"use client";
import { AuthProvider } from "@/lib/contexts/AuthContext";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>{" "}
      </body>
    </html>
  );
}
