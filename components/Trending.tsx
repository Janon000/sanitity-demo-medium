import React from 'react'
import { Post } from '../typings'
import { sanityClient, urlFor } from '../sanity'

const posts = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6']

interface Props {
  trending: [Post]
}

function Trending({ trending }: Props) {
  return (
    <div className='border-b py-10 mx-10 '>
      <div className="mx-auto max-w-7xl">
        <div className="my-2 flex items-center">
          <div className="h-[20px] pr-3 ">
            <img
              className="h-full"
              src="https://cdn-icons-png.flaticon.com/512/1784/1784614.png "
              alt=""
              title=""
            />
          </div>
          <p className="text-xs font-bold">TRENDING ON MEDIUM</p>
        </div>
        <div className="flex flex-wrap">
          {trending.map((post, index) => {
            return (
              <div key={index} className="flex h-[100px] w-[376px]">
                <div className="relative top-[-10px] mr-[10px]">
                  <span className="font-sans text-[30px] font-bold text-gray-300 ">
                    <p>0{index + 1}</p>
                  </span>
                </div>
                <div>
                  <div className="mb-[8px] flex text-[13px] font-semibold">
                    <span className="pr-2">
                      <img
                        className="h-[20px] w-[20px] rounded-full"
                        src={urlFor(post.author.image).url()!}
                        alt=""
                      />
                    </span>
                    <p>{post.author.name}</p>
                  </div>
                  <p className="mb-[8px] text-base font-bold">{post.title}</p>
                  <div className="flex text-[13px] text-gray-600">
                    <p>
                      {new Date(post._createdAt).toLocaleString('default', {
                        month: 'short',
                      }) +
                        ' ' +
                        new Date(post._createdAt).getDate() +
                        ' ·  10 min read'}{' '}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Trending
