import React from 'react'
import { Header, List } from 'semantic-ui-react'
import { kebabCase, map } from 'lodash'
import { compose, withProps } from 'recompose'
import { Link, graphql, StaticQuery } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'

const TAGS_QUERY = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

const getTagURL = fieldValue => `/tags/${kebabCase(fieldValue)}/`

const TagsList = ({ tags }) => map(tags, ({ fieldValue, totalCount }) => (
  <List.Item key={fieldValue}>
    <Link to={getTagURL(fieldValue)}>
      {fieldValue} ({totalCount})
    </Link>
  </List.Item>
))

const TagsPage = ({ title, tags, location }) => (
  <Layout location={location}>
    <SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
    <Header as='h1' content='Tags' />
    <List>
      <TagsList tags={tags} />
    </List>
  </Layout>
)

const ComposedTagsPage = compose(withProps(({
  data: { allMarkdownRemark: { group }, site: { siteMetadata: { title } } }
}) => ({
  title: `Tags | ${title}`,
  tags: group
})))(TagsPage)

export default props => (
  <StaticQuery
    query={TAGS_QUERY}
    render={data => <ComposedTagsPage {...props} data={data} />}
  />
)
