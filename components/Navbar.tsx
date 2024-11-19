'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu } from 'lucide-react'

import { Button } from "@/components/ui/button"
import SearchBar from "./ui/searchbar"
import { ClientNavbar } from "./ClientNavbar"

import logo from "@/public/kraken-logo.png"

type NavItem = {
  href: string
  label: string
}

const navItems: NavItem[] = [
  { href: "/products", label: "Men" },
  { href: "/cart", label: "Women" },
  { href: "/wishlist", label: "Plain Collections" },
  { href: "/pick-any-2-combo", label: "Pick Any 2 Combo" },
  { href: "/oversized-t-shirts", label: "Oversized T-Shirts" },
]

const noNavbarRoutes = ["/signin", "/signup", "/admin"]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  if (noNavbarRoutes.includes(pathname)) {
    return null
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="h-2 bg-black" />
      <nav className="bg-white border-b border-gray-200 py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="w-full flex items-center pl-[14rem] justify-center">
              <div className="">
                <Link href="/" className="flex items-center space-x-2">
                  <Image src={logo} alt="Kraken Logo" width={50} height={50} priority />
                  <span className="text-xl font-bold sr-only ">Kraken</span>
                </Link>
              </div>
              <span className="uppercase font-thunder-lc pl-3  tracking-wider text-[40px]">Kraken</span>

            </div>

            <div className="flex items-center  space-x-4">
              <SearchBar />
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
              <div className="hidden md:flex items-center ">
                <ClientNavbar />
              </div>
            </div>
          </div>
          {/* Mobile Navigation */}
          <div
            id="mobile-menu"
            className={`md:hidden ${isMenuOpen ? "block" : "hidden"} mt-4`}
          >
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block py-2 text-gray-900 ${pathname === href ? "font-bold" : ""
                  }`}
              >
                {label}
              </Link>
            ))}
            <ClientNavbar />
          </div>
        </div>
      </nav>
    </header>
  )
}