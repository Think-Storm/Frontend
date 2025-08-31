"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { profileSchema } from "@/schemas/userSchema";
import { UpdateUserProfileData } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import SettingsForm from "@/components/features/settings/components/SettingsForm";
import SettingsTagInputFormField, {
  SettingsFormField,
  SettingsImgFormField,
} from "@/components/features/settings/components/SettingsFormField";
import useUpdateSettings from "@/components/features/settings/hooks/useUpdateSettings";
import { Spinner } from "@/components/ui/spinner";
import { Form } from "@/components/ui/form";

export default function Settings() {
  const { updateSettings, isPending } = useUpdateSettings();
  const form = useForm<UpdateUserProfileData>({
    defaultValues: {
      avatar: "",
      fullname: "",
      technicalLabels: [],
      domainLabels: [],
      website: "",
    },
    resolver: zodResolver(profileSchema),
  });

  function onSubmit(FormValues: UpdateUserProfileData) {
    updateSettings(FormValues);
  }
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 mt-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl xl:text-5xl font-bold">Settings</h1>
        <div className="flex space-x-3">
          <Button
            variant="gradient"
            size="gradient"
            textClassName="text-sm sm:text-base"
            className="hidden sm:block"
            type="submit"
            aria-busy={isPending}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Spinner size="small" />
                <span aria-hidden="true">Saving Changes...</span>
              </>
            ) : (
              " Save Changes"
            )}
          </Button>
          <Button
            variant="gradient"
            size="gradient"
            textBgWhite
            textClassName="!text-black !bg-white"
          >
            Delete Account
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-gray-200 rounded-lg px-2 py-2 my-8 max-w-sm">
          <Button variant="white" className="text-base">
            Personal Info
          </Button>
          <Button variant="transparent" className="text-base">
            Account Settings
          </Button>
        </div>
      </div>
      <div>
        <SettingsForm>
          <SettingsForm.Header title="Edit Profile"></SettingsForm.Header>
          <SettingsForm.Content>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex"
              >
                <div>
                  <Image
                    src="/images/setting/setting-profile.svg"
                    alt=""
                    width={150}
                    height={150}
                    className="object-contain"
                    priority
                    aria-hidden="true"
                  />
                  <SettingsImgFormField
                    control={form.control}
                    name="avatar"
                    type="file"
                    aria-required="true"
                  />
                </div>
                <div className="flex-1 space-y-2 ml-10 flex-col">
                  <SettingsFormField
                    control={form.control}
                    name="fullname"
                    label="Name"
                    type="text"
                    aria-required="true"
                  />
                  <SettingsTagInputFormField
                    initialTags={["great", "abc"]}
                    control={form.control}
                    name="technicalLabels"
                    label="Skills"
                    type="text"
                    aria-required="true"
                  />
                </div>
              </form>
            </Form>
          </SettingsForm.Content>
        </SettingsForm>
      </div>
    </div>
  );
}
