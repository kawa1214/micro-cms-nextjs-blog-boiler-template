import Link from 'next/link'
import { footerText } from '../../static/general'

const Footer = () => {
  return(
    <div className="h-12 bg-white px-2 md:px-14">
      <div className="h-12 flex items-stretch">        
        <div className="self-center text-sm	text-gray-500">
          <Link href="/">
            <a>{footerText}</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer