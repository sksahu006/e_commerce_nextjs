"use client";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useRouter } from "next/navigation";
import { CardContent } from "@/components/ui/card";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loadingState, userState } from "@/stores/atoms/userStateAtom";
import { SafeUser  } from "@/lib/types/schemaTypes";
import { useEffect, useState } from "react";

type FormData = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const [loading, setLoading] = useRecoilState(loadingState);
  const setUser  = useSetRecoilState(userState);
  const { data: session, status } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      setUser (session.user  );
      if (session.user?.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [status, session, setUser , router]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErrorMessage(null); 
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (!res?.ok) {
        if (res?.error) {
          setErrorMessage(res.error);
        } else {
          setErrorMessage("Failed to sign in");
        }
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signIn("google");
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
        <Button
          variant="secondary"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <Icons.google />
          Sign in with Google
        </Button>
      </form>
    </CardContent>
  );
};

export default SignInForm;