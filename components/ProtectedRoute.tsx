import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/lib/auth";

export default async function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return <>{children}</>;
  }

  const isAdmin = session.user?.isAdmin;

  if (isAdmin) {
    redirect("/admin");
  } else {
    redirect("/");
  }

  return null;
}
