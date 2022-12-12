import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'
import Trending from '../components/Trending'
import Feed from '../components/Feed'
import Discover from '../components/Discover'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  
  return (
    <>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <Trending trending={posts} />
      <Feed posts={posts} />
      <Discover />
    </>
  )
}
export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{ 
    _createdAt,
    _id,
    title,
    slug,
    author ->{
    name,
    image,
  },
   category ->{title},
   description,
   mainImage,
   slug
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
