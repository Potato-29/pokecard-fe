import React, { ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
  className?: string;
  onClick: () => void;
  children: ReactNode;
  variant?: "success" | "danger" | "warning" | "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  variant,
  children,
}) => {
  const variantClass = variant ? `btn-${variant}` : "";

  return (
    <button
      className={`btn-primary rounded-md p-2 border ${className} ${variantClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
