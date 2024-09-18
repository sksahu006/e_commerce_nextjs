// components/ui/icons.tsx
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export const Icons = {
  mail: () => <Mail className="w-5 h-5" />,
  lock: () => <Lock className="w-5 h-5" />,
  google: () => <FcGoogle className="w-5 h-5" />,
};
