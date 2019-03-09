import React, { useState } from 'react'
import {
  Container,
  Icon,
  Responsive,
  Segment,
  Sidebar,
  Menu
} from 'semantic-ui-react'

import Header from '../../Header'
import CustomMenu from '../../Menu'

export default ({ children, location }) => {
  const [sidebarOpened, setsidebarOpened] = useState(false)
  const hideSidebarOpenedMenu = () => setsidebarOpened(false)
  const showSidebarOpenedMenu = () => setsidebarOpened(true)
  const { pathname } = location
  const minHeight = pathname === '/' ? 350 : 0
  return (
    <Responsive
      as={Sidebar.Pushable}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <Sidebar
        as={Menu}
        animation='push'
        inverted
        onHide={hideSidebarOpenedMenu}
        vertical
        visible={sidebarOpened}
      >
        <CustomMenu />
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight, padding: '1em 0em' }}
          vertical
        >
          <Container>
            <Menu inverted pointing secondary size='large'>
              <Menu.Item onClick={showSidebarOpenedMenu}>
                <Icon name='sidebar' />
              </Menu.Item>
            </Menu>
          </Container>
          <Header mobile pathname={pathname} />
        </Segment>

        {children}
      </Sidebar.Pusher>
    </Responsive>
  )
}
