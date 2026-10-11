"use client";
import { cn } from "@/lib/utils";
import { FormEvent } from "react";

type Props = {
  onSubmit: (e: FormEvent) => void;
  children: React.ReactNode;
  className?: string;
};

function FormBody({ onSubmit, children, className }: Props) {
  return (
    <form onSubmit={onSubmit} className={cn("", className)}>
      {children}
    </form>
  );
}

export default FormBody;

export function FormFieldset({
  children,
  className,
  legend,
  legendClassname,
}: {
  children: React.ReactNode;
  className?: string;
  legend: string;
  legendClassname?: string;
}) {
  return (
    <fieldset className={cn("fieldset w-full", className)}>
      <legend className={cn("fieldset-legend capitalize", legendClassname)}>
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

export function FormInput({
  register,
  name,
  className,
  placeholder,
  type = "text",
  ...props
}: {
  register: any;
  name: string;
  className?: string;
  placeholder?: string;
  type?: string;
  label?: string;
  props?: any;
}) {
  return (
    <>
      <label className="label" htmlFor={name}>
        {name}
      </label>
      <input
        {...register(name)}
        name={name}
        type={type}
        className={cn("input w-full", className)}
        placeholder={placeholder}
        {...props}
      />
    </>
  );
}

export function FormErrors({ errors, name }: { errors: any; name: string }) {
  return (
    <>
      {errors[name] && (
        <span className="label text-red-500">
          {String(errors[name]?.message)}
        </span>
      )}
    </>
  );
}

export function FormSelect({
  register,
  name,
  className,
  placeholder,
  options,
  ...props
}: {
  register: any;
  name: string;
  className?: string;
  placeholder?: string;
  props?: any;
  options?: { value: string; label: string }[];
}) {
  return (
    <>
      <label className="label" htmlFor={name}>
        {name}
      </label>
      <select
        {...register(name)}
        name={name}
        className={cn("select w-full", className)}
        placeholder={placeholder}
        {...props}
      >
        {options?.map((option) => (
          <>
            <option disabled defaultChecked>
              {placeholder || "Select {name}"}
            </option>
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          </>
        ))}
      </select>
    </>
  );
}
