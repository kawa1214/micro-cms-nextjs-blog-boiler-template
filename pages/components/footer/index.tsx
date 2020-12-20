import Link from 'next/link'

export const Footer = () => {
  return(
    <div className="h-12 bg-white px-2 md:px-14">
      <div className="h-12 flex items-stretch">        
        <div className="self-center text-sm	text-gray-500">
          <Link href="/">
            <a>© 2020 kawa.dev</a>
          </Link>
        </div>
      </div>
    </div>
  )
}