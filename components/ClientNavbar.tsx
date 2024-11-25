"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import UserLoginState from "./UserLoggInState";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
import { Button } from "./ui/button";
export function ClientNavbar() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return (
    <>
      {session ? (
        <>
          <UserLoginState />
          <Wishlist />
          {userId && <Cart userId={userId as string} />}
        </>
      ) : (
        <>
          <Link
            href="/signin"
            className="text-gray-900 font-semibold uppercase mr-3"
          >
            <Button className="uppercase">log in</Button>
          </Link>
        </>
      )}
    </>
  );
}
