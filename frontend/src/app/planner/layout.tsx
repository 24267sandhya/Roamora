import ProtectedRoute from "@/components/ProtectedRoute";

export default function PlannerLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
