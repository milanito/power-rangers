import React from 'react'
import { map } from 'lodash'
import { Link } from 'gatsby'
import { List } from 'semantic-ui-react'

const getTagURL = tag => `/tags/${tag}`

const Tags = ({ tags }) => map(tags, tag => (
  <List.Item key={tag}>
    <Link to={getTagURL(tag)}>
      <List.Content>
        {tag}
      </List.Content>
    </Link>
  </List.Item>
))

export default ({ tags }) => (
  <List horizontal link bulleted>
    <Tags tags={tags} />
  </List>
)
