import { AsyncResource } from 'async_hooks'
import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

// Interface that form uses
interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

// interface that out component uses
interface Props {
  post: Post
}

// The main react jsx component
function Post({ post }: Props) {
    console.log(post)

  const[submitted, setSubmitted] = useState(false);

  // Declarations necessary for form submit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async(data) => {
      await fetch('/api/createComment', {
          method: 'POST',
          body: JSON.stringify(data),
      }).then(()=>{
          console.log(data);
          setSubmitted(true)
      }).catch((err) =>{
          console.log(err)
          setSubmitted(false)
      })
  }

  // Page render
  return (
    <main>
      <Header />
      <img
        className="h-80 w-full object-cover"
        src={urlFor(post.mainImage).url()!}
        alt=""
      />
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">{post.title} </h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
          />
          <p className="font-extra-Light text-sm">
            Blog post by Bill Gates - Published at{' '}
            {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => {
                ;<h1 className="my-5 text-2xl font-bold" {...props} />
              },
              h2: (props: any) => {
                ;<h1 className="my-5 text-xl font-bold" {...props} />
              },
              li: ({ children }: any) => {
                ;<li className="ml-4 list-disc">{children}</li>
              },
              link: ({ href, children }: any) => {
                ;<a href={href} className="hover:underLine text-blue-500">
                  {children}
                </a>
              },
            }}
          />
        </div>
      </article>
      <hr className="my-5 mx-auto max-w-lg border border-yellow-500" />
      
      {submitted ? (
          <div className="my-10 mx-auto flex max-w-2xl flex-col bg-yellow-500 p-10 text-white">
          <h3>Thank you for submitting your comment</h3>
          <p>Once it has been approved, it will appear below! </p>
        </div>
      ):(<form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-10 flex max-w-2xl flex-col p-5">
      <h3 className="text-sm text-yellow-500">Enjoy this article?</h3>
      <h4 className="text-3xl font-bold">Leave a comment below!</h4>
      <hr className="mt-2 py-3" />

      <input {...register('_id')} type="hidden" name="_id" value={post._id} />

      <label className="mb-5 block">
        <span className="text-gray-700">Name</span>
        <input
          {...register('name', { required: true })}
          className="form-input w-fill mt-1 block rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
          placeholder="John Appleseeed"
          type="text"
        />
      </label>
      <label className="mb-5 block">
        <span className="text-gray-700">Email</span>
        <input
          {...register('email', { required: true })}
          className="form-input w-fill mt-1 block rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
          placeholder="John Appleseeed"
          type="email"
        />
      </label>
      <label className="mb-5 block">
        <span className="text-gray-700">Comment</span>
        <textarea
          {...register('comment', { required: true })}
          className="rounded-py-2 form-textarea mt-1 block w-full border px-3 shadow outline-none
          ring-yellow-500 focus:ring"
          placeholder="John Appleseeed"
          rows={8}
        />
      </label>
      {/* errors will return when field validation fails*/}
      <div className="flex flex-col">
        {errors.name && (
          <span className="text-red-500">- The Name Field is required</span>
        )}
        {errors.comment && (
          <span className="text-red-500">
            - The Comment Field is required
          </span>
        )}
        {errors.email && (
          <span className="text-red-500">- The Email Field is required</span>
        )}
      </div>
      <input
        type="submit"
        value="Submit"
        className="focus:shadow-outline cursor-pointer rounded bg-yellow-500  px-4 py-2 font-bold text-white shadow hover:bg-yellow-400"
      />
    </form>)}

    {/* Comments */}
    <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow  shadow-yellow-500"> 
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />
        {post.comments.map((comment)=>{
            return(
            <div>
                <p>
                <span className="text-yellow-500"> {comment.name} </span>:{comment.comment}
                </p>
            </div>)
        })}
    </div>
    </main>
  )
}
export default Post

// Get the list of all pages/slugs that we should pre-render
export const getStaticPaths = async () => {
  const query = `*[_type == 'post']{ 
        _id,
        slug,
      }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

//Query the data for the selected slug and return the relevant props
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == 'post' && slug.current == $slug][0]{ 
        _id,
        _createdAt,
        title,
        author ->{
        name,
        image
      },
      'comments' :*[
        _type == 'comment' && 
        post._ref == ^._id &&
        approved == true
      ],
      description,
      mainImage,
        slug,
      body,
      }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      //will return 404 page when using fallback blocing
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60, //after 60 seconds reload the pages and caches it
  }
}
