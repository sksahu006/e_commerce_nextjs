// app/signin/page.tsx
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm from "@/components/SignInForm";
import ProtectedRoutes from "@/components/ProtectedRoute";

export default function SignInPage() {
  return (
    <ProtectedRoutes>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
        <Card className="w-full max-w-md p-6 mx-4 shadow-2xl bg-white bg-opacity-90 backdrop-blur-md">
          <CardHeader className="text-center">
            <Image
              src="/t-shirt-logo.svg"
              alt="T-Shirt Logo"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            <CardTitle className="text-3xl font-bold text-gray-800">
              Welcome back to Crakens
            </CardTitle>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </CardHeader>
          <SignInForm />
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up here
              </a>
            </p>
          </div>
        </Card>
      </div>
    </ProtectedRoutes>
  );
}
