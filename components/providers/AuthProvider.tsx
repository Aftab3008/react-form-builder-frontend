"use client";

import { useAuthStore } from "@/store/store";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isCheckingAuth, getUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (isCheckingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated && !isCheckingAuth) {
    router.push("/sign-in");
    return null;
  }

  return <>{children}</>;
}
