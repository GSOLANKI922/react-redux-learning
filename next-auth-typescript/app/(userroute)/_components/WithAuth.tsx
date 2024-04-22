"use client"
import { useAppContext } from "@/provider/contextProvider";
import { useRouter } from "next/navigation";
import React from "react";

const WithAuth = () => {
    const router = useRouter()
  const {
    userData: { token },
  } = useAppContext();
  if (!token) {
  return  router.push("/login")
  }
  return <></>;
};

export default WithAuth;
