"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import AuthForm from "@/components/common/form/AuthForm";
import AuthFormField from "@/components/common/form/AuthFormField";
import { Button } from "@/components/ui/button";
import { signupSchema } from "@/schemas/authSchemas";
import useSignUp from "@/hooks/auth/useSignUp";
import { SignUpData } from "@/types/user";
import { Spinner } from "@/components/ui/spinner";

export default function SignUpPage() {
  const { signUp, isPending } = useSignUp();
  const form = useForm<SignUpData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signupSchema),
  });

  function onSubmit(FormValues: SignUpData) {
    signUp(FormValues);
  }

  return (
    <AuthForm>
      <AuthForm.Header
        title="Create Account"
        description="Welcome! Please enter your details"
      />
      <AuthForm.Content>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <AuthFormField
              control={form.control}
              name="username"
              label="Username*"
              type="text"
              aria-required="true"
              autoComplete="username"
            />
            <AuthFormField
              control={form.control}
              name="email"
              label="Email*"
              type="email"
              aria-required="true"
              autoComplete="email"
            />
            <AuthFormField
              control={form.control}
              name="password"
              label="Password*"
              type="password"
              aria-required="true"
              autoComplete="new-password"
              description={[
                `Contains uppercase, lowercase, number and special character`,
                `Must be between 8 and 16 characters long`,
                `Cannot contain spaces`,
              ]}
            />
            <div className="flex flex-col gap-4 mt-7">
              <Button
                type="submit"
                aria-busy={isPending}
                disabled={isPending}
                className="w-full h-11 text-base font-light bg-black hover:bg-black/90"
              >
                {isPending ? (
                  <>
                    <Spinner size="small" />
                    <span aria-hidden="true">Creating account...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <div
                className="relative"
                role="separator"
                aria-label="or continue with"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 text-base font-light border-gray-200"
                disabled={isPending}
                onClick={() => {
                  /* TODO: Implement Google OAuth */
                }}
              >
                <Image
                  src="/images/icon-google.svg"
                  alt=""
                  aria-hidden="true"
                  className="mr-2 filter grayscale"
                  width={20}
                  height={20}
                />
                Sign Up with Google
              </Button>
            </div>
            <p className="text-center text-sm text-gray-500 pt-7">
              Already have an account?&nbsp;
              <Link href="/signin" className="font-medium text-black underline">
                Sign In
              </Link>
            </p>
          </form>
        </Form>
      </AuthForm.Content>
    </AuthForm>
  );
}
