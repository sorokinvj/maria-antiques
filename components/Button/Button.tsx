import { SpinnerIcon } from '../icons'

interface Props {
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  type?: 'primary' | 'secondary'
  className?: string
  isLoading?: boolean
}

export const Button: React.FC<Props> = ({
  children,
  type = 'primary',
  onClick,
  disabled,
  className = '',
  isLoading = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        type === 'primary'
          ? `btn-primary ${className}`
          : `btn-secondary ${className}`
      }
    >
      {isLoading ? <SpinnerIcon /> : children}
    </button>
  )
}
