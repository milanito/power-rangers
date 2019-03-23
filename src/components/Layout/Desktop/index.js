import React from 'react'
import { isEqual } from 'lodash'
import { Responsive } from 'semantic-ui-react'
import { compose, withState, withHandlers } from 'recompose'

import Navbar from './Navbar'
import Header from '../../Header'
import Footer from '../../Footer'
import MainContainer from '../MainContainer'
import HeaderSegment from '../HeaderSegment'
import HeaderVisibility from './HeaderVisibility'
import WithPathnameProps from '../WithPathnameProps'

const DesktopContainer = ({
  children, pathname, secondary, showSecondaryMenu, hideSecondaryMenu, minheight
}) => (
  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
    <Navbar fixed='top' inverted secondary={secondary} />
    <HeaderVisibility
      pathname={pathname}
      once={false}
      onBottomPassed={hideSecondaryMenu}
      onBottomPassedReverse={showSecondaryMenu}
    >
      <HeaderSegment padded='very' minheight={minheight} pathname={pathname}>
        <Header pathname={pathname} />
      </HeaderSegment>
    </HeaderVisibility>
    <MainContainer>
      {children}
    </MainContainer>
    <Footer />
  </Responsive>
)

export default compose(WithPathnameProps,
  withState('secondary', 'updateSecondary',
    ({ pathname }) => isEqual(pathname, '/')),
  withHandlers({
    hideSecondaryMenu: ({ updateSecondary }) => () => updateSecondary(false),
    showSecondaryMenu: ({ updateSecondary }) => () => updateSecondary(true)
  })
)(DesktopContainer)
