"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { profileSchema, userInfoSchema } from "@/schemas/userSchema";
import { UserProfileData, UpdateUserData } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import SettingsForm from "@/components/features/settings/components/SettingsForm";
import SettingsTagInputFormField, {
    SettingsEmailModalField,
    SettingsFormField,
    SettingsImgFormField,
    SettingsLinkInputFormField,
    SettingsPasswordModalField,
} from "@/components/features/settings/components/SettingsFormField";
import useUpdateSettings from "@/components/features/settings/hooks/useUpdateSettings";
import { Spinner } from "@/components/ui/spinner";
import { Form, FormLabel } from "@/components/ui/form";
import { DomainLabel, TechnicalLabel } from "@think-storm/contracts/dist/types/common/types/data.types";

export default function Settings() {
    const [menu, setMenu] = useState("personal");
    const [preview, setPreview] = useState<string | null>(null);
    const { updateSettings, isPending, useProfileSettings, useUserSettings } = useUpdateSettings();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const userprofileForm = useForm<UserProfileData>({
        defaultValues: {
            avatar: "",
            bio: "",
            fullName: "",
            birthdate: "",
            preferredRole: [],
            location: "",
            languages: [],
            technicalLabels: [],
            domainLabels: [],
            website: [],
            timezone: "",
        },
        resolver: zodResolver(profileSchema),
    });

    const [location, timezone] = userprofileForm.watch(["location", "timezone"]);

    const usersettingForm = useForm<UpdateUserData>({
        defaultValues: {
            id: 1,
            username: "",
            email: "",
        },
        resolver: zodResolver(userInfoSchema),
    });

    function switchMenu(menu: string) {
        setMenu(menu);
    }

    function onSubmitUserProfile(ProfileFormValues: UserProfileData) {
        updateSettings({ kind: "profile", data: ProfileFormValues, id: 1 });
    }

    function onSubmitUserSetting(UsersettingFormValues: UpdateUserData) {
        updateSettings({ kind: "user", data: UsersettingFormValues, id: 1 });
    }

    function onSubmitDeleteAccount() {
        updateSettings({ kind: "delete-profile", id: 1 });
    }

    const profileData = (useProfileSettings(1) as { data?: { data: UserProfileData } })?.data?.data;
    const { data: userData } = useUserSettings(1) as { data: UpdateUserData };

    const handleSaveAll = async () => {
        const profileValues = userprofileForm.getValues();
        const userValues = usersettingForm.getValues();

        await Promise.all([
            updateSettings({ kind: "profile", data: profileValues, id: 1 }),
            updateSettings({ kind: "user", data: userValues, id: 1 }),
        ]);
    };

    useEffect(() => {
        if (!profileData || !userData) return;

        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

        if (profileData.avatar) setPreview(profileData.avatar);

        const updatedProfileValues: UserProfileData = {
            ...userprofileForm.getValues(),
            fullName: profileData.fullName,
            birthdate: profileData.birthdate,
            avatar: profileData.avatar,
            bio: profileData.bio,
            preferredRole: profileData.preferredRole || [],
            languages: profileData.languages || [],
            technicalLabels: profileData.technicalLabels || [],
            domainLabels: profileData.domainLabels || [],
            website: profileData.website || [],
            timezone: tz,
        };

        const updatedUserValues: UpdateUserData = {
            id: 1,
            username: userData.username,
            email: userData.email,
        };

        const setFormValues = (extraLocation?: string) => {
            userprofileForm.reset({
                ...updatedProfileValues,
                location: extraLocation || profileData.location || "",
            });
            usersettingForm.reset(updatedUserValues);
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    try {
                        const response = await fetch(
                            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.NEXT_PUBLIC_GEO_API_KEY}`
                        );
                        const data = await response.json();
                        const components = data.results?.[0]?.components || {};
                        const location = [components.city, components.state, components.country]
                            .filter(Boolean)
                            .join(", ");

                        setFormValues(location);
                    } catch (err) {
                        console.error(err);
                        setFormValues();
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setFormValues();
                }
            );
        } else {
            setFormValues();
        }
    }, [profileData, userData]);

    return (
        <div className="max-w-6xl mx-auto px-6 py-8 mt-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl xl:text-5xl font-bold">Settings</h1>
                <div className="flex space-x-3">
                    <Button
                        variant="gradient"
                        size="gradient"
                        textClassName="text-sm sm:text-base"
                        className="hidden sm:block sm:flex"
                        type="submit"
                        aria-busy={isPending}
                        disabled={isPending}
                        onClick={handleSaveAll}
                    >
                        {isPending ? (
                            <>
                                <Spinner size="small" color="white" />
                                <span aria-hidden="true">Saving Changes...</span>
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                    <Button
                        variant="gradient"
                        size="gradient"
                        textBgWhite
                        textClassName="!text-black !bg-white"
                        aria-busy={isPending}
                        disabled={isPending}
                        onClick={onSubmitDeleteAccount}
                    >
                        {isPending ? (
                            <>
                                <Spinner size="small" color="white" />
                                <span aria-hidden="true">Deleting Account...</span>
                            </>
                        ) : (
                            "Delete Account"
                        )}
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex bg-gray-200 rounded-lg px-2 py-2 my-8 max-w-sm gap-3">
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
                                            <img
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
                                            suggestions={Object.values(TechnicalLabel)}
                                            control={userprofileForm.control}
                                            name="technicalLabels"
                                            label="Skills"
                                            title="Skills"
                                            type="text"
                                            aria-required="true"
                                            setValue={userprofileForm.setValue}
                                        />
                                        <SettingsTagInputFormField
                                            suggestions={Object.values(DomainLabel)}
                                            control={userprofileForm.control}
                                            name="domainLabels"
                                            label="Interests"
                                            title="Interests"
                                            type="text"
                                            aria-required="true"
                                            setValue={userprofileForm.setValue}
                                        />
                                        <SettingsLinkInputFormField
                                            control={userprofileForm.control}
                                            name="website"
                                            label="External Links"
                                            title="Add Link"
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
                                        <FormLabel className="font-bold text-lg">Location</FormLabel>
                                        <div className="flex items-center justify-between gap-2 rounded-md border border-input bg-background shadow-xs px-2 pt-2 pb-1 h-11">
                                            {location || "Detecting..."}
                                        </div>
                                        <div className="-mt-1 min-h-6"></div>
                                        <FormLabel className="font-bold text-lg">Timezone</FormLabel>
                                        <div className="flex items-center justify-between gap-2 rounded-md border border-input bg-background shadow-xs px-2 pt-2 pb-1 h-11">
                                            {timezone || "Detecting..."}
                                        </div>
                                        <div className="-mt-1 min-h-6"></div>
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
