import ProtectedRoute from "@/components/ProtectedRoute";

export default function VehiclesLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
