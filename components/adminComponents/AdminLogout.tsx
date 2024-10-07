"use client";
import { Power } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export function AdminLogout() {
  return (
    <Button
      onClick={() => signOut()}
      className="group flex w-full justify-start items-center px-2 py-2 text-base font-medium rounded-md bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150 shadow-none"
    >
      <Power className="mr-4 h-5 w-5" />
      Logout
    </Button>
  );
}
