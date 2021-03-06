import React, { Fragment } from 'react'
import Img from 'gatsby-image'
import { Card } from 'semantic-ui-react'
import { map, get } from 'lodash'
import { StaticQuery, graphql, Link } from 'gatsby'

import SEO from '../components/Seo'
import Layout from '../components/Layout'

const TEAM_QUERY = graphql`
  query GetTeam{
      allTeamJson {
        edges {
          node {
            avatar {
              childImageSharp {
                fixed(width: 290, height: 290) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            header
            description
          }
        }
      }
    }
`

const getArticlesURL = author => `/author/${author}/`

const renderTeam = (data) => map(get(data, 'allTeamJson.edges', []), ({ node: { header, avatar, date, description } }) => (
  <Card key={header}>
    <Card.Content>
      <Img fixed={avatar.childImageSharp.fixed} />
      <Fragment>
        <Card.Header>{header}</Card.Header>
        <Card.Meta>{date}</Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Fragment>
    </Card.Content>

    <Card.Content extra>
      <Link to={getArticlesURL(header)}>
        Browse all articles
      </Link>
    </Card.Content>
  </Card>
))

const IndexPage = ({ location }) => (
  <Layout location={location} >
    <SEO title='team' keywords={[`gatsby`, `application`, `react`]} />
    <Card.Group doubling itemsPerRow={3} stackable>
      <StaticQuery query={TEAM_QUERY} render={renderTeam} />
    </Card.Group>
  </Layout>
)

export default IndexPage
