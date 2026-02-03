import type { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
};

export default function Input({ label, ...props }: InputProps) {
  return (
    <p>
      <label htmlFor={props.id}>{label}</label>
      <input {...props} />
    </p>
  );
}
