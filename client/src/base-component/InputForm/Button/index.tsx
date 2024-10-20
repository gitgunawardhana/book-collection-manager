import { twMerge } from "tailwind-merge";
import React from "react";

interface ButtonProps {
  id?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  id,
  type = "button",
  onClick,
  className,
  disabled = false,
  children,
}) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={twMerge([
        "flex items-center justify-between rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium leading-5 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
        className,
        disabled && "disabled opacity-50 hover:!bg-lime-green-100",
      ])}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
