import React from 'react'

import './index.scss'
// export const PostContainer = ({ html }) => (
//   <div dangerouslySetInnerHTML={{ __html: html }} />
// )


export const PostsContainer = React.memo(({ children }) => (
  <div className="posts-container">{children}</div>
))