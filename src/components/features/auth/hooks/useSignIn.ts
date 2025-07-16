import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/common/notification/Toast";
import { api } from "@/lib/api/fetcher";
import { apiRoutes, pageRoutes } from "@/constants/routes";
import type { SignInData } from "@/types/user";

export default function useSignIn() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: SignInData) => api.post(apiRoutes.signin, data),
    onSuccess: () => {
      showSuccessToast({
        message: "Sign-in Successful",
        description: "Welcome! You will be redirected to the dashboard page.",
      });
      router.push(pageRoutes.explore);
    },
    onError: (error: Error) => {
      console.log("Sign-in error:", error);
      showErrorToast({
        message: "Sign-in Failed",
        description: "An error occurred while signing in. Please try again.",
      });
    },
  });

  return {
    signIn: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
