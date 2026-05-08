import ProtectedRoute from "@/components/ProtectedRoute";

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
