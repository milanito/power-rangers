import React, { Fragment } from "react"
import { get } from 'lodash'
import { Menu } from 'semantic-ui-react'
import { useStaticQuery, graphql, Link } from "gatsby"

export default () => {
    const data = useStaticQuery(graphql`
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
  `)

    const menuArray = get(data, 'allMenuJson.edges', [])
    return (
        <Fragment>
            {menuArray.map((menuItem) => 
            <Menu.Item as={Link} to={get(menuItem, 'node.to')} key={get(menuItem, 'node.text')} > 
            {get(menuItem, 'node.text')}
            </Menu.Item>)}
        </Fragment>
    )
}
