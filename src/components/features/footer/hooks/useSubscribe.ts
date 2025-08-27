"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/common/notification/Toast";
import { api } from "@/lib/api/fetcher";
import { ROUTES } from "@/constants/routes";

export default function useSubscribe() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: { email: string }) =>
      api.post(ROUTES.PAGE.PUBLIC.SUBSCRIBE, data),
    onSuccess: () => {
      showSuccessToast({
        message: "Subscription Successful",
        description: "You will be redirected to the home page.",
      });
      router.push(ROUTES.PAGE.PUBLIC.HOME);
    },
    onError: (error: Error) => {
      console.log("Subscription error:", error);
      showErrorToast({
        message: "Subscription Failed",
        description:
          "An error occurred while requesting subscription. Please try again.",
      });
    },
  });

  return {
    subscribe: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
