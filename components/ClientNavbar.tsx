"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";
import UserLoginState from "./UserLoggInState";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
import { Button } from "./ui/button";
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
          <Link href="/signin" className="text-gray-900 font-semibold uppercase mr-3"><Button className="uppercase">log in</Button></Link>
          {/* <Link href="/signup" className="text-gray-900 font-semibold uppercase"><Button className="uppercase">log in</Button></Link> */}
        </>
      )}
    </>
  );
}