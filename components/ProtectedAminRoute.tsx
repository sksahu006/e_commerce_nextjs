import { getAdminSession } from "@/lib/getAdminSession";
import { redirect } from "next/navigation";

export default async function ProtectedAdminPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/signin");
    return null;
  }

  return <>{children}</>;
}
