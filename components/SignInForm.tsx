"use client";

import { useForm } from "react-hook-form";
import { signIn, getSession } from "next-auth/react"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useRouter } from "next/navigation";
import { CardContent } from "@/components/ui/card";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loadingState, userState } from "@/stores/atoms/userStateAtom";
import { SafeUser } from "@/lib/types/schemaTypes";

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
  const setUser = useSetRecoilState(userState);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      setUser({ email: data.email } as SafeUser);

      const updatedSession = await getSession();

      if (updatedSession?.user?.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } else {
      console.error("Error signing in");
    }

    setLoading(false);
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
        <Button type="submit" className="w-full">
          {loading ? "...Loading" : "Sign in"}
        </Button>
        <Button
          variant="secondary"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => signIn("google")}
        >
          <Icons.google />
          Sign in with Google
        </Button>
      </form>
    </CardContent>
  );
};

export default SignInForm;
