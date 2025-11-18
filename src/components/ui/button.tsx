import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-sky-600 text-white shadow hover:bg-sky-700 active:bg-sky-800",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800",
        outline:
          "border-2 border-sky-600 bg-white text-sky-700 shadow-sm hover:bg-sky-50 hover:border-sky-700 active:bg-sky-100",
        secondary:
          "bg-gray-200 text-gray-900 shadow-sm hover:bg-gray-300 active:bg-gray-400",
        ghost: "hover:bg-sky-100 hover:text-sky-900 text-gray-700",
        link: "text-sky-600 underline-offset-4 hover:underline hover:text-sky-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
