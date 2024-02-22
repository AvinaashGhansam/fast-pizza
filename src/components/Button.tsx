import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  isDisabled?: boolean;
  to?: string;
}
const Button: React.FC<ButtonProps> = ({ children, isDisabled, to }) => {
  const className =
    "inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800" +
    " transition-colors duration-300 hover:bg-yellow-300" +
    " focus:outline-none focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 md:py-4";
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button disabled={isDisabled} className={className}>
      {children}
    </button>
  );
};
export default Button;
