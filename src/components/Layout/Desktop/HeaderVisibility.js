import styled from 'styled-components'
import { compose } from 'recompose'
import { Visibility } from 'semantic-ui-react'

import WithShowOnlyHome from '../../WithShowOnlyHome'

const HeaderVisibility = styled(Visibility)`
  margin-top: -4em !important;
`

export default compose(WithShowOnlyHome)(HeaderVisibility)
