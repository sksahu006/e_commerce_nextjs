import Navbar from "@/components/Navbar";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./Providers";
// import ProtectedRoutes from "@/components/ProtectedRoute";

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
  const pathname = headers().get("x-pathname") || "/"; 

  const noNavbarRoutes = ["/signin", "/signup", "/admin"];

  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          inter.variable
        )}
      >
        <Providers>
          {!noNavbarRoutes.includes(pathname) && (
            <Navbar pathname={pathname} />
          )}
           {/* <ProtectedRoutes> */}
          <main className="mx-auto">{children}</main>
          {/* </ProtectedRoutes> */}
        </Providers>
      </body>
    </html>
  );
}
