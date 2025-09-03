import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/common/notification/Toast";
import { api } from "@/lib/api/fetcher";
import { apiRoutes, pageRoutes } from "@/constants/routes";
import type {
  UpdateUserProfileData,
  UpdateUserData,
  UpdateUserPasswordData,
  UpdateUserEmailData,
} from "@/types/user";

type UpdateSettingsPayload =
  | { kind: "user"; data: UpdateUserData }
  | { kind: "profile"; data: UpdateUserProfileData; id: string }
  | { kind: "email"; data: UpdateUserEmailData }
  | { kind: "password"; data: UpdateUserPasswordData };

export default function useUpdateSettings() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (payload: UpdateSettingsPayload) => {
      if (payload.kind === "user") {
        return api.put(apiRoutes.updateUser, payload.data);
      } else if (payload.kind === "profile") {
        return api.put(apiRoutes.updateProfile(payload.id), payload.data);
      } else if (payload.kind === "email") {
        return api.put(apiRoutes.updateUser, payload.data);
      } else {
        return api.put(apiRoutes.updatePassword, payload.data);
      }
    },
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
        message: error.message || "Updating your settings Failed",
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
