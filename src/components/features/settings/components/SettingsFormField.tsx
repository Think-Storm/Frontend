/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import {
  Control,
  Path,
  FieldValues,
  useFormContext,
  useForm,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Modal, { ModalHandle } from "@/components/ui/Modal";
import {
  ForgotPasswordData,
  UpdateUserEmailData,
  UpdateUserPasswordData,
} from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailInfoSchema, passwordInfoSchema } from "@/schemas/userSchema";
import useUpdateSettings from "../hooks/useUpdateSettings";

type SettingsFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  title?: string;
  type?: "text" | "url" | "file" | "email" | "password";
  description?: string[];
  placeholder?: string;
  autoComplete?: string;
  setValue?: (name: Path<T>, value: any) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPreview?: Dispatch<SetStateAction<string | null>>;
  ref?: React.RefObject<HTMLInputElement>;
};

export function SettingsFormField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  description,
  placeholder,
  autoComplete,
  ...props
}: SettingsFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-bold text-lg">{label}</FormLabel>
          <FormControl>
            <Input
              className="h-11"
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                props.onChange?.(e);
              }}
            />
          </FormControl>
          <div className="-mt-1 min-h-6">
            <FormMessage className="text-red-600 text-[12px]" />
          </div>
          {description && (
            <div className="space-y-1 ml-2 -mt-1 text-neutral-500">
              {description.map((item, index) => (
                <FormDescription key={index} className="flex gap-2">
                  <span className="flex-shrink-0">✓</span>
                  <span className="flex-1">{item}</span>
                </FormDescription>
              ))}
            </div>
          )}
        </FormItem>
      )}
    />
  );
}

