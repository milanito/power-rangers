import React from 'react'
import { isMobile } from 'react-device-detect'
import { branch, compose } from 'recompose'

import MobileContainer from './Mobile/index'
import DesktopContainer from './Desktop/index'

const DesktopHandler = branch(() => !isMobile, Component => ({ location, ...props }) => (
  <DesktopContainer location={location}>
    <Component {...props} />
  </DesktopContainer>
))

const MobileHandler = branch(() => isMobile, Component => ({ location, ...props }) => (
  <MobileContainer location={location}>
    <Component {...props} />
  </MobileContainer>
))

export default compose(MobileHandler, DesktopHandler)(({ children }) => children)
