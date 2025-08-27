import { toast } from "sonner";

type ToastOptions = {
  id?: string;
  message?: string;
  description?: string;
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};

export function showSuccessToast({
  id,
  message = "Success",
  description = "Your request has been completed successfully.",
  duration = 3000,
  position = "top-right",
}: ToastOptions = {}) {
  toast.success(message, {
    id,
    description,
    className: "bg-emerald-500 text-white border-0 shadow-lg",
    duration,
    position,
  });
}

export function showErrorToast({
  id,
  message = "Error",
  description = "Something went wrong. Please try again later.",
  duration = 3000,
  position = "top-right",
}: ToastOptions = {}) {
  toast.error(message, {
    id,
    description,
    className: "bg-rose-500 text-white border-0 shadow-lg",
    duration,
    position,
  });
}
