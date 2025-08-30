import React, { InputHTMLAttributes } from "react";
import InputMask from "react-input-mask";

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  mask?: string;
  onlyNumbers?: boolean;
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Card({ className = "", ...props }: DivProps) {
  return (
    <div className={`bg-white border rounded-xl ${className}`} {...props} />
  );
}
export function CardHeader({ className = "", ...props }: DivProps) {
  return <div className={`px-4 py-3 border-b ${className}`} {...props} />;
}
export function CardTitle({ className = "", ...props }: DivProps) {
  return <div className={`font-semibold ${className}`} {...props} />;
}
export function CardContent({ className = "", ...props }: DivProps) {
  return <div className={`p-4 ${className}`} {...props} />;
}

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: BtnProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg transition active:scale-[.99]";
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2 text-base",
    icon: "p-2",
  } as const;
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-300 bg-white hover:bg-slate-50",
    ghost: "hover:bg-slate-100",
  } as const;
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function Input({
  className = "",
  mask,
  onlyNumbers,
  ...props
}: InputProps) {
  const baseClasses =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300";

  const cleanValue = (value: string) => value.replace(/\D/g, "");

  if (mask) {
    return (
      <InputMask
        mask={mask}
        {...props}
        onChange={(e) => {
          const rawValue = onlyNumbers
            ? cleanValue(e.target.value)
            : e.target.value;
          props.onChange?.({
            ...e,
            target: {
              ...e.target,
              value: rawValue,
              name: props.name || "",
            },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
      >
        {(inputProps: any) => (
          <input {...inputProps} className={`${baseClasses} ${className}`} />
        )}
      </InputMask>
    );
  }

  // 🔹 fallback: input normal
  return <input className={`${baseClasses} ${className}`} {...props} />;
}

export function Label({
  className = "",
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`text-sm text-slate-600 ${className}`} {...props} />;
}

export function Badge({ className = "", ...props }: DivProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${className}`}
      {...props}
    />
  );
}

export function Table({
  className = "",
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return <table className={`w-full text-sm ${className}`} {...props} />;
}
export function TableHeader(
  props: React.HTMLAttributes<HTMLTableSectionElement>
) {
  return <thead {...props} />;
}
export function TableBody(
  props: React.HTMLAttributes<HTMLTableSectionElement>
) {
  return <tbody {...props} />;
}
export function TableRow(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="border-b last:border-0" {...props} />;
}
export function TableHead({
  className = "",
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`text-left p-3 font-medium text-slate-600 bg-slate-50 ${className}`}
      {...props}
    />
  );
}
export function TableCell({
  className = "",
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={`p-3 ${className}`} {...props} />;
}

export function Select({
  className = "",
  children,
  ...props
}: SelectProps & { children?: React.ReactNode }) {
  return (
    <select
      className={`w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
