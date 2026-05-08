import ProtectedRoute from "@/components/ProtectedRoute";

export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
