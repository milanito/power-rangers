import React from 'react'
import { get } from 'lodash'
import { graphql } from 'gatsby'
import { compose, withProps } from 'recompose'

import SEO from '../components/seo'
import Layout from '../components/layout'
import MainContainer from '../components/MainContainer'
import { HTMLContent } from '../components/Content'

const BlogPost = ({ pageTitle, post }) => (
  <Layout>
    <SEO title={pageTitle} keywords={[`gatsby`, `application`, `react`]} />
    <MainContainer>
      <h1>{post.frontmatter.title}</h1>
      <HTMLContent content={post.html} />
    </MainContainer>
  </Layout>
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
