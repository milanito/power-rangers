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

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(POSTS_QUERY)
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      // Posts pages
      createPostsPages(createPage, result.data.allMarkdownRemark.edges)
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
