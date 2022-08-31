import { useState } from 'react'
import { Button } from '../Button/Button'
import { ShoppingCartIcon } from '../icons'

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  isAdded?: boolean
}
export const AddToCartOverlay: React.FC<Props> = ({
  onClick,
  isAdded = false
}) => {
  const [isButtonVisible, setButtonVisible] = useState(false)

  const showButton = () => {
    setButtonVisible(true)
  }

  const hideButton = () => {
    setButtonVisible(false)
  }

  if (isAdded) {
    return (
      <p className="absolute top-4 right-4 px-4 py-2 bg-gray-50 text-gray-700 z-20 text-xs font-bold rounded-2xl opacity-50">
        IN THE CART
      </p>
    )
  }

  return (
    <div
      onMouseEnter={showButton}
      onMouseLeave={hideButton}
      className="absolute w-full h-full flex flex-col items-center justify-center hover:bg-gray-300 hover:bg-opacity-70 z-20"
    >
      {isButtonVisible && (
        <Button onClick={onClick} disabled={isAdded} className="py-2 px-3">
          <ShoppingCartIcon className="w-10" />
        </Button>
      )}
    </div>
  )
}
