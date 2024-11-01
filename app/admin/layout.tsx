import AdminSidebar from "@/components/adminComponents/AdminSidebar";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProtectedAdminPage from "@/components/ProtectedAminRoute";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedAdminPage>
      <div className="flex h-screen bg-gray-100">
         <LoadingSpinner/>
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-5">{children}</main>
      </div>
    </ProtectedAdminPage>
  );
}
