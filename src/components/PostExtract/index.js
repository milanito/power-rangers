import React from 'react'
import { Link } from 'gatsby'
import { Item } from 'semantic-ui-react'

import TagsList from '../TagsList'
import PostImage from '../PostImage'

export default ({ excerpt, frontmatter: { path, title, imagePath, date, tags } }) => (
  <Item>
    <PostImage type='extract' imagePath={imagePath} to={path} />
    <Item.Content>
      <Item.Header as={Link} to={path}>{title}</Item.Header>
      <Item.Meta>{date}</Item.Meta>
      <Item.Description>{excerpt}</Item.Description>
      <Item.Meta>
        <TagsList tags={tags} />
      </Item.Meta>
    </Item.Content>
  </Item>
)
