import { parseErrorMessage } from '@/utils/parseErrorMessage'

interface Props {
  error: unknown
}

export const ErrorComponent: React.FC<Props> = ({ error }) => {
  if (!error) return null
  return <p className="text-red-500">{parseErrorMessage(error)}</p>
}
