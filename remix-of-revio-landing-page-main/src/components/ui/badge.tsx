import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";

const badgeVariants = cva(
  "inline-flex items-center gap-2",
  {
    variants: {
      variant: {
        default: "text-primary",
        secondary: "text-muted",
        color: "text-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props}>
    <BadgeCheck className={cn("w-4 h-4", variant === "secondary" ? " fill-transparent stroke-muted" : variant === "color" ? "fill-revio-light-orchid stroke-black" : "fill-transparent stroke-primary")} />
    {children}
  </div>;
}

export { Badge, badgeVariants };
