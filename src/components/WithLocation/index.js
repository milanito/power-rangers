import React from 'react'
import { Location } from '@reach/router'

export default Component => props => (
  <Location>
    {({ location })=> (
      <Component {...props} location={location} />
    )}
  </Location>
)
