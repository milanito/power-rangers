import React from "react"

import DesktopContainer from './desktop/index'
import MobileContainer from './mobile/index'

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
)

export default ({ children }) => (
    <ResponsiveContainer>
        {children}
    </ResponsiveContainer>
)
