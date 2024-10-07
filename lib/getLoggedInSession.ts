import { getServerSession } from "next-auth";
import authConfig from "@/lib/auth";

export const getUserSession = async () => {
  const session = await getServerSession(authConfig);

  if (!session) {
    return null;
  }

  return session;
};
