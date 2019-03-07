import React from "react"

import DesktopContainer from './desktop/index'
import MobileContainer from './mobile/index'

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
