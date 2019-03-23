import React from 'react'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image'
import { get } from 'lodash'
import { Segment } from 'semantic-ui-react'
import { compose, withProps } from 'recompose'
import { StaticQuery, graphql } from 'gatsby'

import WithShowOnlyHome from '../WithShowOnlyHome'

const BACKGROUND_QUERY = graphql`
  query {
    desktop: file(relativePath: { eq: "background-image.JPG" }) {
      childImageSharp {
        fluid(quality: 100, maxWidth: 4160) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

const StyledSegment = styled(Segment)`
  min-height: ${({ minheight }) => minheight}px !important;
  padding: 1em 0em !important;
  text-align: center !important;
`

const BackgroundSegment = ({ children, ...props }) => (
  <StyledSegment inverted vertical textAlign='center' as={BackgroundImage} {...props}>
    {children}
  </StyledSegment>
)

const HeaderSegment = compose(WithShowOnlyHome, withProps(({ data }) => ({
  fluid: get(data, 'desktop.childImageSharp.fluid')
})))(BackgroundSegment)

export default props => (
  <StaticQuery
    query={BACKGROUND_QUERY}
    render={data => <HeaderSegment {...props} data={data} />}
  />
)
