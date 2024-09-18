import Link from "next/link";
import SearchBar from "./ui/searchbar";
import UserLoginState from "./UserLoggInState";
import Wishlist from "./Wishlist";
import Cart from "./Cart";

export default function Navbar({ pathname }: { pathname: string }) {
  const navItems = [
    { href: "/men", label: "Men" },
    { href: "/women", label: "Women" },
    { href: "/plain-collections", label: "Plain Collections" },
    { href: "/pick-any-2-combo", label: "Pick Any 2 Combo" },
    { href: "/oversized-t-shirts", label: "Oversized T-Shirts" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex justify-between items-center space-x-6 w-[65%]">
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>
          <div className="space-x-7 flex">
            {navItems.map(({ href, label }) => (
               <div key={href} className="group relative">
               <Link 
                 href={href} 
                 className={`text-gray-900 font-semibold block ${isActive(href) ? 'underline' : ''}`}
               >
                 {label}
               </Link>
               <div 
                 className={`bg-gray-900 h-[2px] w-0 group-hover:w-full transition-all duration-300 absolute bottom-0 left-0 ${isActive(href) ? 'w-full' : ''}`} 
               />
             </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4 w-[35%] justify-end">
          <SearchBar />
          <UserLoginState />
          <Wishlist />
          <Cart />
        </div>
      </div>
    </nav>
  );
}
