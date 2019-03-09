import React from 'react'
import {
  Container,
  Menu
} from 'semantic-ui-react'

import CustomMenu from '../../Menu'

export default ({ fixed }) => (
  <Menu
    fixed={fixed ? 'top' : null}
    inverted={!fixed}
    pointing={!fixed}
    secondary={!fixed}
    size='large'>
    <Container>
      <CustomMenu />
    </Container>
  </Menu>
)
