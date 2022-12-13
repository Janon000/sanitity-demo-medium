import React from 'react'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  posts: [Post]
}

function Feed({ posts }: Props) {
  return (
    <div className="mx-20">
      <div className="mx-auto grid max-w-7xl grid-cols-11 py-10 ">
        <section className="col-span-full flex flex-col lg:col-span-7">
          {posts.map((post) => {
            return (
              <Link key={post._id} href={`/post/${post.slug.current}`}>
                <div className="mb-12 flex cursor-pointer overflow-hidden">
                  <div className="flex h-[180px] w-[676.667px] justify-between lg:w-[696px]  ">
                    <div className="max-w-[456px] overflow-hidden line-clamp-2">
                      <div className="mb-[5px] flex max-h-[56px] text-[13px] font-semibold">
                        <span className="pr-2">
                          <img
                            className="h-[20px] w-[20px] rounded-full"
                            src={urlFor(post.author.image).url()!}
                            alt=""
                          />
                        </span>
                        <p>{post.author.name}</p>
                      </div>
                      <div>
                        <p className="pt-[4px] text-[22px] font-bold text-gray-800">
                          {post.title}
                        </p>
                        <p className="pt-[4px] text-[16px] text-gray-600 line-clamp-2">
                          {post.description}
                        </p>
                      </div>
                      <div className="flex pt-[8px] text-[13px] text-gray-600">
                        <p>
                          {new Date(post._createdAt).toLocaleString('default', {
                            month: 'short',
                          }) +
                            ' ' +
                            new Date(post._createdAt).getDate() +
                            ' ·  10 min read ·'}
                        </p>
                        <span className="ml-1 rounded-full border bg-gray-200 px-2">
                          <p> {post.category.title}</p>
                        </span>
                      </div>
                    </div>

                    <img
                      className=" max-h-[134px] w-[200px] bg-red-500 object-cover "
                      src={urlFor(post.mainImage).url()!}
                      alt=""
                    />
                  </div>
                </div>
              </Link>
            )
          })}
        </section>
        <aside className="col-span-3 hidden lg:flex ">
          <div>
            <p className="text-[12px] font-bold tracking-[0.083em] mb-[10px]">
              DISCOVER MORE OF WHAT MATTERS TO YOU
            </p>
            <div className='flex-wrap'>
              <span className="">
                <button className="items-center rounded-[3px] border border-gray-300 px-[16px] pb-[9px] pt-[6px] text-[13px] text-gray-600 mr-[8px] mb-[8px]">
                  Technology
                </button>
              </span>
              <span className="">
                <button className="items-center rounded-[3px] border border-gray-300 px-[16px] pb-[9px] pt-[6px] text-[13px] text-gray-600 mr-[8px] mb-[8px]">
                  Productivity
                </button>
              </span>
              <span className="">
                <button className="items-center rounded-[3px] border border-gray-300 px-[16px] pb-[9px] pt-[6px] text-[13px] text-gray-600 mr-[8px] mb-[8px]">
                  Relationships
                </button>
              </span>
              <span className="">
                <button className="items-center rounded-[3px] border border-gray-300 px-[16px] pb-[9px] pt-[6px] text-[13px] text-gray-600 mr-[8px] mb-[8px]">
                  Data Science
                </button>
              </span>
              <span className="">
                <button className="items-center rounded-[3px] border border-gray-300 px-[16px] pb-[9px] pt-[6px] text-[13px] text-gray-600 mr-[8px] mb-[8px]">
                  Politics
                </button>
              </span>
              <span className="">
                <button className="items-center rounded-[3px] border border-gray-300 px-[16px] pb-[9px] pt-[6px] text-[13px] text-gray-600 mr-[8px] mb-[8px]">
                  Psychology
                </button>
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Feed
