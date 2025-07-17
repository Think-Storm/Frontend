import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/common";
import clsx from "clsx";
import Link from "next/link";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
                destructive:
                    "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline:
                    "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 hover:shadow-lg transition-all",
                ghost: "",
                link: "text-primary underline-offset-4 hover:underline",
                white: "bg-white text-black hover:bg-gray-300 hover:shadow-md hover:scale-105 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-[3px] dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
                gradient:
                    "bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-11 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9",
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
    variant,
    size,
    asChild = false,
    href,
    linkClassName,
    target,
    children,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        href?: string;
        target?: string;
        linkClassName?: string;
    }) {
    const classNames = cn(buttonVariants({ variant, size, className }));

    const Comp = asChild ? Slot : "button";

    if (href) {
        return (
            <Comp className={classNames} {...props}>
                <Link target={target || "_blank"} href={href} className={clsx("flex items-center justify-content", linkClassName)}>{children}</Link>
            </Comp>
        );
    }

    return (
        <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props}>
            {children}
        </Comp>
    );
}

type BaseProps = {
    children: React.ReactNode;
    className?: string;
    textClassName?: string;
    href?: string;
    target?: string;
};

type ButtonProps = BaseProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined;
    };

type AnchorProps = BaseProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        href?: string;
        target? :string;
    };

type GradientButtonProps = ButtonProps | AnchorProps;

const GradientButton: React.FC<GradientButtonProps> = ({ children, className, textClassName, href, target, ...props }) => {
    const content = (
        <>
            <div className="absolute inset-0 rounded-[12px] bg-[conic-gradient(from_0deg,_#ec4899,_#a855f7,_#fb923c,_#ec4899)] hover:animate-[spinGradient_3s_linear_infinite]" />
            <span
                className={clsx(
                    "relative z-10 flex items-center justify-center gap-2",
                    "px-6 py-3",
                    "text-white text-[16px] font-normal font-['Open_Sans'] leading-[24px]",
                    "rounded-[10px]",
                    "bg-[radial-gradient(56.62%_137.93%_at_80%_-50%,_#777777_0%,_#0F1111_100%)] bg-black",
                    textClassName
                )}
            >
                {children}
            </span>
        </>
    );

    const baseClass = clsx(
        "relative inline-flex items-center justify-center",
        "p-[2px] rounded-[12px] bg-black",
        "transition-all duration-300 ease-out",
        "hover:animate-glowScale transform",
        className
    );

    if (href) {
        return (
            <Link target={target || "_blank"} href={href} className={baseClass} {...(props as AnchorProps)}>
                {content}
            </Link>
        );
    }

    return (
        <button className={baseClass} {...(props as ButtonProps)}>
            {content}
        </button>
    );
};

export { Button, buttonVariants, GradientButton };
