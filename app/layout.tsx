import Navbar from "@/components/Navbar";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./Providers";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";

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
  
  // If referer is not available, assume root path
  const url = referer ? new URL(referer) : { pathname: "/" };
  const pathname = url.pathname || "/";

  // Define routes where Navbar should not appear
  const noNavbarRoutes = ["/signin", "/signup", "/admin"];

  const hideNavbar = noNavbarRoutes.includes(pathname) || pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          inter.variable
        )}
      >
        <Providers>
          {!hideNavbar && <Navbar pathname={pathname} />}
          <LoadingSpinner />
          <main className="mx-auto">{children}</main>
          {!hideNavbar && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
