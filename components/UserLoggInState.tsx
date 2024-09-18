"use client";

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@/stores/atoms/userStateAtom';
import { Button } from "@/components/ui/button";
import { User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';
import { signOutAction } from '@/app/actions/signoutAction';
import { useRouter } from 'next/navigation';

export default function UserLoginState() {
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);
  const [isPending, startTransition] = useTransition();
  const router =  useRouter();


  const handleSignOut = () => {
    startTransition(async () => {
      const result = await signOutAction();
      if (result.success) {
        setUser(null);
        router.push("/signin");
      } else {
        console.error(result.error);
      }
    });
  };

  if (!user) {
    return (
      <Link href="/signin">
        <Button variant="ghost">Sign In</Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="icon">
        <User className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleSignOut}
        disabled={isPending}
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  );
}