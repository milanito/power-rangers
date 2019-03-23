import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'

export default styled(Segment)`
  min-height: ${({ minheight }) => minheight}px !important;
  padding: 1em 0em !important;
`
