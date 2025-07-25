import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/common";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "shadow-xs border border-black rounded-full hover:bg-black hover:text-white transition-colors dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 hover:shadow-lg transition-all",
        ghost:
          "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white transition-colors",
        transparent: "",
        link: "text-primary underline-offset-4 hover:underline",
        white:
          "bg-white text-black hover:bg-gray-300 hover:shadow-md hover:scale-105 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-[3px] dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
        pink: "bg-[#FF007A] text-white rounded-full shadow-lg hover:bg-[#e6006e] transition",
        gradient:
          "relative inline-flex items-center justify-center p-[2px] rounded-[10px] transition-all duration-300 ease-out hover:animate-glowScale transform",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        gradient: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  textClassName,
  textBgWhite = false,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    textClassName?: string;
    textBgWhite?: boolean;
  }) {
  const classNames = cn(buttonVariants({ variant, size, className }));
  const Comp = asChild ? Slot : "button";
  let content;

  if (variant === "gradient") {
    content = (
      <>
        <div className="absolute inset-0 rounded-[10px] bg-[linear-gradient(90deg,_#F81A1A_-9.19%,_#0500E7_112.66%)]" />
        <span
          className={cn(
            "relative z-10 flex items-center justify-center gap-2",
            "px-5 py-3",
            "text-white text-[16px] font-normal leading-[24px]",
            "rounded-[8px]",
            !textBgWhite &&
              "bg-[radial-gradient(56.62%_137.93%_at_80%_-50%,_#777777_0%,_#0F1111_100%)] bg-black",
            textClassName
          )}
        >
          {children}
        </span>
      </>
    );
  }

  return (
    <Comp data-slot="button" className={classNames} {...props}>
      {content ?? children}
    </Comp>
  );
}

export { Button, buttonVariants };
