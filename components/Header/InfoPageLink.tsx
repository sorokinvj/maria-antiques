import Link from 'next/link'
import { StaticPage } from 'types'

export const InfoPageLink: React.FC<StaticPage> = (props) => (
  <li className="block my-4 md:inline-block md:my-0">
    <Link href={`/pages/${props.slug}`}>
      <a className="text-lightgray hover:text-slategray hover:bg-gainsboro rounded-full py-2 px-3 font-semibold">
        {props.title}
      </a>
    </Link>
  </li>
)
