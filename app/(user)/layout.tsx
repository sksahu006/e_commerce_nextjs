import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import { headers } from "next/headers";
import { Suspense } from "react";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const referer = headersList.get("referer");

  // If referer is not available, assume root path
  const url = referer ? new URL(referer) : { pathname: "/" };
  const pathname = url.pathname || "/";
  return (
    <div className="h-screen ">
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <main className="flex-1 overflow-y-auto p-5">{children}</main>
      </Suspense>
      <Footer />
    </div>
  );
}
