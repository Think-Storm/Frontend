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
