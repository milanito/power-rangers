import React from 'react'
import Helmet from 'react-helmet'
import { compose, withProps } from 'recompose'
import { StaticQuery, graphql } from 'gatsby'
import { isEmpty, join, map, get } from 'lodash'

import MAIN_STYLE from './main.style.js'

const SEO_QUERY = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`

const LINKS = ['https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.css']

const SCRIPTS = ['https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.js']

const META_DATA = [{
  name: 'description',
  content: 'metaDescription'
},
{
  property: 'og:title',
  content: 'title'
},
{
  property: 'og:description',
  content: 'metaDescription'
},
{
  property: 'og:type',
  content: 'website'
},
{
  name: 'twitter:card',
  content: 'summary'
},
{
  name: 'twitter:creator',
  content: 'author'
},
{
  name: 'twitter:title',
  content: 'title'
},
{
  name: 'twitter:description',
  content: 'metaDescription'
}]

const constructKeywords = keywords =>
  !isEmpty(keywords) ? [{ name: 'keywords', content: join(keywords, ', ') }] : []

const metaBuilder = (keywords, meta, props) => [...map(META_DATA, ({ name, content }) => ({
  name,
  content: get(props, content, content)
})), ...constructKeywords(keywords), ...meta]

const SEO = ({
  description, title, titleTemplate, author, metaDescription, htmlAttributes,
  keywords = [], meta = []
}) => (
  <Helmet
    title={title}
    titleTemplate={titleTemplate}
    htmlAttributes={htmlAttributes}
    style={MAIN_STYLE}
    link={map(LINKS, href => ({ rel: 'stylesheet', href }))}
    script={map(SCRIPTS, src => ({ type: 'text/javascript', src }))}
    meta={metaBuilder(keywords, meta, { title, metaDescription, author })}
  />
)

const ComposedSEO = compose(withProps(({ description, data: { site }, lang = 'en' }) => ({
  htmlAttributes: { lang },
  author: site.siteMetadata.author,
  titleTemplate: `%s | ${site.siteMetadata.title}`,
  metaDescription: description || site.siteMetadata.description
})))(SEO)

export default props => (
  <StaticQuery
    query={SEO_QUERY}
    render={data => <ComposedSEO data={data} {...props} />}
  />
)
