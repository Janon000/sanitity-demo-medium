import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

function Header() {
  const { data: session, status } = useSession()

  const popupCenter = (url:string, title:string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
    // console.log('test')
  };

  return (
    <header
      className={`${
        session ? 'bg-white' : 'bg-yellow-400'
      } sticky top-0 border-b border-black p-5`}
    >
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
          <div className="hidden items-center space-x-5 text-sm md:inline-flex">
            <h3>Our Story</h3>
            <h3>Membership</h3>
            <h3>Write</h3>
          </div>
          <div className="flex">
            <button
              className={`${
                session
                  ? 'hidden'
                  : 'rounded-full border border-black bg-black px-4 py-1 text-sm text-white'
              }`}
              onClick={!session ? () => popupCenter("/google-signin", "Sample Sign In") : () => signOut()}
            >
              <p>{session ? `${session.user?.name}` : 'Sign In'}</p>
            </button>
            <button onClick={!session ? () => popupCenter("/google-signin", "Sample Sign In") : () => signOut()}>
              <img
                src={session?.user?.image || ''}
                alt=""
                className={`${
                  session ? 'h-[32px] w-[32px] rounded-full object-contain' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
