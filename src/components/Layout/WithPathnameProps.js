import { isMobile } from 'react-device-detect'
import { withProps } from 'recompose'
import { get, isEqual } from 'lodash'

const getMinHeight = () => isMobile ? 350 : 700

export default withProps(({ location }) => ({
  pathname: get(location, 'pathname', '/'),
  minheight: isEqual(get(location, 'pathname', '/'), '/') ? getMinHeight() : 0
}))
