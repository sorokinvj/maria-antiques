interface Props {
  error: unknown
}

export const ErrorComponent: React.FC<Props> = ({ error }) => {
  const parseError = (error: unknown) => {
    if (error instanceof Error) {
      return error?.message
    } else if (typeof error === 'string') {
      return error
    } else {
      return JSON.stringify(error)
    }
  }

  if (!error) return null
  return <p className="text-red-500">{parseError(error)}</p>
}
