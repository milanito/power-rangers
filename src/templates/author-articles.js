import React from 'react'
import { Header, List } from 'semantic-ui-react'
import { Link, graphql } from 'gatsby'
import { compose, withProps } from 'recompose'
import { map, isEqual, get } from 'lodash'

import SEO from '../components/Seo'
import Layout from '../components/Layout'

const PostsLinks = ({ posts }) => map(posts, post => (
  <List.Item key={post.node.frontmatter.title}>
    <Link to={post.node.frontmatter.path}>
      <Header as='h3' content={post.node.frontmatter.title} />
    </Link>
  </List.Item>
))

const AuthorArticlesPage = ({ pageTitle, posts, tagHeader, location }) => (
  <Layout location={location}>
    <SEO title={pageTitle} keywords={[`gatsby`, `application`, `react`]} />
    <div>
      <Header as='h2' content={tagHeader} />
      <List>
        <PostsLinks posts={posts} />
      </List>
      <p>
        <Link to='/team'>Browse all authors</Link>
      </p>
    </div>
  </Layout>
)

export default compose(withProps(({ pageContext, data }) => ({
  author: pageContext.author,
  title: data.site.siteMetadata.title,
  posts: get(data, 'allMarkdownRemark.edges', []),
  totalCount: get(data, 'allMarkdownRemark.totalCount', 0)
})), withProps(({ author, title, totalCount }) => ({
  pageTitle: `${author}'s articles | ${title}`,
  tagHeader: `${totalCount} post${
    isEqual(totalCount, 1) ? '' : 's'
  } written by “${author}”`
})))(AuthorArticlesPage)

export const authorArticlesPageQuery = graphql`
  query AuthorArticlesPage($author: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { eq: $author } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`
