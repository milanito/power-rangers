import React, { Fragment } from 'react'

import MobileContainer from './Mobile/index'
import DesktopContainer from './Desktop/index'

const ResponsiveContainer = ({ children, location }) => (
  <Fragment>
    <DesktopContainer location={location}>{children}</DesktopContainer>
    <MobileContainer location={location}>{children}</MobileContainer>
  </Fragment>
)

export default ({ children, location }) => (
  <ResponsiveContainer location={location}>
    {children}
  </ResponsiveContainer>
)
