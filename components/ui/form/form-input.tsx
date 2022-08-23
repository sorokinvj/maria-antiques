import React from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  field: string;
  type?: string;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
}

export const Input = React.forwardRef((props: InputProps, ref: any) => {
  const {
    children,
    className,
    disabled = false,
    field,
    placeholder,
    type = "text",
  } = props;
  return (
    <fieldset className={className}>
      <input
        id={field}
        name={field}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className="appearance-none min-w-0 w-full bg-white border border-gray-300 py-2 px-4 text-base rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400"
        ref={ref}
      />
      {children}
    </fieldset>
  );
});
Input.displayName = "Input";

export const FormInput: React.FC<InputProps> = (props) => {
  const { errors, register } = useFormContext();

  return (
    <React.Fragment>
      <Input ref={register} {...props}>
        {errors?.[props.field] ? (
          <p className="mt-2 text-red-700 text-sm">
            {errors[props.field].message}
          </p>
        ) : null}
      </Input>
    </React.Fragment>
  );
};
