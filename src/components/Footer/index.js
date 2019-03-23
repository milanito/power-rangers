import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { Segment, Container, Grid, Header, List } from 'semantic-ui-react'

const FooterSegment = styled(Segment)`
  padding: 5em 0em !important;
`

export default () => (
  <FooterSegment inverted vertical>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='About' />
            <List link inverted>
              <List.Item as={Link} to='/'>Sitemap</List.Item>
              <List.Item as={Link} to='/'>Contact Us</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Services' />
            <List link inverted>
              <List.Item as={Link} to='/'>Banana Pre-Order</List.Item>
              <List.Item as={Link} to='/'>DNA FAQ</List.Item>
              <List.Item as={Link} to='/'>How To Access</List.Item>
              <List.Item as={Link} to='/'>Favorite X-Men</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as='h4' inverted>
              Footer Header
            </Header>
            <p>
              Extra space for a call to action inside the footer that could help re-engage users.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </FooterSegment>
)
