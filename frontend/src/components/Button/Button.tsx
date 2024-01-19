import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = {
  type?: 'submit' | 'button' | 'reset';
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
}

export const Button = ({ type = 'button', children, disabled = false, className }: ButtonProps) => {
  return (
    <button type={type} disabled={disabled} className={twMerge("w-full py-3 mt-3 bg-black text-white rounded-md shadow-md transition duration-300 hover:bg-gray-900", className || '')}>
      {children}
    </button>
  )
}