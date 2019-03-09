import React from 'react'

import MobileContainer from './Mobile/index'
import DesktopContainer from './Desktop/index'

const ResponsiveContainer = ({ children, location }) => (
  <div>
    <DesktopContainer location={location}>{children}</DesktopContainer>
    <MobileContainer location={location}>{children}</MobileContainer>
  </div>
)

export default ({ children, location }) => (
  <ResponsiveContainer location={location}>
    {children}
  </ResponsiveContainer>
)
