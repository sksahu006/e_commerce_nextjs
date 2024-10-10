import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Mail, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className=" border-t-[1px] font-TwentiethCenturyforKenmoreLight font-semibold  py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Logo and Tagline */}
          <div className="space-y-4">
            <Image src="/placeholder.svg" alt="Brand Logo" width={120} height={40} className="bg-white" />
            <p className="text-sm tracking-widest">Elevate your style with our curated collection of modern fashion essentials.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl tracking-[0.1em] font-semibold mb-4 uppercase">Quick Links</h3>
            <ul className="space-y-2">
              {["Shop", "About Us", "Contact", "Blog", "Careers"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm hover:text-gray-300 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support Links */}
          <div>
            <h3 className="text-xl tracking-[0.1em] font-semibold mb-4 uppercase">Customer Support</h3>
            <ul className="space-y-2">
              {["FAQ", "Shipping Information", "Return Policy", "Terms & Conditions"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm hover:text-gray-300 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <div className="text-xl tracking-[0.1em] font-semibold mb-4 uppercase flex ">Stay Updated <Mail className="ml-2"/></div>
            <form className="space-y-2">
                
              <Input
                type="email"
                placeholder="Enter your email"
                className=" border-gray-700 text-gray-100 placeholder-gray-400"
              />
              <Button type="submit" className="w-full font-bold hover:bg-gray-200">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 my-8">
          {[
            { icon: Instagram, label: "Instagram" },
            { icon: Facebook, label: "Facebook" },
            { icon: Twitter, label: "Twitter" },
          ].map(({ icon: Icon, label }) => (
            <Link key={label} href="#" aria-label={label}>
              <Icon className="w-6 h-6 hover:text-gray-300 transition-colors" />
            </Link>
          ))}
        </div>

        {/* Payment Methods */}
      

        {/* Copyright Information */}
        <div className="text-center text-sm  font-[800] mt-8">
          <p>&copy; {new Date().getFullYear()} Kraken Pvt All rights reserved.</p>
          <p className="mt-2">
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            {" | "}
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}