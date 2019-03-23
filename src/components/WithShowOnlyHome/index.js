import { isEqual } from 'lodash'
import { branch, renderNothing } from 'recompose'

export default branch(({ pathname }) => !isEqual(pathname, '/'), renderNothing)
