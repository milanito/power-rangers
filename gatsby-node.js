const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const { get, uniq, kebabCase, forEach, isEqual, reduce, map } = require('lodash')

const POSTS_QUERY = `
  {
    allTeamJson {
      edges {
        node {
          header
        }
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
      edges {
        node {
          frontmatter {
            path
            tags
            author
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

const createAuthorPages = (createPage, authors) =>
  forEach(authors, author => createPage({
    path: `/author/${author}/`,
    component: path.resolve(`src/templates/author-articles.js`),
    context: { author },
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

      createAuthorPages(createPage, map(result.data.allTeamJson.edges, ({ node }) =>
        get(node, 'header')))
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

exports.onCreateBabelConfig = ({ stage, actions }, pluginOptions) => {
  const ssr = isEqual(stage, 'build-html') || isEqual(stage, 'build-javascript')

  actions.setBabelPlugin({
    name: 'babel-plugin-styled-components',
    stage,
    options: { ...pluginOptions, ssr },
  })
}

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()

  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
}
