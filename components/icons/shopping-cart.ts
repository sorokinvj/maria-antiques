function ShoppingCart(props: any) {
  return (
    // @ts-expect-error TS(2304): Cannot find name 'svg'.
    <svg
      // @ts-expect-error TS(2304): Cannot find name 'xmlns'.
      xmlns="http://www.w3.org/2000/svg"
      // @ts-expect-error TS(2304): Cannot find name 'viewBox'.
      viewBox="0 0 24 24"
      // @ts-expect-error TS(2304): Cannot find name 'fill'.
      fill="none"
      // @ts-expect-error TS(2304): Cannot find name 'stroke'.
      stroke="currentColor"
      {...props}
    >
      // @ts-expect-error TS(2304): Cannot find name 'path'.
      <path
        // @ts-expect-error TS(2304): Cannot find name 'strokeLinecap'.
        strokeLinecap="round"
        // @ts-expect-error TS(2304): Cannot find name 'strokeLinejoin'.
        strokeLinejoin="round"
        // @ts-expect-error TS(2304): Cannot find name 'strokeWidth'.
        strokeWidth="2"
        // @ts-expect-error TS(2304): Cannot find name 'd'.
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  )
}

export default ShoppingCart
