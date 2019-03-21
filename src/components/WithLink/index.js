import React from 'react'
import { Link } from 'gatsby'
import { branch } from 'recompose'

export default branch(({ to }) => to, Component => ({ to, ...props }) => (
  <Link to={to}>
    <Component {...props} />
  </Link>
))
