import React from 'react'
import Img from 'gatsby-image'
import { compose, withProps } from 'recompose'
import { StaticQuery, graphql } from 'gatsby'
import { isEqual, find, get } from 'lodash'

import WithLink from '../WithLink'

const IMAGES_QUERY = graphql`
  query BlogImages {
     images: allFile(filter:{ extension: { regex: "/jpeg|jpg|png|gif/"}}) {
      edges {
        node {
          extension
          relativePath
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

const Image = compose(withProps(({ imagePath, data }) => ({
  fluid: get(find(data.images.edges,
    ({ node: { relativePath } }) => isEqual(relativePath, imagePath)),
  'node.childImageSharp.fluid')
})), WithLink)(Img)

export default props => (
  <StaticQuery
    query={IMAGES_QUERY}
    render={data => <Image {...props} data={data} />}
  />
)
