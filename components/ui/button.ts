function Button({
  children,
  ...props
}: any) {
  return (
    // @ts-expect-error TS(2304): Cannot find name 'button'.
    <button
      // @ts-expect-error TS(2304): Cannot find name 'className'.
      className="bg-indigo-600 hover:bg-gray-700 px-4 py-3 rounded-lg text-white text-sm font-bold tracking-widest uppercase focus:outline-none"
      {...props}
    // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
    >
      {children}
    </button>
  )
}

export default Button
