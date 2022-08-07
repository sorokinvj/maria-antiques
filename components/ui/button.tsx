import React from "react";

interface Props {
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button
      className="bg-indigo-600 hover:bg-gray-700 px-4 py-3 rounded-lg text-white text-sm font-bold tracking-widest uppercase focus:outline-none"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
