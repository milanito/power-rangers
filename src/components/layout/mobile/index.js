import React, {useState} from "react"
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

import Header from '../../header'

export default ({ children }) => {
    const [sidebarOpened, setsidebarOpened] = useState(false);
    const hideSidebarOpenedMenu = () => setsidebarOpened(false)
    const showSidebarOpenedMenu = () => setsidebarOpened(true)
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
          <Menu.Item as='a' active>
            Home
        </Menu.Item>
          <Menu.Item as='a'>Work</Menu.Item>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
        </Sidebar>
  
        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={showSidebarOpenedMenu}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted>
                    Log in
                </Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <Header mobile />
          </Segment>
  
          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
  
  