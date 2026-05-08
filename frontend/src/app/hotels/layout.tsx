import ProtectedRoute from "@/components/ProtectedRoute";

export default function HotelsLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
