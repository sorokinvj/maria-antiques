interface Props {
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  type?: 'primary' | 'secondary'
  className?: string
}

export const Button: React.FC<Props> = ({
  children,
  type = 'primary',
  onClick,
  disabled,
  className = ''
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
      {children}
    </button>
  )
}
