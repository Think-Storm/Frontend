"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { profileSchema, userInfoSchema } from "@/schemas/userSchema";
import { UpdateUserProfileData, UpdateUserData } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import SettingsForm from "@/components/features/settings/components/SettingsForm";
import SettingsTagInputFormField, {
  SettingsEmailModalField,
  SettingsFormField,
  SettingsImgFormField,
  SettingsPasswordModalField,
} from "@/components/features/settings/components/SettingsFormField";
import useUpdateSettings from "@/components/features/settings/hooks/useUpdateSettings";
import { Spinner } from "@/components/ui/spinner";
import { Form, FormLabel } from "@/components/ui/form";
import { DomainLabel, TechnicalLabel } from "@think-storm/contracts";

export default function Settings() {
  const [menu, setMenu] = useState("personal");
  const [preview, setPreview] = useState<string | null>(null);
  const { updateSettings, isPending } = useUpdateSettings();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const userprofileForm = useForm<UpdateUserProfileData>({
    defaultValues: {
      avatar: "",
      bio: "",
      fullName: "",
      birthdate: "",
      preferred_role: [],
      location: "",
      languages: [],
      technical_labels: [],
      domain_labels: [],
      website: [],
      timezone: "",
    },
    resolver: zodResolver(profileSchema),
  });

  const usersettingForm = useForm<UpdateUserData>({
    defaultValues: {
      username: "",
      email: "",
    },
    resolver: zodResolver(userInfoSchema),
  });

  function switchMenu(menu: string) {
    setMenu(menu);
  }

  function onSubmitUserProfile(ProfileFormValues: UpdateUserProfileData) {
    updateSettings({ kind: "profile", data: ProfileFormValues, id: "id" });
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
            className={`text-base ${
              menu === "personal"
                ? "hover:bg-white hover:shadow-none hover:scale-100 dark:hover:bg-white/10"
                : "hover:bg-white/20 hover:backdrop-blur-sm hover:scale-105 hover:shadow-md transition-all duration-300"
            }`}
            onClick={() => switchMenu("personal")}
          >
            Personal Info
          </Button>

          <Button
            variant={menu === "settings" ? "white" : "transparent"}
            className={`text-base ${
              menu === "settings"
                ? "hover:bg-white hover:shadow-none hover:scale-100 dark:hover:bg-white/10"
                : "hover:bg-white/20 hover:backdrop-blur-sm hover:scale-105 hover:shadow-md transition-all duration-300"
            }`}
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
                    {preview ? (
                      <Image
                        src={preview}
                        alt="preview"
                        width={150}
                        height={150}
                        className="object-cover rounded-full cursor-pointer border-2 border-gray-200"
                        onClick={() => fileInputRef.current?.click()}
                      />
                    ) : (
                      <Image
                        src="/images/setting/setting-profile.svg"
                        alt=""
                        width={150}
                        height={150}
                        className="object-contain cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                        priority
                        aria-hidden="true"
                      />
                    )}
                    <SettingsImgFormField
                      control={userprofileForm.control}
                      name="avatar"
                      type="file"
                      aria-required="true"
                      setPreview={setPreview}
                      ref={fileInputRef}
                    />
                  </div>
                  <div className="flex-1 space-y-2 ml-10 flex-col">
                    <SettingsFormField
                      control={userprofileForm.control}
                      name="fullName"
                      label="Name"
                      type="text"
                      aria-required="true"
                    />
                    <SettingsTagInputFormField
                      initialTags={["great", "abc"]}
                      suggestions={Object.values(TechnicalLabel)}
                      control={userprofileForm.control}
                      name="technical_labels"
                      label="Skills"
                      title="Skills"
                      type="text"
                      aria-required="true"
                      setValue={userprofileForm.setValue}
                    />
                    <SettingsTagInputFormField
                      initialTags={["great", "abc"]}
                      suggestions={Object.values(DomainLabel)}
                      control={userprofileForm.control}
                      name="domain_labels"
                      label="Interests"
                      title="Interests"
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
                      title="Add Link"
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
                    <SettingsEmailModalField
                      control={usersettingForm.control}
                      name="email"
                      label="Email"
                      type="email"
                      title="Change Email"
                      aria-required="true"
                      setValue={usersettingForm.setValue}
                    />
                    <SettingsPasswordModalField
                      label="Password"
                      type="password"
                      title="Change Password"
                      aria-required="true"
                      originalValue="originalPassword"
                    />
                  </div>
                  <div className="flex-1 space-y-2 ml-10 flex-col">
                    <FormLabel className="font-bold text-lg">
                      Location
                    </FormLabel>
                    <div className="flex flex-wrap items-center gap-2 rounded-md border border-input bg-background shadow-xs px-2 pt-2 pb-1"></div>
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
