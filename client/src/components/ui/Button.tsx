import Link from "next/link";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = PropsWithChildren<{
  as?: "button" | "a" | "link";
  href?: string;
  variant?: Variant;
  className?: string;
}> & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses: Record<Variant, string> = {
  primary:
    "btn-primary",
  secondary:
    "btn-secondary",
  ghost:
    "btn-ghost",
};

export function Button({ as = "button", href, variant = "primary", className = "", children, ...rest }: ButtonProps) {
  const cls = `${variantClasses[variant]} ${className}`.trim();
  if (as === "link" && href) return <Link href={href} className={cls}>{children}</Link>;
  if (as === "a" && href) return <a href={href} className={cls}>{children}</a>;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
} 