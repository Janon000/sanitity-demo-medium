import Link from 'next/link'

function Header() {
  return (
    <header className=" bg-yellow-400 p-5 border-black border-b sticky top-0">
      <div className="mx-auto flex max-w-7xl justify-between">
        <div className="flex items-center space-x-5">
          <Link href="/">
            <img
              className="w-44 cursor-pointer object-contain"
              src="https://links.papareact.com/yvf"
              alt=""
            />
          </Link>
        </div>
        <div className="flex items-center space-x-5">
          <div className="hidden items-center space-x-5 md:inline-flex text-sm">
            <h3>Our Story</h3>
            <h3>Membership</h3>
            <h3>Write</h3>
            <h3>Sign</h3>
          </div>
          <h3 className="rounded-full border border-black bg-black text-white text-sm px-4 py-1">
            Get Started
          </h3>
        </div>
      </div>
    </header>
  )
}

export default Header
