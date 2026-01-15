import type { ReactNode } from "react";
import Link from "next/link";

type PrimaryButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function PrimaryButton({
  href,
  children,
  variant = "primary"
}: PrimaryButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600",
    secondary:
      "border border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900 focus-visible:outline-slate-400"
  };

  return (
    <Link className={`${base} ${variants[variant]}`} href={href}>
      {children}
    </Link>
  );
}