export const SettingsImgFormField = <T extends FieldValues>({
  control,
  name,
  type = "file",
  ref,
  ...props
}: SettingsFormFieldProps<T>) => {
  useEffect(() => {
    const fileInput = (ref as React.RefObject<HTMLInputElement>)?.current;
    if (!fileInput) return;

    const handler = () => {
      if (fileInput.files && fileInput.files[0]) {
        props.setPreview?.(URL.createObjectURL(fileInput.files[0]));
      }
    };

    fileInput.addEventListener("change", handler);

    return () => {
      fileInput.removeEventListener("change", handler);
    };
  }, [props, ref]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative w-24 h-24 cursor-pointer">
              <Input
                type={type}
                {...field}
                ref={ref}
                className="absolute w-0 h-0 opacity-0"
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

type TagInputProps<T extends FieldValues> = SettingsFormFieldProps<T> & {
  label: string;
  initialTags?: string[];
  suggestions?: string[];
  setValue: (name: Path<T>, value: any) => void;
};

export default function SettingsTagInputFormField<T extends FieldValues>({
  control,
  name,
  type,
  label,
  title,
  initialTags = [],
  suggestions = [],
  setValue,
}: TagInputProps<T>) {
  const [tags, setTags] = useState(initialTags);
  const [temporaryTags, setTemporaryTags] = useState(initialTags);
  const [input, setInput] = useState("");
  const modalRef = useRef<ModalHandle>(null);

  const saveChanges = () => {
    setValue(name, tags);
    setTags(temporaryTags);
    modalRef.current?.close();
  };

  const startAddTag = () => {
    modalRef.current?.open();
  };

  const closeModal = () => {
    setTemporaryTags([...tags]);
    modalRef.current?.close();
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTemporaryTags([...temporaryTags, tag.trim()]);
      setInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    setTemporaryTags(temporaryTags.filter((t) => t !== tag));
  };

  const removeTemporaryTag = (tag: string) => {
    setTemporaryTags(temporaryTags.filter((t) => t !== tag));
  };

  const filteredSuggestions = suggestions?.filter(
    (s) =>
      s.toLowerCase().includes(input.toLowerCase()) &&
      !temporaryTags.includes(s)
  );

  const showTags = (
    tags: string[],
    kind: string,
    onRemove: (tag: string) => void
  ) => {
    return tags?.map((tag, index) => (
      <div
        key={`${kind}-${tag}-${index}`}
        className="flex justify-center items-center bg-[#eeeeee] pl-3 rounded-sm mb-1 text-lg font-medium leading-tight space-x-2"
      >
        <span className="mb-1 mr-0">{tag}</span>
        <Button
          variant="transparent"
          size="sm"
          onClick={() => onRemove(tag)}
          className="text-gray-500"
          type="button"
        >
          <Image
            src="/icons/setting/setting-delete-button.svg"
            alt=""
            width={9}
            height={9}
            className="object-contain"
            priority
            aria-hidden="true"
          />
        </Button>
      </div>
    ));
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="mb-4">
              <FormLabel className="font-bold text-lg mb-2">{label}</FormLabel>
              <div className="flex flex-wrap items-center gap-2 rounded-md border border-input bg-background shadow-xs px-2 pt-2 pb-1">
                {showTags(tags, "tags", removeTag)}
                <Modal ref={modalRef}>
                  <>
                    <div className="font-bold text-2xl my-3">{title}</div>
                    <FormLabel className="font-bold text-lg text-left w-[95%]">
                      Search {label}
                    </FormLabel>
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="h-11 w-[95%]"
                      placeholder="Search your skills..."
                      autoComplete="off"
                    />
                    <div className="flex flex-wrap justify-start items-center gap-2 rounded-md bg-background px-2 w-[95%]">
                      {showTags(
                        temporaryTags,
                        "temporaryTags",
                        removeTemporaryTag
                      )}
                      {filteredSuggestions &&
                        filteredSuggestions.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2 rounded-md mb-2 w-full">
                            <h1 className="font-bold text-lg w-full">
                              Suggestions
                            </h1>
                            <div className="flex flex-wrap justify-start items-center gap-2 rounded-md bg-background px-2 w-full max-h-30 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-600">
                              {filteredSuggestions?.map((s) => (
                                <div
                                  key={s}
                                  className="flex justify-center items-center bg-[#eeeeee] px-2 py-1 rounded-sm text-lg font-medium leading-tight space-x-2 cursor-pointer"
                                  onClick={() => addTag(s)}
                                >
                                  <span className="mb-1 mr-0">{s}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="gradient"
                        size="gradient"
                        textClassName="text-sm sm:text-base"
                        onClick={saveChanges}
                        type="button"
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="gradient"
                        size="gradient"
                        textBgWhite
                        textClassName="!text-black !bg-white"
                        onClick={closeModal}
                        type="button"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                </Modal>
                <Button
                  variant="transparent"
                  onClick={startAddTag}
                  className="pl-3 pt-1 pb-2 text-md bg-white text-black hover:bg-gray-200 transition-all duration-150 ease-in-out rounded-sm px-4"
                  type="button"
                >
                  Add &nbsp;
                  <Image
                    src="/icons/setting/setting-plus-button.svg"
                    alt=""
                    width={13}
                    height={13}
                    className="object-contain ml-[-10px]"
                    priority
                    aria-hidden="true"
                  />
                </Button>
              </div>
              <Input className="h-11 hidden" type={type} {...field} />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

interface LinkInputProps<T extends FieldValues> {
  control: any;
  name: string;
  label: string;
  title: string;
  initialLinks?: { type: string; url: string }[];
  linkTypes?: string[];
  setValue: any;
}

export function SettingsLinkInputFormField<T extends FieldValues>({
  control,
  name,
  label,
  title,
  initialLinks = [],
  linkTypes = ["LinkedIn", "GitHub", "Website"],
  setValue,
}: LinkInputProps<T>) {
  const [links, setLinks] = useState(initialLinks);
  const [temporaryLinks, setTemporaryLinks] = useState(initialLinks);
  const [type, setType] = useState(linkTypes[0]);
  const [url, setUrl] = useState("");
  const modalRef = useRef<ModalHandle>(null);

  const startAddLink = () => modalRef.current?.open();
  const closeModal = () => {
    setTemporaryLinks([...links]);
    modalRef.current?.close();
  };

  const addLink = () => {
    if (url.trim()) {
      setTemporaryLinks([...temporaryLinks, { type, url: url.trim() }]);
      setUrl("");
    }
  };

  const removeLink = (linkToRemove: { type: string; url: string }) => {
    setLinks(links.filter((l) => l.url !== linkToRemove.url));
    setTemporaryLinks(temporaryLinks.filter((l) => l.url !== linkToRemove.url));
  };

  const removeTemporaryLink = (linkToRemoveUrl: string) => {
    console.log(linkToRemoveUrl);
    setTemporaryLinks(temporaryLinks.filter((l) => l.url !== linkToRemoveUrl));
  };

  const saveChanges = () => {
    setLinks(temporaryLinks);
    setValue(name, temporaryLinks);
    modalRef.current?.close();
  };

  const showLinks = (
    links: { type: string; url: string }[],
    url: string,
    onRemove: (link: string) => void
  ) => {
    return links?.map((link, index) => (
      <div
        key={`${url}-${link}-${index}`}
        className="flex justify-center items-center bg-[#eeeeee] pl-3 rounded-sm mb-1 text-lg font-medium leading-tight space-x-2"
      >
        <span className="mb-1 mr-0">{link.url}</span>
        <Button
          variant="transparent"
          size="sm"
          onClick={() => onRemove(link.url)}
          className="text-gray-500"
          type="button"
        >
          <Image
            src="/icons/setting/setting-delete-button.svg"
            alt=""
            width={9}
            height={9}
            className="object-contain"
            priority
            aria-hidden="true"
          />
        </Button>
      </div>
    ));
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="mb-4">
              <FormLabel className="font-bold text-lg mb-2">{label}</FormLabel>
              <div className="flex flex-wrap items-center gap-2 rounded-md border border-input bg-background shadow-xs px-2 pt-2 pb-1">
                {links.map((link, idx) => (
                  <div
                    key={`link-${idx}`}
                    className="flex justify-center items-center bg-[#eeeeee] pl-3 rounded-sm mb-1 text-lg font-medium leading-tight space-x-2"
                  >
                    <span className="mb-1 mr-0">{link.url}</span>
                    <Button
                      variant="transparent"
                      size="sm"
                      onClick={() => removeLink(link)}
                      type="button"
                    >
                      <Image
                        src="/icons/setting/setting-delete-button.svg"
                        alt="Delete"
                        width={9}
                        height={9}
                      />
                    </Button>
                  </div>
                ))}

                <Button
                  variant="transparent"
                  onClick={startAddLink}
                  className="pl-3 pt-1 pb-2 text-md bg-white text-black hover:bg-gray-200 transition-all duration-150 ease-in-out rounded-sm px-4"
                  type="button"
                >
                  Add &nbsp;
                  <Image
                    src="/icons/setting/setting-plus-button.svg"
                    alt=""
                    width={13}
                    height={13}
                    className="object-contain ml-[-10px]"
                    priority
                    aria-hidden="true"
                  />
                </Button>
              </div>

              <Modal ref={modalRef}>
                <>
                  <div className="font-bold text-2xl my-3">{title}</div>
                  <FormLabel className="font-bold text-lg text-left w-[95%]">
                    Select Type
                  </FormLabel>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mb-2 h-11 border rounded px-2 w-[95%] max-w-[95%]"
                  >
                    {linkTypes.map((lt) => (
                      <option key={lt} value={lt}>
                        {lt}
                      </option>
                    ))}
                  </select>

                  <FormLabel className="font-bold text-lg text-left w-[95%]">
                    Link
                  </FormLabel>
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL..."
                    className="mb-2 h-11 border rounded px-2 w-[95%]"
                  />
                  <div className="w-[98%] flex flex-wrap justify-left items-left gap-2 rounded-md bg-background px-2 pt-2 pb-1">
                    {showLinks(temporaryLinks, url, removeTemporaryLink)}
                  </div>
                  <div className="flex justify-end w-[95%]">
                    <Button
                      variant="transparent"
                      onClick={addLink}
                      className="pl-3 pt-1 pb-2 text-md bg-gray-200 text-black hover:bg-gray-400 transition-all duration-150 ease-in-out rounded-sm px-4"
                      type="button"
                    >
                      Add &nbsp;
                      <Image
                        src="/icons/setting/setting-plus-button.svg"
                        alt=""
                        width={13}
                        height={13}
                        className="object-contain ml-[-10px]"
                        priority
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="gradient"
                      size="gradient"
                      textClassName="text-sm sm:text-base"
                      onClick={saveChanges}
                      type="button"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="gradient"
                      size="gradient"
                      textBgWhite
                      textClassName="!text-black !bg-white"
                      onClick={closeModal}
                      type="button"
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              </Modal>

              <Input className="h-11 hidden" type="text" {...field} />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export function SettingsEmailModalField<T extends FieldValues>({
  control,
  name,
  label,
  title,
  type,
  setValue,
}: SettingsFormFieldProps<T>) {
  const modalRef = useRef<ModalHandle>(null);
  const { getValues, trigger } = useFormContext<T>();
  const [originalValue, setOriginalValue] = useState(getValues(name) ?? "");
  const [input, setInput] = useState(originalValue);
  const { updateSettings, isPending } = useUpdateSettings();

  function onSubmitCheckEmail(EmailFormValues: UpdateUserEmailData) {
    updateSettings({ kind: "email", data: EmailFormValues });
  }

  const useEmailForm = useForm<UpdateUserEmailData>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(emailInfoSchema),
  });

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInput(newValue);
    await trigger(name);
  };

  const saveChanges = async () => {
    const isValid = await trigger(name);
    if (!isValid) {
      setInput(originalValue);
      return;
    }

    setValue?.(name, input);
    setOriginalValue(input);
    modalRef.current?.close();
  };

  const openModal = () => {
    modalRef.current?.open();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <>
      <Modal ref={modalRef}>
        <>
          <div className="font-bold text-2xl my-3">{title}</div>
          <SettingsFormField
            control={useEmailForm.control}
            name="email"
            label={label}
            type={type}
            aria-required="true"
            placeholder={originalValue ?? "Enter New Email..."}
            autoComplete="off"
            onChange={handleInputChange}
          />
          <div className="flex flex-wrap justify-start items-center gap-2 rounded-md bg-background px-2 w-[95%]"></div>
          <div className="flex gap-3">
            <Button
              variant="gradient"
              size="gradient"
              textClassName="text-sm sm:text-base"
              onClick={saveChanges}
              type="button"
            >
              Save Changes
            </Button>
            <Button
              variant="gradient"
              size="gradient"
              textBgWhite
              textClassName="!text-black !bg-white"
              onClick={closeModal}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </>
      </Modal>
      <div className="grid gap-2 w-full">
        <FormLabel className="font-bold text-lg">{label}</FormLabel>
        <div
          onClick={openModal}
          className="flex items-center justify-between gap-2 rounded-md border border-input bg-background shadow-xs px-2 pt-2 pb-1 cursor-pointer h-11"
        >
          <span>{originalValue}</span>
          <Image
            src="/icons/setting/setting-right-arrow-button.svg"
            alt=""
            width={30}
            height={30}
            className="object-contain"
            priority
            aria-hidden="true"
          />
        </div>
        <div className="-mt-1 min-h-6"></div>
      </div>
    </>
  );
}

export function SettingsPasswordModalField({
  label,
  title,
  type,
  originalValue,
}: {
  label: string;
  title: string;
  type: "password";
  originalValue: string;
}) {
  const modalRef = useRef<ModalHandle>(null);
  const passwordModalRef = useRef<ModalHandle>(null);
  const { updateSettings, isPending } = useUpdateSettings();

  function onSubmitUpdatePassword(PasswordFormValues: UpdateUserPasswordData) {
    updateSettings({ kind: "password", data: PasswordFormValues });
  }

  function onSubmitForgotPassword(PasswordResetFormValues: ForgotPasswordData) {
    updateSettings({ kind: "password-reset", data: PasswordResetFormValues });
  }

  const userPasswordForm = useForm<UpdateUserPasswordData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(passwordInfoSchema),
  });

  const forgotPasswordForm = useForm<ForgotPasswordData>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(emailInfoSchema),
  });

  const saveChanges = async () => {
    const isValid = await userPasswordForm.trigger();
    if (!isValid) return;
    const values = userPasswordForm.getValues();
    onSubmitUpdatePassword(values);
    modalRef.current?.close();
  };

  const openModal = () => {
    modalRef.current?.open();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const checkPassword = async () => {
    const isValid = await forgotPasswordForm.trigger();
    if (!isValid) return;
    const values = forgotPasswordForm.getValues();
    onSubmitForgotPassword(values);
    // modalRef.current?.close();
  };

  const openForgotPasswordModal = () => {
    closeModal();
    passwordModalRef.current?.open();
  };

  const closeForgotPasswordModal = () => {
    passwordModalRef.current?.close();
  };

  return (
    <>
      <Modal ref={modalRef}>
        <>
          <div className="font-bold text-2xl my-3">{title}</div>
          <>
            <SettingsFormField
              control={userPasswordForm.control}
              name="currentPassword"
              label="Current Password"
              type={type}
              aria-required="true"
              autoComplete="off"
            />
            <SettingsFormField
              control={userPasswordForm.control}
              name="newPassword"
              label="New Password"
              type={type}
              aria-required="true"
              autoComplete="off"
            />
            <SettingsFormField
              control={userPasswordForm.control}
              name="confirmPassword"
              label="Retype Password"
              type={type}
              aria-required="true"
              autoComplete="off"
            />
            <div className="flex justify-start w-full">
              <Button
                variant="transparent"
                type="button"
                className="mt-[-20px] text-xl text-blue-700 font-bold text-left p-0"
                onClick={openForgotPasswordModal}
              >
                Forgot Password?
              </Button>
            </div>
          </>
          <div className="flex flex-wrap justify-start items-center gap-2 rounded-md bg-background px-2 w-[95%]"></div>
          <div className="flex gap-3">
            <Button
              variant="gradient"
              size="gradient"
              textClassName="text-sm sm:text-base"
              onClick={saveChanges}
              type="button"
            >
              Save Changes
            </Button>
            <Button
              variant="gradient"
              size="gradient"
              textBgWhite
              textClassName="!text-black !bg-white"
              onClick={closeModal}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </>
      </Modal>
      <Modal ref={passwordModalRef}>
        <>
          <div className="font-bold text-2xl my-3">Forgot Password?</div>
          <>
            <SettingsFormField
              control={forgotPasswordForm.control}
              name="email"
              label="Email"
              type="email"
              aria-required="true"
              autoComplete="off"
            />
          </>
          <div className="flex flex-wrap justify-start items-center gap-2 rounded-md bg-background px-2 w-[95%]"></div>
          <div className="flex gap-3">
            <Button
              variant="gradient"
              size="gradient"
              textClassName="text-sm sm:text-base"
              onClick={checkPassword}
              type="button"
            >
              Send Password Reset
            </Button>
            <Button
              variant="gradient"
              size="gradient"
              textBgWhite
              textClassName="!text-black !bg-white"
              onClick={closeForgotPasswordModal}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </>
      </Modal>
      <div className="grid gap-2 w-full">
        <FormLabel className="font-bold text-lg">{label}</FormLabel>
        <div
          onClick={openModal}
          className="flex items-center justify-between gap-2 rounded-md border border-input bg-background shadow-xs px-2 pt-2 pb-1 cursor-pointer h-11"
        >
          <span>{originalValue}</span>
          <Image
            src="/icons/setting/setting-right-arrow-button.svg"
            alt=""
            width={30}
            height={30}
            className="object-contain"
            priority
            aria-hidden="true"
          />
        </div>
        <div className="-mt-1 min-h-6"></div>
      </div>
    </>
  );
}
