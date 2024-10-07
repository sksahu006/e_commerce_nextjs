import { getServerSession } from "next-auth";
import authConfig from "@/lib/auth"; 

export const getAdminSession = async () => {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.isAdmin) {
    return null;
  }

  return session;
};
