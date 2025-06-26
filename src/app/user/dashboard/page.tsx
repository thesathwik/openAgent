"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
};

export default DashboardPage;