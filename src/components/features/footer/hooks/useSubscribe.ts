'use client'


import { useMutation } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "@/components/common/notification/Toast";
import { api } from "@/lib/api/fetcher";
import { apiRoutes } from "@/constants/routes";
import type { SubscriptionData } from "@/types/user";

export default function useSubscribe() {
    const mutation = useMutation({
        mutationFn: (data: SubscriptionData) => api.post(apiRoutes.subscribe, data),
        onSuccess: () => {
            showSuccessToast({
                message: "Subscription Successful",
                description: "You will be redirected to the home page.",
            });
        },
        onError: (error: Error) => {
            console.log("Subscription error:", error);
            showErrorToast({
                message: "Subscription Failed",
                description: "An error occurred while requesting subscription. Please try again.",
            });
        },
    });


  return {
    subscribe: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
