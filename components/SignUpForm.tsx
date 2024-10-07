"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { signUp } from "@/app/actions/signupAction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SignUpFormData, SignUpSchema } from "@/lib/types/validationTypes";
import { userState } from "@/stores/atoms/userStateAtom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

type ServerError = {
  [key: string]: string[] | string;
};

export default function SignUpForm() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const onSubmit = async (data: SignUpFormData) => {
    setGeneralError(null);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      const result = await signUp(formData);

      if ("error" in result) {
        const serverErrors = result.error as ServerError;
        if (typeof serverErrors === "string") {
          setGeneralError(serverErrors);
        } else {
          Object.entries(serverErrors).forEach(([key, value]) => {
            form.setError(key as keyof SignUpFormData, {
              type: "manual",
              message: Array.isArray(value) ? value[0] : value,
            });
          });
        }
      } else if (result.success && result.user) {
        setUser(result.user);
        router.push("/dashboard");
      }
    } catch (error) {
      setGeneralError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {generalError && (
              <Alert variant="destructive">
                <AlertDescription>{generalError}</AlertDescription>
              </Alert>
            )}

            {[
              "username",
              "email",
              "password",
              "firstName",
              "lastName",
              "phoneNumber",
            ].map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as keyof SignUpFormData}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={
                          fieldName === "password"
                            ? "password"
                            : fieldName === "email"
                            ? "email"
                            : "text"
                        }
                        placeholder={`Enter your ${fieldName
                          .replace(/([A-Z])/g, " $1")
                          .toLowerCase()}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
