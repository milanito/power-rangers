/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import styled from 'styled-components'
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./Footer"
import "./layout.scss"

const WrapperDiv = styled.div`
  margin: 0 auto;
  maxWidth: 960px;
  padding: 0px 1.0875rem 1.45rem;
  paddingTop: 0;
`

const renderMain = children => data => (
  <div>
    <Header siteTitle={data.site.siteMetadata.title} />
    <WrapperDiv>
      <main>{children}</main>
    </WrapperDiv>
    <Footer />
  </div>
)

const MAIN_QUERY = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default ({ children }) => (
  <StaticQuery query={MAIN_QUERY} render={renderMain(children)} />
)
