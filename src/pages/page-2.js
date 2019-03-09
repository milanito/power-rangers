import React from 'react'
import { Link } from 'gatsby'

import SEO from '../components/Seo'
import Layout from '../components/Layout'

export default ({ location }) => (
  <Layout location={location} >
    <SEO title='Page two' />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to='/'>Go back to the homepage</Link>
  </Layout>
)
