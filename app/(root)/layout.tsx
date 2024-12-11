import AuthProvider from "@/components/providers/AuthProvider";

export default function layout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
