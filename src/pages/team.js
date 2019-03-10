import React, { Fragment } from 'react'

import Img from 'gatsby-image'
import { map, get } from 'lodash'
import SEO from '../components/Seo'
import Layout from '../components/Layout'
import { StaticQuery, graphql } from 'gatsby'
import { Card, Button } from 'semantic-ui-react'

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
      <Button primary>
        Add
      </Button>
      <Button>Delete</Button>
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
