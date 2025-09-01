"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { profileSchema, userInfoSchema } from "@/schemas/userSchema";
import { UpdateUserProfileData, UpdateUserData } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import SettingsForm from "@/components/features/settings/components/SettingsForm";
import SettingsTagInputFormField, {
  SettingsFormField,
  SettingsImgFormField,
} from "@/components/features/settings/components/SettingsFormField";
import useUpdateSettings from "@/components/features/settings/hooks/useUpdateSettings";
import { Spinner } from "@/components/ui/spinner";
import { Form } from "@/components/ui/form";
import { DomainLabel, TechnicalLabel } from "@think-storm/contracts";

export default function Settings() {
  const [menu, setMenu] = useState("personal");
  const { updateSettings, isPending } = useUpdateSettings();

  const userprofileForm = useForm<UpdateUserProfileData>({
    defaultValues: {
      avatar: "",
      fullname: "",
      technicalLabels: [],
      domainLabels: [],
      website: [],
    },
    resolver: zodResolver(profileSchema),
  });

  const usersettingForm = useForm<UpdateUserData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      country: "",
      timezone: "",
    },
    resolver: zodResolver(userInfoSchema),
  });

  function switchMenu(menu: string) {
    setMenu(menu);
  }

  function onSubmitUserProfile(ProfileFormValues: UpdateUserProfileData) {
    updateSettings({ kind: "profile", data: ProfileFormValues });
  }

  function onSubmitUserSetting(UsersettingFormValues: UpdateUserData) {
    updateSettings({ kind: "user", data: UsersettingFormValues });
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
          <Button
            variant={menu === "personal" ? "white" : "transparent"}
            className="text-base"
            onClick={() => switchMenu("personal")}
          >
            Personal Info
          </Button>
          <Button
            variant={menu === "settings" ? "white" : "transparent"}
            className="text-base"
            onClick={() => switchMenu("settings")}
          >
            Account Settings
          </Button>
        </div>
      </div>
      <div>
        {menu === "personal" ? (
          <SettingsForm>
            <SettingsForm.Header title="Edit Profile"></SettingsForm.Header>
            <SettingsForm.Content>
              <Form {...userprofileForm}>
                <form
                  onSubmit={userprofileForm.handleSubmit(onSubmitUserProfile)}
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
                      control={userprofileForm.control}
                      name="avatar"
                      type="file"
                      aria-required="true"
                    />
                  </div>
                  <div className="flex-1 space-y-2 ml-10 flex-col">
                    <SettingsFormField
                      control={userprofileForm.control}
                      name="fullname"
                      label="Name"
                      type="text"
                      aria-required="true"
                    />
                    <SettingsTagInputFormField
                      initialTags={["great", "abc"]}
                      suggestions={Object.values(TechnicalLabel)}
                      control={userprofileForm.control}
                      name="technicalLabels"
                      label="Skills"
                      type="text"
                      aria-required="true"
                      setValue={userprofileForm.setValue}
                    />
                    <SettingsTagInputFormField
                      initialTags={["great", "abc"]}
                      suggestions={Object.values(DomainLabel)}
                      control={userprofileForm.control}
                      name="domainLabels"
                      label="Interests"
                      type="text"
                      aria-required="true"
                      setValue={userprofileForm.setValue}
                    />
                    <SettingsTagInputFormField
                      initialTags={[
                        "http://www.google.com",
                        "http://fullname.com",
                      ]}
                      control={userprofileForm.control}
                      name="website"
                      label="External Links"
                      type="text"
                      aria-required="true"
                      setValue={userprofileForm.setValue}
                    />
                  </div>
                </form>
              </Form>
            </SettingsForm.Content>
          </SettingsForm>
        ) : (
          <SettingsForm>
            <SettingsForm.Header title="Account Settings"></SettingsForm.Header>
            <SettingsForm.Content>
              <Form {...usersettingForm}>
                <form
                  onSubmit={usersettingForm.handleSubmit(onSubmitUserSetting)}
                  className="w-full flex"
                >
                  <div className="flex-1 space-y-2 ml-10 flex-col">
                    <SettingsFormField
                      control={usersettingForm.control}
                      name="username"
                      label="Username"
                      type="text"
                      aria-required="true"
                    />
                    <SettingsFormField
                      control={usersettingForm.control}
                      name="email"
                      label="Email"
                      type="email"
                      aria-required="true"
                    />
                    <SettingsFormField
                      control={usersettingForm.control}
                      name="password"
                      label="Password"
                      type="password"
                      aria-required="true"
                    />
                  </div>
                  <div className="flex-1 space-y-2 ml-10 flex-col">
                   
                  </div>
                </form>
              </Form>
            </SettingsForm.Content>
          </SettingsForm>
        )}
      </div>
    </div>
  );
}
