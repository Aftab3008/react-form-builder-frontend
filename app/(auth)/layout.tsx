import Provider from "@/components/providers/Provider";
import React, { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Provider>{children}</Provider>
    </main>
  );
}
