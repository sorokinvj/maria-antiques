function Hygraph(props: any) {
  return (
    // @ts-expect-error TS(2304): Cannot find name 'svg'.
    <svg
      // @ts-expect-error TS(2304): Cannot find name 'xmlns'.
      xmlns="http://www.w3.org/2000/svg"
      // @ts-expect-error TS(2304): Cannot find name 'viewBox'.
      viewBox="0 0 26 44"
      // @ts-expect-error TS(2304): Cannot find name 'fill'.
      fill="currentColor"
      {...props}
    >
      // @ts-expect-error TS(2304): Cannot find name 'path'.
      <path
        // @ts-expect-error TS(2304): Cannot find name 'clipRule'.
        clipRule="evenodd"
        // @ts-expect-error TS(2304): Cannot find name 'd'.
        d="m20.7997 5.86658-5.1998 2.9335-5.1998 2.93312-5.20027 2.9335v5.8665 2.9336 2.933 2.9335 2.9335l5.20027-2.9335 5.1998-2.9335v-2.933-2.9336l-5.1998 2.9336v-5.8666l5.1998-2.9335 5.1998-2.9335v2.9335 2.9335 2.933 2.9336 2.933 2.9335l-5.1998 2.9335-5.1998 2.9331-5.20027 2.9335-5.19983 2.9331 5.19983 2.9335 5.20027-2.9335 5.1998-2.9331 5.1998-2.9335 5.2003-2.9331v-5.867-5.8666-5.8665-2.2501-3.61652-5.86658l-5.2003-2.9335z"
        // @ts-expect-error TS(2304): Cannot find name 'fillRule'.
        fillRule="evenodd"
      />
    </svg>
  )
}

export default Hygraph
