"use client";

import { useSession, signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserLoginState() {
  const { data: session, status } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({ redirect: false });
      router.push("/signin");
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (status === "loading") {
    return <Button variant="ghost">Loading...</Button>;
  }

  if (!session) {
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
        disabled={isSigningOut}
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  );
}