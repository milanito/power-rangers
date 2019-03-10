import React, { Fragment } from 'react'
import { map, get } from 'lodash'
import { Menu } from 'semantic-ui-react'
import { StaticQuery, graphql, Link } from 'gatsby'

const MENU_QUERY = graphql`
  query GetMenu{
      allMenuJson {
        edges {
          node {
              to
              text
          }
        }
      }
    }
`

const MenuMap = ({ menuArray }) => map(menuArray, ({ node: { to, text } }) => (
  <Menu.Item as={Link} to={to} key={text} >
    {text}
  </Menu.Item>
))

const renderMenu = data => (
  <Fragment>
    <MenuMap menuArray={get(data, 'allMenuJson.edges', [])} />
  </Fragment>
)

export default () => (
  <StaticQuery query={MENU_QUERY} render={renderMenu} />
)
