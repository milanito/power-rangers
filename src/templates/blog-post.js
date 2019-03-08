import React from 'react'
import { get } from 'lodash'
import { graphql } from 'gatsby'
import { compose, withProps } from 'recompose'

const BlogPost = ({ pageTitle, post }) => (
  <p>Article</p>
)

export const pageQuery = graphql`
  query BlogPostByID($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`

export const BlogPostTemplate = compose(withProps(({ data }) => ({
  post: get(data, 'markdownRemark', {})
})),
  withProps(({ post }) => ({
    pageTitle: `${post.frontmatter.title} | Blog`
  }))
)(BlogPost)

export default BlogPostTemplate
