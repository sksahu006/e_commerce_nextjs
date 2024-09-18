"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useSetRecoilState } from "recoil";
import { signUp } from "@/app/actions/signupAction";
import { userState } from "@/stores/atoms/userStateAtom";

const signUpSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  const onSubmit = async (data: SignUpFormData) => {
    const result = await signUp(data.username, data.email, data.password);
    if (result.error) {
      setServerError(result.error);
    } else if (result.success) {
      setUser(result.user);
      router.push("/signin");
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            {...register("username")}
            placeholder="Username"
            className="w-full"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="w-full"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </CardContent>
  );
}