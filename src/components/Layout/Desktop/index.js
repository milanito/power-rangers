import React from 'react'
import styled from 'styled-components'
import { Responsive, Visibility, Container } from 'semantic-ui-react'
import { compose, withState, withHandlers } from 'recompose'

import Navbar from './Navbar'
import Header from '../../Header'
import HeaderSegment from '../HeaderSegment'
import WithPathnameProps from '../WithPathnameProps'

const MainContainer = styled(Container)`
  padding: 1em;
`

const DesktopContainer = ({
  children, pathname, fixed, showFixedMenu, hideFixedMenu, minheight
}) => (
  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
    <Visibility
      once={false}
      onBottomPassed={showFixedMenu}
      onBottomPassedReverse={hideFixedMenu}
    >
      <HeaderSegment inverted vertical textAlign='center' minheight={minheight}>
        <Navbar fixed={fixed} />
        <Header pathname={pathname} />
      </HeaderSegment>
    </Visibility>
    <MainContainer>
      {children}
    </MainContainer>
  </Responsive>
)

export default compose(withState('fixed', 'updateFixed', false),
  withHandlers({
    hideFixedMenu: ({ updateFixed }) => () => updateFixed(false),
    showFixedMenu: ({ updateFixed }) => () => updateFixed(true)
  }),
  WithPathnameProps
)(DesktopContainer)
