import { Control, Path, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FooterFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  type?: "text" | "email" | "password";
  placeholder?: string;
  autoComplete?: string;
};

export default function FooterFormField<T extends FieldValues>({
  control,
  name,
  type = "email",
  placeholder,
  autoComplete,
}: FooterFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-[70%]">
          <FormControl>
            <Input
              className="h-11 w-full max-w-[800px]"
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              {...field}
            />
          </FormControl>
          <div className="-mt-1 min-h-6">
            <FormMessage className="text-red-600 text-[12px]" />
          </div>
        </FormItem>
      )}
    />
  );
}
