import React from 'react'
import { SpinnerIcon } from '../icons'

interface Props {
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode | string
  type?: 'primary' | 'secondary'
  className?: string
  isLoading?: boolean
}

export const Button: React.FC<Props> = ({
  children,
  type = 'primary',
  onClick,
  disabled,
  className,
  isLoading = false
}) => (
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
