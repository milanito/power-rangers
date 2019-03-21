import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import { Card } from 'semantic-ui-react'

import TagsList from '../TagsList'
import PostImage from '../PostImage'

export default ({ excerpt, frontmatter: { path, title, imagePath, date, tags } }) => (
  <Card>
    <PostImage imagePath={imagePath} to={path} />
    <Card.Content>
      <Fragment>
        <Card.Header as={Link} to={path}>{title}</Card.Header>
        <Card.Meta>{date}</Card.Meta>
        <Card.Description>{excerpt}</Card.Description>
      </Fragment>
    </Card.Content>
    <Card.Content extra>
      <TagsList tags={tags} />
    </Card.Content>
  </Card>
)
