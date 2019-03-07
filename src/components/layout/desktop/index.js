import React, {useState} from "react"
import {
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react'

import Header from '../../header'
import Navbar from './navbar'

export default ({ children }) => {
    const [fixed, setFixed] = useState(false);
    const hideFixedMenu = () => setFixed(false)
    const showFixedMenu = () => setFixed(true)
    return (
      <Responsive  minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={showFixedMenu}
          onBottomPassedReverse={hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Navbar fixed={fixed} />
            <Header />
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
  