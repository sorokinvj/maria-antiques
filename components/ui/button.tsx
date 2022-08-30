import { SpinnerIcon } from '../icons'

interface Props {
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  isLoading?: boolean
}

const Button: React.FC<Props> = ({ isLoading, children, ...props }) => {
  return (
    <button
      className="min-w-[130px] h-12 flex flex-row justify-center items-center bg-indigo-600 text-center hover:bg-gray-700 px-4 py-3 rounded-lg text-white text-sm font-bold tracking-widest uppercase focus:outline-none"
      {...props}
    >
      {isLoading ? <SpinnerIcon /> : children}
    </button>
  )
}

export default Button
