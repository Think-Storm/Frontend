import { useState } from "react";
import Image from "next/image";
import { Control, Path, FieldValues } from "react-hook-form";
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

type SettingsFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  type?: "text" | "url" | "file";
  description?: string[];
  placeholder?: string;
  autoComplete?: string;
};

export function SettingsFormField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  description,
  placeholder,
  autoComplete,
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

export function SettingsImgFormField<T extends FieldValues>({
  control,
  name,
  type = "file",
}: SettingsFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input className="h-11 hidden" type={type} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

type TagInputProps<T extends FieldValues> = SettingsFormFieldProps<T> & {
  label: string;
  initialTags?: string[];
};

export default function SettingsTagInputFormField<T extends FieldValues>({
  control,
  name,
  type,
  label,
  initialTags = [],
}: TagInputProps<T>) {
  const [tags, setTags] = useState(initialTags);
  const [input, setInput] = useState("");

  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
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
              <div className="flex flex-wrap items-center gap-2 rounded-md border border-input bg-background shadow-xs px-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex justify-center items-center bg-[#eeeeee] pl-3 rounded-sm my-2 text-lg font-medium leading-tight space-x-2"
                  >
                    <span className="mb-1 mr-0">{tag}</span>
                    <Button
                      variant="transparent"
                      size="sm"
                      onClick={() => removeTag(tag)}
                      className="text-gray-500 hover:text-red-500 "
                    >
                      <Image
                        src="/images/setting/setting-delete-button.svg"
                        alt=""
                        width={9}
                        height={9}
                        className="object-contain"
                        priority
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="transparent"
                  onClick={addTag}
                  className="pl-3 py-1 text-md bg-white text-black hover:bg-gray-200 transition-all duration-150 ease-in-out rounded-sm px-4"
                >
                  Add &nbsp;
                  <Image
                    src="/images/setting/setting-plus-button.svg"
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
