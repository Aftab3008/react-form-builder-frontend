/* eslint-disable tailwindcss/classnames-order */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/form";
import { useAuthStore } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AlertTriangle } from "lucide-react";
import { z } from "zod";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await login(data);
    } catch (error) {}
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-blue-400  bg-clip-text">
                Sign In
              </h1>
              <p className="text-gray-400 mt-2">
                Sign in to your account to continue
              </p>
            </div>
            {!!error && (
              <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                <AlertTriangle className="size-4" />
                <p>{error}</p>
              </div>
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className="border-gray-600 bg-gray-700/50 pl-10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="px-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full  text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>

              <div className="mt-6 text-center">
                <Link
                  href="/signup"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Don&apos;t have an account? Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
