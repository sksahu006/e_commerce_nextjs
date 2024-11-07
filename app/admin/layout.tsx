import AdminSidebar from "@/components/adminComponents/AdminSidebar";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProtectedAdminPage from "@/components/ProtectedAminRoute";
import { Suspense } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedAdminPage>
      <div className="flex h-screen bg-gray-100">
        <LoadingSpinner />
        <AdminSidebar />
        <Suspense fallback={<div>Loading products...</div>}>
          <main className="flex-1 overflow-y-auto p-5">{children}</main>
        </Suspense>
      </div>
    </ProtectedAdminPage>
  );
}
