import React from 'react'
import styled from 'styled-components'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { compose } from 'recompose'
import { Container, Button, Icon } from 'semantic-ui-react'

import WithShowOnlyHome from '../WithShowOnlyHome'

const MainTitle = styled.h1`
  font-size: ${props => props.mobile ? '2em !important' : '4em !important'};
  font-weight: normal;
  margin-bottom: 0;
  margin-top: ${props => props.mobile ? '1.5em !important' : '3em !important'};
`

const SubTitle = styled.h2`
  font-size: ${props => props.mobile ? '1.5em' : "'1.7em"};
  font-weight: normal;
  margin-bottom: 0;
  margin-top: ${props => props.mobile ? '0.5em' : '1.5em'};
`

const Header = ({ mobile, pathname }) => (
  <Container text>
    <MainTitle mobile={mobile} >Power Rangers</MainTitle>
    <SubTitle mobile={mobile} >Le bureau traction et plus encore</SubTitle>
    <AnchorLink href='#articles-list'>
      <Button primary size='huge'>
        Get Started
        <Icon name='right arrow' />
      </Button>
    </AnchorLink>
  </Container>
)

export default compose(WithShowOnlyHome)(Header)
