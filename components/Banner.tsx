import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { signIn, signOut, useSession } from 'next-auth/react'

const target = {
  opacity: 1,
  transition: { duration: 1 },
  transitionEnd: { display: 'none' },
}

function Banner() {
  const { data: session } = useSession()

  return (
    <div className=" overflow-clip border-b border-black bg-yellow-400">
      <div className="mx-auto h-[20rem] max-w-7xl">
        <div className="flex items-center justify-between py-10 ">
          <div className="space-y-5 px-10">
            <h1 className="max-w-xl font-serif text-6xl">
              <span className="decoration-black decoration-4">
                Stay curious.
              </span>{' '}
            </h1>
            <h2 className="text-lg">
              Discover stories, thinking and expertise from writers on any
              topic.
            </h2>
            <div>
              <span>
                <button
              className={`${
                session
                  ? 'hidden'
                  : 'w-[213px] items-center rounded-full border border-black bg-black pb-[9px] pt-[6px] text-[20px] text-white'
              }`}
              onClick={!session ? () => signIn() : () => signOut()}
            >
              <p>{session ? `${session.user?.name}` : 'Start Reading'}</p>
            </button>
              </span>
            </div>
          </div>
          {/* <div className="hidden overflow-hidden whitespace-nowrap md:flex">
            <div className="text-xl font-semibold">
              <motion.div></motion.div>
            </div>
          </div> */}
          <img
            className="hidden h-[270px] object-contain md:inline-flex lg:"
            src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          ></img>
        </div>
      </div>
    </div>
  )
}

export default Banner
