import React from 'react'
import styled from 'styled-components'
import { Container, Button, Icon } from 'semantic-ui-react'

const MainTitle = styled.h1`
  &&& {
    font-size: ${props => props.mobile ? '2em' : '4em'};
    font-weight: normal;
    margin-bottom: 0;
    margin-top: ${props => props.mobile ? '1.5em' : '3em'};
  }
`

const SubTitle = styled.h2`
  &&& {
    font-size: ${props => props.mobile ? '1.5em' : "'1.7em"};
    font-weight: normal;
    margin-bottom: 0;
    margin-top: ${props => props.mobile ? '0.5em' : '1.5em'};
  }
`
export default ({ mobile, pathname }) => (
  pathname === '/' &&
  <Container text>
    <MainTitle mobile={mobile} >Power Rangers</MainTitle>
    <SubTitle mobile={mobile} >Le bureau traction et plus encore</SubTitle>
    <Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
)
