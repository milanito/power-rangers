import React from "react"
import { Link } from "gatsby"
import { Menu, Container } from 'semantic-ui-react'

export default ({ siteTitle }) => (
  <Menu fixed='top' inverted>
    <Container>
      <Menu.Item as={Link} header to='/'>
        {siteTitle}
      </Menu.Item>
    </Container>
  </Menu>
)
