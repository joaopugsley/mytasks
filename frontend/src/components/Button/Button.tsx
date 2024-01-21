import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = {
  type?: 'submit' | 'button' | 'reset';
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({ type = 'button', children, disabled = false, className, onClick }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={twMerge("w-full py-3 bg-black text-white rounded-md shadow-md transition duration-300 hover:bg-gray-900", className || '')}>
      {children}
    </button>
  )
}