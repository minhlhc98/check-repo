import React, { HTMLAttributes } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { ICON_LIST } from "../common/constants";

export type IconSize = "xs" | "sm" | "base" | "md" | "lg";
export type IconName = typeof ICON_LIST[number]
interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  size?: IconSize;
  className?: string;
  iconName: IconName;
  onClick?: (e?: any) => void;
}

export const Icon = ({
  size = "base",
  iconName,
  className,
  onClick,
  ...props
}: IconProps) => {
  const iconSizes = {
    xs: "text-sm",
    sm: "text-base phone:text-sm",
    base: "text-lg phone:text-md",
    md: "text-md phone:text-base",
    lg: "text-xl phone:text-lg",
  };
  return (
    <span
      className={cn(
        "inline-block leading-none",
        iconSizes[size],
        `icon-app_${iconName}`,
        onClick && "hover:text-brand-primary cursor-pointer",
        className
      )}
      onClick={onClick}
      aria-hidden="true"
      {...props}
    />
  );
};
