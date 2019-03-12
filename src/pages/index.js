import React from 'react'
import { get, map } from 'lodash'
import { Header, Card } from 'semantic-ui-react'
import { compose, withProps } from 'recompose'
import { StaticQuery, graphql } from 'gatsby'

import SEO from '../components/Seo'
import Layout from '../components/Layout'
import PostExtract from '../components/PostExtract'

const INDEX_QUERY = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          frontmatter {
            title
            path
            templateKey
            imagePath
            tags
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

const PostsList = ({ posts }) => map(posts,
  post => (<PostExtract {...post} key={post.frontmatter.title} />))

const IndexPage = ({ location, posts }) => (
  <Layout location={location} >
    <SEO title='Home' keywords={[`gatsby`, `application`, `react`]} />
    <Header as='h1' content='Hi people' />
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Card.Group id='articles-list'>
      <PostsList posts={map(posts, 'node')} />
    </Card.Group>
  </Layout>
)

const ComposedIndexPage = compose(withProps(({ data }) => ({
  posts: get(data, 'allMarkdownRemark.edges', [])
})))(IndexPage)

export default props => (
  <StaticQuery
    query={INDEX_QUERY}
    render={data => <ComposedIndexPage {...props} data={data} />}
  />
)
