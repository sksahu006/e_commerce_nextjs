// app/signup/page.tsx
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "@/components/SignUpForm";
import ProtectedClientRoute from "@/components/ProtectedRoute";

export default function SignUpPage() {
  return (
    <ProtectedClientRoute>
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
              Welcome to Crakens
            </CardTitle>
            <p className="mt-2 text-gray-600">
              Sign up to explore our latest collections!
            </p>
          </CardHeader>
          <SignUpForm />
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already signed up?{" "}
              <a
                href="/signin"
                className="font-medium text-blue-600 hover:underline"
              >
                Log in to your account
              </a>
            </p>
          </div>
        </Card>
      </div>
    </ProtectedClientRoute>
  );
}