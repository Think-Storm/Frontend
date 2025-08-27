"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import AuthForm from "@/components/features/auth/components/AuthForm";
import AuthFormField from "@/components/features/auth/components/AuthFormField";
import { loginSchema } from "@/schemas/authSchemas";
import useSignIn from "@/components/features/auth/hooks/useSignIn";
import { LoginUser } from "@think-storm/contracts";

export default function SignInPage() {
  const { signIn, isPending } = useSignIn();
  const form = useForm<LoginUser>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(FormValues: LoginUser) {
    signIn(FormValues);
  }

  return (
    <AuthForm>
      <AuthForm.Header
        title="Sign In"
        description="Welcome back! Please enter your details"
      />
      <AuthForm.Content>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <AuthFormField
              control={form.control}
              name="email"
              label="Email*"
              type="email"
              aria-required="true"
              autoComplete="email"
            />
            <div className="relative">
              <AuthFormField
                control={form.control}
                name="password"
                label="Password*"
                type="password"
                aria-required="true"
                autoComplete="current-password"
              />
              <div className="absolute -top-1 right-0 text-[13px] text-gray-600">
                <Link href="/reset-password" className="underline">
                  Forgot your password?
                </Link>
              </div>
            </div>
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
                    <span aria-hidden="true">Signing in...</span>
                  </>
                ) : (
                  "Sign In"
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
                className="w-full h-11 text-base font-light border-gray-200 hover:bg-transparent hover:text-black"
                disabled={isPending}
                onClick={() => {
                  /* TODO: Implement Google OAuth */
                }}
              >
                <Image
                  src="/icons/auth/google-icon.svg"
                  alt=""
                  aria-hidden="true"
                  className="mr-2 filter grayscale"
                  width={20}
                  height={20}
                />
                Sign In with Google
              </Button>
            </div>
            <p className="text-center text-sm text-gray-500 pt-7">
              Don&apos;t have an account?&nbsp;
              <Link href="/signup" className="font-medium text-black underline">
                Sign Up
              </Link>
            </p>
          </form>
        </Form>
      </AuthForm.Content>
    </AuthForm>
  );
}
