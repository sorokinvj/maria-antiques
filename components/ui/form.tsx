// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'

// @ts-expect-error TS(2307): Cannot find module '@/components/icons' or its cor... Remove this comment to see the full error message
import { ChevronDownSmallIcon } from '@/components/icons'

function Form({
  children,
  methods,
  onSubmit,
  ...props
}: any) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <FormProvider {...methods}>
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <form onSubmit={onSubmit} {...props}>
        {children}
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </form>
    </FormProvider>
  )
}

const Input = React.forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      field,
      placeholder,
      type = 'text'
    }: any,
    ref: any
  ) => {
    return (
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <fieldset className={className}>
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
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
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </fieldset>
    )
  }
)

const Select = React.forwardRef(
  (
    {
      children,
      className,
      defaultValue = '',
      disabled,
      field,
      label,
      options,
      ...props
    }: any,
    ref: any
  ) => {
    return (
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <fieldset className={className}>
        {label ? (
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <label htmlFor={field} className="sr-only">
            {label}
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </label>
        ) : null}
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div className="relative">
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <select
            id={field}
            name={field}
            disabled={disabled}
            defaultValue={defaultValue}
            className="appearance-none block w-full bg-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ref={ref}
            {...props}
          >
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <option disabled value="">
              Please select an option
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </option>
            {options.map((option: any, index: any) => (
              // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
              <option key={index} value={option.value}>
                {option.label}
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </option>
            ))}
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </select>
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ChevronDownSmallIcon
              className="h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </div>
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
        {children}
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </fieldset>
    );
  }
)

const Textarea = React.forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      field,
      placeholder,
      rows = 4,
      type = 'text'
    }: any,
    ref: any
  ) => {
    return (
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <fieldset className={className}>
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <textarea
          id={field}
          name={field}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          className="appearance-none min-w-0 w-full bg-white border border-gray-300 py-2 px-4 text-base rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400"
          ref={ref}
        />
        {children}
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </fieldset>
    )
  }
)

function FormInput(props: any) {
  const { errors, register } = useFormContext()

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Fragment>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Input ref={register} {...props}>
        {errors?.[props.field] ? (
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <p className="mt-2 text-red-700 text-sm">
            {errors[props.field].message}
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </p>
        ) : null}
      </Input>
    </React.Fragment>
  )
}

function FormSelect(props: any) {
  const { errors, register } = useFormContext()

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Select ref={register} {...props}>
      {errors?.[props.field] ? (
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <p className="mt-2 text-red-700 text-sm">
          {errors[props.field].message}
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </p>
      ) : null}
    </Select>
  )
}

function FormTextarea(props: any) {
  const { errors, register } = useFormContext()

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Fragment>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Textarea ref={register} {...props}>
        {errors?.[props.field] ? (
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <p className="mt-2 text-red-700 text-sm">
            {errors[props.field].message}
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </p>
        ) : null}
      </Textarea>
    </React.Fragment>
  )
}

Form.Input = FormInput
Form.Select = FormSelect
Form.Textarea = FormTextarea

export default Form

export { Input, Select, Textarea }
