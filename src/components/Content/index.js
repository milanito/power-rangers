import React from 'react'

export const HTMLContent = ({ content, className, ...props }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} {...props} />
)

const Content = ({ content, className, ...props }) => (
  <div className={className} {...props}>{content}</div>
)

export default Content
