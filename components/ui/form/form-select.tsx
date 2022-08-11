import { ChevronDownSmallIcon } from "@/components/icons";
import React from "react";
import { useFormContext } from "react-hook-form";

interface OptionItem {
  value: string;
  label: string;
}
interface SelectProps {
  field: string;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
  defaultValue?: string;
  label?: string;
  options: OptionItem[];
  onChange?: (value: string) => void;
}

export const Select = React.forwardRef((props: SelectProps, ref: any) => {
  const {
    children,
    className,
    defaultValue = "",
    disabled,
    field,
    label,
    options,
  } = props;
  return (
    <fieldset className={className}>
      {label ? (
        <label htmlFor={field} className="sr-only">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          id={field}
          name={field}
          disabled={disabled}
          defaultValue={defaultValue}
          className="appearance-none block w-full bg-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ref={ref}
        >
          <option disabled value="">
            Please select an option
          </option>
          {options.map((option: OptionItem, index: any) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
          <ChevronDownSmallIcon
            className="h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
      {children}
    </fieldset>
  );
});
Select.displayName = "Select";

export const FormSelect: React.FC<SelectProps> = (props) => {
  const { errors, register } = useFormContext();

  return (
    <Select ref={register} {...props}>
      {errors?.[props.field] ? (
        <p className="mt-2 text-red-700 text-sm">
          {errors[props.field].message}
        </p>
      ) : null}
    </Select>
  );
};
