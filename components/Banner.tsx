import React from 'react'
import { motion } from 'framer-motion'

const target = {
  opacity: 1,
  transition: { duration: 1 },
  transitionEnd: { display: 'none' },
}

function Banner() {
  return (
    <div className=" overflow-clip border-b border-black bg-yellow-400">
      <div className="mx-auto h-[20rem] max-w-7xl bg-yellow-400 ">
        <div className="flex items-center justify-between py-10 ">
          <div className="space-y-5 px-10">
            <h1 className="max-w-xl font-serif text-6xl">
              <span className=" decoration-black decoration-4">
                Stay curious.
              </span>{' '}
            </h1>
            <h2 className="text-lg">
              Discover stories, thinking and expertise from writers on any
              topic.
            </h2>
            <div>
              <span>
                <button className="w-[213px] items-center rounded-full border border-black bg-black pb-[9px] pt-[6px] text-[20px] text-white">
                  Start reading
                </button>
              </span>
            </div>
          </div>
          <div className="hidden overflow-hidden whitespace-nowrap md:flex">
            <div className="text-xl font-semibold">
              <motion.div></motion.div>
            </div>
          </div>
          {/* <img
            className="hidden h-32 md:inline-flex lg:h-full"
            src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          ></img> */}
        </div>
      </div>
    </div>
  )
}

export default Banner
