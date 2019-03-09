import React, { useState } from 'react'
import {
  Responsive,
  Segment,
  Visibility
} from 'semantic-ui-react'

import Navbar from './Navbar'
import Header from '../../Header'

export default ({ children, location }) => {
  const [fixed, setFixed] = useState(false)
  const hideFixedMenu = () => setFixed(false)
  const showFixedMenu = () => setFixed(true)
  const { pathname } = location
  const minHeight = pathname === '/' ? 700 : 0

  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={showFixedMenu}
        onBottomPassedReverse={hideFixedMenu}
      >
        <Segment

          inverted
          textAlign='center'
          style={{ minHeight, padding: '1em 0em' }}
          vertical
        >
          <Navbar fixed={fixed} />
          <Header pathname={pathname} />
        </Segment>
      </Visibility>
      {children}
    </Responsive>
  )
}
