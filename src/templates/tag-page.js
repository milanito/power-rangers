import React from 'react'
import { map, isEqual } from 'lodash'
import { Header, List } from 'semantic-ui-react'
import { Link, graphql } from 'gatsby'
import { compose, withProps } from 'recompose'

import SEO from '../components/Seo'
import Layout from '../components/Layout'

const PostsLinks = ({ posts }) => map(posts, post => (
  <List.Item key={post.node.frontmatter.title}>
    <Link to={post.node.frontmatter.path}>
      <Header as='h3' content={post.node.frontmatter.title} />
    </Link>
  </List.Item>
))

const TagPage = ({ pageTitle, posts, tagHeader, location }) => (
  <Layout location={location}>
    <SEO title={pageTitle} keywords={[`gatsby`, `application`, `react`]} />
    <div>
      <Header as='h2' content={tagHeader} />
      <List>
        <PostsLinks posts={posts} />
      </List>
      <p>
        <Link to='/tags/'>Browse all tags</Link>
      </p>
    </div>
  </Layout>
)

export default compose(withProps(({ pageContext, data }) => ({
  tag: pageContext.tag,
  title: data.site.siteMetadata.title,
  posts: data.allMarkdownRemark.edges,
  totalCount: data.allMarkdownRemark.totalCount
})), withProps(({ tag, title, totalCount }) => ({
  pageTitle: `${tag} | ${title}`,
  tagHeader: `${totalCount} post${
    isEqual(totalCount, 1) ? '' : 's'
  } tagged with “${tag}”`
})))(TagPage)

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
