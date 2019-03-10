import React from 'react'
import { get } from 'lodash'
import { Header } from 'semantic-ui-react'
import { graphql } from 'gatsby'
import { compose, withProps } from 'recompose'

import SEO from '../components/Seo'
import Layout from '../components/Layout'
import TagsList from '../components/TagsList'
import PostImage from '../components/PostImage'
import WithLocation from '../components/WithLocation'
import MainContainer from '../components/MainContainer'
import { HTMLContent } from '../components/Content'

const BlogPost = ({ pageTitle, post, location }) => (
  <Layout location={location}>
    <SEO title={pageTitle} keywords={[`gatsby`, `application`, `react`]} />
    <MainContainer>
      <PostImage imagePath={post.frontmatter.imagePath} />
      <Header as='h1' content={post.frontmatter.title} />
      <TagsList tags={post.frontmatter.tags} />
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
        imagePath
        title
        tags
      }
    }
  }
`

export default compose(withProps(({ data }) => ({
  post: get(data, 'markdownRemark', {})
})), withProps(({ post }) => ({
  pageTitle: `${post.frontmatter.title} | Blog`
})), WithLocation)(BlogPost)
