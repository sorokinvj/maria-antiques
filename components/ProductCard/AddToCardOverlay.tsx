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
  if (isAdded) {
    return (
      <p className="absolute bottom-5 right-4 lg:top-4 lg:right-4 lg:bottom-auto px-4 py-2 bg-gray-50 text-gray-700 z-20 text-xs font-bold rounded-2xl opacity-50">
        IN THE CART
      </p>
    )
  }

  return (
    <div className="absolute w-full h-full flex flex-col items-end justify-end pb-5 pr-4 lg:p-0 lg:items-center lg:justify-center lg:invisible lg:group-hover:visible z-20">
      <Button
        onClick={onClick}
        disabled={isAdded}
        className="bg-indigo-500 lg:bg-indigo-700 py-2 px-3"
      >
        <ShoppingCartIcon className="w-10 h-10" />
      </Button>
    </div>
  )
}
