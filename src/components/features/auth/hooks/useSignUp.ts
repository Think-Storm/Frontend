import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/common/notification/Toast";
import { api } from "@/lib/api/fetcher";
import { ROUTES } from "@/constants/routes";
import { RegisterUser, UserResponse } from "@think-storm/contracts";

export default function useSignUp() {
  const router = useRouter();

  const mutation = useMutation<UserResponse, Error, RegisterUser>({
    mutationFn: (data: RegisterUser) => api.post(ROUTES.API.AUTH.SIGNUP, data),
    onSuccess: () => {
      showSuccessToast({
        message: "Sign-up Successful",
        description: "You will be redirected to the sign-in page.",
      });

      router.push(ROUTES.PAGE.AUTH.SIGNIN);
    },
    onError: (error: Error) => {
      console.log("Sign-up error:", error);

      showErrorToast({
        message: "Sign-up Failed",
        description: "An error occurred while signing up. Please try again.",
      });
    },
  });

  return {
    signUp: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
