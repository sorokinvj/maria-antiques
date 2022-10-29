import Link from 'next/link'
import { Page } from 'types'

export const NavigationLink: React.FC<Page> = (props) => (
  <li className="block my-4 md:inline-block md:my-0">
    <Link href={`/${props.type.toLowerCase()}/${props.slug}`}>
      <a className="text-lightgray hover:text-slategray hover:bg-gainsboro rounded-full py-2 px-3 font-semibold">
        {props.name}
      </a>
    </Link>
  </li>
)
