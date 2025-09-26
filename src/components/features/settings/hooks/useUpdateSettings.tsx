import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/common/notification/Toast";
import { api } from "@/lib/api/fetcher";
import { apiRoutes, pageRoutes } from "@/constants/routes";
import type {
  UpdateUserData,
  UpdateUserPasswordData,
  ForgotPasswordData,
  UserProfileData,
} from "@/types/user";

type UpdateSettingsPayload =
  | { kind: "user"; data: UpdateUserData; id: number }
  | { kind: "profile"; data: UserProfileData; id: number }
  | { kind: "delete-profile"; id: number }
  | { kind: "password-reset"; data: ForgotPasswordData }
  | { kind: "password"; data: UpdateUserPasswordData };

export default function useUpdateSettings() {
  const router = useRouter();

  const useProfileSettings = (id: number) => {
    return useQuery({
      queryKey: ["profiles", id],
      queryFn: () => api.get(apiRoutes.profile(id)),
    });
  };

  const useUserSettings = (id: number) => {
    return useQuery({
      queryKey: ["users", id],
      queryFn: () => api.get(apiRoutes.getUser(id)),
    });
  };

  interface PresignedUrlResult {
    uploadUrl: string;
    key: string;
    fileUrl: string;
  }

  async function uploadToS3(file: File, folder: string) {
    const newFileName = file.name.split(".")[0];
    const { uploadUrl, fileUrl } = (await api.get(
      apiRoutes.aws(folder, newFileName, file.type)
    )) as PresignedUrlResult;

    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadRes.ok) {
      throw new Error("Failed to upload file to S3");
    }

    return fileUrl;
  }

  const mutation = useMutation({
    mutationFn: async (payload: UpdateSettingsPayload) => {
      if (payload.kind === "user") {
        return api.put(apiRoutes.updateUser, payload.data);
      } else if (payload.kind === "profile") {
        if (payload.data.avatarFile) {
          const fileUrl = await uploadToS3(payload.data.avatarFile, "profile");
          payload.data.avatar = fileUrl;
        }
        payload.data.avatarFile = undefined;
        return api.patch(apiRoutes.profile(payload.id), payload.data);
      } else if (payload.kind === "password-reset") {
        return api.post(apiRoutes.forgotPassword, payload.data);
      } else if (payload.kind === "delete-profile") {
        return api.delete(apiRoutes.profile(payload.id));
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
    useProfileSettings,
    useUserSettings,
    updateSettings: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
