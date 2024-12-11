"use client";

import { useAuthStore } from "@/store/store";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
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

  if (isAuthenticated && !isCheckingAuth) {
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  }
  return <>{children}</>;
}
