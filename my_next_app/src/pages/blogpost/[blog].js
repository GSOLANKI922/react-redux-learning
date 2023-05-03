import { useRouter } from 'next/router'
import React from 'react'

const BlogDetails = () => {
    const route = useRouter()
    const {blog} = route.query
  return (
    <div>
      <h1>BlogDetails : {blog}</h1>
    </div>
  )
}

export default BlogDetails
