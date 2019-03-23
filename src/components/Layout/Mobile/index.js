import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import {
  Container,
  Icon,
  Responsive,
  Sidebar,
  Menu
} from 'semantic-ui-react'

import Header from '../../Header'
import CustomMenu from '../../Menu'
import HeaderSegment from '../HeaderSegment'
import WithPathnameProps from '../WithPathnameProps'

const MobileContainer = ({
  children, pathname, sidebarOpened, showSidebarOpenedMenu, hideSidebarOpenedMenu, minheight
}) => (
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
      <HeaderSegment inverted vertical textAlign='center' minheight={minheight}>
        <Container>
          <Menu inverted pointing secondary size='large'>
            <Menu.Item onClick={showSidebarOpenedMenu}>
              <Icon name='sidebar' />
            </Menu.Item>
          </Menu>
        </Container>
        <Header mobile pathname={pathname} />
      </HeaderSegment>
      {children}
    </Sidebar.Pusher>
  </Responsive>
)

export default compose(withState('sidebarOpened', 'updateSidebarOpened', false),
  withHandlers({
    hideSidebarOpenedMenu: ({ updateSidebarOpened }) => () => updateSidebarOpened(false),
    showSidebarOpenedMenu: ({ updateSidebarOpened }) => () => updateSidebarOpened(true)
  }),
  WithPathnameProps
)(MobileContainer)
