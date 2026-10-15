import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Variant = "solid" | "light" | "blush" | "outline" | "outline-light" | "text";

const base =
  "group inline-flex min-h-[3.25rem] items-center whitespace-nowrap justify-center gap-3 px-8 text-[0.75rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-45";

export const buttonVariants: Record<Variant, string> = {
  solid: "bg-burgundy text-canvas hover:bg-burgundy-deep",
  light: "bg-canvas text-burgundy hover:bg-blush",
  blush: "bg-blush text-burgundy hover:bg-petal",
  outline: "border border-burgundy text-burgundy hover:bg-burgundy hover:text-canvas",
  "outline-light": "border border-canvas text-canvas hover:bg-canvas hover:text-burgundy",
  text: "min-h-0 justify-start px-0 text-burgundy",
};

export function buttonClass(variant: Variant = "solid", className?: string) {
  return cn(base, buttonVariants[variant], className);
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  external?: boolean;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "children" | "className">;

/** Rectangular call to action, rendered as a link. */
export function ButtonLink({ href, variant = "solid", external, arrow = false, children, className, ...rest }: ButtonLinkProps) {
  const content = (
    <>
      <span className={variant === "text" ? "link-line" : undefined}>{children}</span>
      {arrow && <Arrow />}
    </>
  );
  const classes = buttonClass(variant, className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

type ButtonProps = { variant?: Variant; arrow?: boolean } & ComponentProps<"button">;

/** Rectangular call to action, rendered as a button. */
export function Button({ variant = "solid", arrow, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClass(variant, className)} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}

export function Arrow({ direction = "right" }: { direction?: "right" | "left" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block transition-transform duration-500 ease-editorial",
        direction === "right" ? "group-hover:translate-x-1" : "group-hover:-translate-x-1",
      )}
    >
      {direction === "right" ? "→" : "←"}
    </span>
  );
}
