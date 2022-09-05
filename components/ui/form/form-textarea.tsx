import React from 'react'
import { useFormContext } from 'react-hook-form'

interface TextAreaProps {
  field: string
  placeholder?: string
  className?: string
  children?: React.ReactNode | React.ReactNode[]
  disabled?: boolean
  rows?: number
}

export const Textarea = React.forwardRef((props: TextAreaProps, ref: any) => {
  const {
    children,
    className,
    disabled = false,
    field,
    placeholder,
    rows = 4
  } = props

  return (
    <fieldset className={className}>
      <textarea
        id={field}
        name={field}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        className="appearance-none min-w-0 w-full bg-white border border-gray-300 py-2 px-4 text-base rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:placeholder-gray-400"
        ref={ref}
      />
      {children}
    </fieldset>
  )
})
Textarea.displayName = 'Textarea'

export const FormTextarea: React.FC<TextAreaProps> = (props) => {
  const { errors, register } = useFormContext()

  return (
    <React.Fragment>
      <Textarea ref={register} {...props}>
        {errors?.[props.field] ? (
          <p className="mt-2 text-red-700 text-sm">
            {errors[props.field].message}
          </p>
        ) : null}
      </Textarea>
    </React.Fragment>
  )
}
