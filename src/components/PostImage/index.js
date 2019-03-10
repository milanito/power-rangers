import React from 'react'
import Img from 'gatsby-image'
import { Item } from 'semantic-ui-react'
import { isEqual, find, get } from 'lodash'
import { StaticQuery, graphql, Link } from 'gatsby'
import { branch, renderComponent, compose, withProps } from 'recompose'

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

const TypedImage = compose(branch(({ type }) => isEqual(type, 'extract'),
  renderComponent(({ image, to }) => (
    <Link to={to}>
      <Item.Image size='tiny' src={image.src} />
    </Link>
  )))
)(({ image }) => (
  <Img fluid={image} />
))

const Image = compose(withProps(({ imagePath, data }) => ({
  image: get(find(data.images.edges,
    ({ node: { relativePath } }) => isEqual(relativePath, imagePath)),
  'node.childImageSharp.fluid')
})))(TypedImage)

export default props => (
  <StaticQuery
    query={IMAGES_QUERY}
    render={data => <Image {...props} data={data} />}
  />
)
