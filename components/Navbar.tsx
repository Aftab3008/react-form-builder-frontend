"use client";

import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import { useAuthStore } from "@/store/store";

export default function Navbar() {
  const user = useAuthStore((state) => state.isAuthenticated);

  return (
    <nav className="flex h-[64px] items-center justify-between border-b border-border px-4 shadow-md">
      <Logo />
      <div className="flex items-center gap-4">
        {user && (
          <Button asChild variant={"link"}>
            <Link href={"/dashboard"} className="text-lg">
              Dashboard
            </Link>
          </Button>
        )}
        <ThemeSwitcher />
        {!user && (
          <Button
            variant={"secondary"}
            className="flex items-center gap-2 font-bold text-foreground"
          >
            <LogIn className="h-5 w-5" />
          </Button>
        )}
      </div>
    </nav>
  );
}
