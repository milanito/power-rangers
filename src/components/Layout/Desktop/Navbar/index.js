import React from 'react'
import styled from 'styled-components'
import { Container, Menu } from 'semantic-ui-react'

import CustomMenu from '../../../Menu'

const MenuContainer = styled(Container)`
  z-index: 9999 !important;
`

export default ({ ...props }) => (
  <Menu {...props} size='large'>
    <MenuContainer>
      <CustomMenu />
    </MenuContainer>
  </Menu>
)
