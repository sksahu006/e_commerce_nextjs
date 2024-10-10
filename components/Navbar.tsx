"use client"
import Link from "next/link";
import SearchBar from "./ui/searchbar";
import { ClientNavbar } from "./ClientNavbar";
import { usePathname } from "next/navigation";

export default function Navbar({ pathname }: { pathname: string }) {
  const navItems = [
    { href: "/men", label: "Men" },
    { href: "/women", label: "Women" },
    { href: "/plain-collections", label: "Plain Collections" },
    { href: "/pick-any-2-combo", label: "Pick Any 2 Combo" },
    { href: "/oversized-t-shirts", label: "Oversized T-Shirts" },
  ];

  const noNavbarRoutes = ["/signin", "/signup", "/admin"];

  const isActive = (href: string) => pathname === href;
  const path = usePathname();

  if (noNavbarRoutes.includes(path)) {
    return null;
  }

  return (
    <div className="flex flex-col ">

      <div  className="w-full h-2 bg-red-700 fixed top-0 z-40" />

      
      <nav className="bg-white border-b border-gray-200 py-4 w-full fixed shadow-lg top-2 z-50">
        <div className="mx-auto px-4 flex items-center justify-between">
          <div className="flex justify-between items-center space-x-6 w-[65%]">
            <Link href="/" className="text-xl font-bold">
              Logo
            </Link>
            <div className="space-x-7 flex">
              {navItems?.map(({ href, label }) => (
                <div key={href} className="group relative">
                  <Link
                    href={href}
                    className={`text-gray-900 font-semibold block ${isActive(href) ? "underline" : ""}`}
                  >
                    {label}
                  </Link>
                  <div
                    className={`bg-gray-900 h-[2px] w-0 group-hover:w-full transition-all duration-300 absolute bottom-0 left-0 ${isActive(href) ? "w-full" : ""}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4 w-[35%] justify-end">
            <SearchBar />
            <ClientNavbar />
          </div>
        </div>
      </nav>
    </div>
  );
}