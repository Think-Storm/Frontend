import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/common/notification/Toast";
import { api } from "@/lib/api/fetcher";
import { apiRoutes, pageRoutes } from "@/constants/routes";
import type { UpdateUserProfileData } from "@/types/user";

export default function useUpdateSettings() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: UpdateUserProfileData) =>
      api.put(apiRoutes.updateSettings, data),
    onSuccess: () => {
      showSuccessToast({
        message: "Updating your settings successful",
        description: "Your settings have been updated successfully.",
      });
      router.push(pageRoutes.settings);
    },
    onError: (error: Error) => {
      console.log("Updating settings error:", error);
      showErrorToast({
        message: "Updating your settings Failed",
        description:
          "An error occurred while updating your settings. Please try again.",
      });
    },
  });

  return {
    updateSettings: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
