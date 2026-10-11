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
  label,
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
      <label className="label m-1" htmlFor={name}>
        {label}
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

export function FormErrors({ errors }: { errors?: string }) {
  return (
    <>
      {errors && <span className="label text-red-500">{String(errors)}</span>}
    </>
  );
}

export function FormSelect({
  register,
  name,
  label,
  className,
  placeholder,
  options,
  ...props
}: {
  register: any;
  label?: string;
  name: string;
  className?: string;
  placeholder?: string;
  props?: any;
  options?: { value: string; label: string }[];
}) {
  return (
    <>
      <label className="label m-1" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name)}
        name={name}
        className={cn("select w-full glass-morphism", className)}
        placeholder={placeholder}
        {...props}
      >
        <option className="glass" disabled defaultChecked>
          {placeholder || "Select {name}"}
        </option>
        {options?.map((option) => (
          <option className="glass" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
type TextAreaProps = {
  register: any;
  name: string;
  className?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  label?: string;
  props?: any;
};
export function FormTextArea({
  register,
  name,
  label,
  className,
  placeholder,
  rows,
  maxLength,
  props,
}: TextAreaProps) {
  return (
    <>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <textarea
        {...register(name)}
        name={name}
        className={cn("textarea", className)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        {...props}
      />
    </>
  );
}
