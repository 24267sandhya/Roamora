import ProtectedRoute from "@/components/ProtectedRoute";

export default function BookingsLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
