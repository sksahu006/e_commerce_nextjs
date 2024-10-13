import Navbar from "@/components/Navbar";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./Providers";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Kraken World",
  description: "Kraken World",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const referer = headersList.get("referer");
  
  const url = referer ? new URL(referer) : { pathname: "/" };
  const pathname = url.pathname || "/";
  console.log("pathname====================>",pathname)

  const noNavbarRoutes = ["/signin", "/signup", "/admin"];
console.log("noNavbarRoutes.includes(pathname) || pathname?.startsWith=====================>",noNavbarRoutes.includes(pathname) || pathname?.startsWith("/admin"))
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          inter.variable
        )}
      >
        <Providers>
          {!(
            noNavbarRoutes.includes(pathname) || pathname?.startsWith("/admin")
          ) && <Navbar pathname={pathname} />}
          <main className="mx-auto">{children}</main>
          {!(
            noNavbarRoutes.includes(pathname) || pathname?.startsWith("/admin")
          ) && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
