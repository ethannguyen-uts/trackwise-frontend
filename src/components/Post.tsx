import React, { useState } from 'react'
import {
  PostSnippetFragmentFragment,
  useVoteMutation,
} from '../generated/graphql'
import { DownvoteIcon } from './layout/DownvoteIcon'
import LoadingIcon from './layout/LoadingIcon'
import UpvoteIcon from './layout/UpvoteIcon'

interface PostProps {
  post: PostSnippetFragmentFragment
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [loading, setLoading] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading')
  const [, vote] = useVoteMutation()
  return (
    <div className="mx-auto mb-10 flex max-w-lg flex-row flex-wrap overflow-hidden rounded border-neutral-600 shadow-md">
      <div className="flex flex-col flex-wrap items-center justify-center">
        <button
          onClick={async () => {
            setLoading('updoot-loading')
            await vote({ postId: post.id, value: 1 })
            setLoading('not-loading')
          }}
        >
          <div className="h-8 w-8">
            {loading === 'updoot-loading' ? (
              <LoadingIcon />
            ) : (
              <UpvoteIcon
                color={post.voteStatus === 1 ? 'bg-green-600' : 'bg-white-500'}
              />
            )}
          </div>
        </button>
        <label> {post.points}</label>

        <button
          onClick={async () => {
            setLoading('downdoot-loading')
            await vote({ postId: post.id, value: -1 })
            setLoading('not-loading')
          }}
        >
          <div className="h-8 w-8">
            {loading === 'downdoot-loading' ? (
              <LoadingIcon />
            ) : (
              <DownvoteIcon
                color={post.voteStatus === -1 ? 'bg-red-500' : 'bg-white-500'}
              />
            )}
          </div>
        </button>
      </div>
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{post.title}</div>
        <span className="mb-4 block">Posted by {post.creator.username}</span>
        <p className="text-base text-gray-700">{post.textSnippet}</p>
      </div>
    </div>
  )
}

export default Post
