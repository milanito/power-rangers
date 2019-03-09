import React from 'react'
import styled from 'styled-components'
import { map } from 'lodash'
import { Link } from 'gatsby'

const getTagURL = tag => `/tags/${tag}`

const SpacedLink = styled(Link)`
  margin-right: 5px !important;
`

export default ({ tags }) => map(tags, tag => (
  <SpacedLink to={getTagURL(tag)} key={tag}>
    {tag}
  </SpacedLink>
))
