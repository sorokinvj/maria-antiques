function ChevronUpSmall(props: any) {
  return (
    // @ts-expect-error TS(2304): Cannot find name 'svg'.
    <svg
      // @ts-expect-error TS(2304): Cannot find name 'xmlns'.
      xmlns="http://www.w3.org/2000/svg"
      // @ts-expect-error TS(2304): Cannot find name 'viewBox'.
      viewBox="0 0 20 20"
      // @ts-expect-error TS(2304): Cannot find name 'fill'.
      fill="currentColor"
      {...props}
    >
      // @ts-expect-error TS(2304): Cannot find name 'path'.
      <path
        // @ts-expect-error TS(2304): Cannot find name 'fillRule'.
        fillRule="evenodd"
        // @ts-expect-error TS(2304): Cannot find name 'd'.
        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
        // @ts-expect-error TS(2304): Cannot find name 'clipRule'.
        clipRule="evenodd"
      />
    </svg>
  )
}

export default ChevronUpSmall
