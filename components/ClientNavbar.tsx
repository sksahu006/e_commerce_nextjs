"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";
import UserLoginState from "./UserLoggInState";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
export function ClientNavbar() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <UserLoginState />
          <Wishlist />
          <Cart />
        </>
      ) : (
        <>
          <Link href="/signin" className="text-gray-900 font-semibold">Sign In</Link>
          <Link href="/signup" className="text-gray-900 font-semibold">Sign Up</Link>
        </>
      )}
    </>
  );
}