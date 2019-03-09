const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const { get, uniq, kebabCase, forEach, isEqual, reduce } = require('lodash')

const POSTS_QUERY = `
  {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
      edges {
        node {
          frontmatter {
            path
            tags
          }
        }
      }
    }
  }
`

const createPostsPages = (createPage, posts) =>
  forEach(posts, ({ node }) => createPage({
    path: node.frontmatter.path,
    component: path.resolve('src/templates/blog-post.js'),
    // additional data can be passed via context
    context: {}
  }))

const createTagsPages = (createPage, posts) =>
  forEach(uniq(reduce(posts, (tags, edge) => {
    if (get(edge, `node.frontmatter.tags`)) {
      return [...tags, ...edge.node.frontmatter.tags]
    }
    return tags
  }, [])), tag => createPage({
      path: `/tags/${kebabCase(tag)}/`,
      component: path.resolve(`src/templates/tag-page.js`),
      context: { tag },
  }))

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(POSTS_QUERY)
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      forEach([createPostsPages, createTagsPages], fn =>
        fn(createPage, result.data.allMarkdownRemark.edges))
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (isEqual(node.internal.type, 'MarkdownRemark')) {
    return createNodeField({
      name: `slug`,
      value: createFilePath({ node, getNode }),
      node
    })
  }
}
