import { graphql } from "gatsby"
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Helmet from "react-helmet"
import React from 'react';
import dateFormat from 'dateformat';

import SEO from "../../components/SEO"
import * as Schema from '../../components/SEO/SchemaOrg';
import Layout from '../../components/Layout';
import imageSpenser from '../../images/spenserj.jpg';

const BlogSEO = ({ post, site }) => {
  const meta = [
    { property: 'og:type', content: 'article' },
    { property: 'article:author', content: post.fields.author || site.siteMetadata.author },
    { property: 'article:published_time', content: post.fields.date },
  ];

  const schema = {
    '@context': 'http://schema.org',
    '@type': 'Blog',
    blogPost: {
      '@type': 'BlogPosting',
      author: Schema.organizationRef,
      publisher: Schema.organizationRef,
      headline: post.frontmatter.title,
      mainEntityOfPage: `https://spenserj.com${post.slug}`,
      datePublished: post.fields.date,
      dateModified: post.fields.lastModified,
      image: imageSpenser,
    }
  };

  if (post.excerpt) {
    meta.push({ name: 'description', content: post.excerpt });
    meta.push({ property: 'og:description', content: post.excerpt });
  }
  if (post.frontmatter.tags) {
    meta.push({ property: 'article:tag', content: post.frontmatter.tags });
    schema.blogPost.keywords = post.frontmatter.tags.join(', ');
  }

  return (
    <Helmet meta={meta}>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
};

export default ({ data }) => {
  const post = data.mdx;
  const { fields, frontmatter, body, excerpt } = post;
  return (
    <Layout>
      <SEO title={frontmatter.title} description={excerpt} />
      <BlogSEO post={post} site={data.site} />
      <h1>{frontmatter.title}</h1>
      <time
        dateTime={dateFormat(fields.date, 'yyyy-mm-dd')}
      >
        {dateFormat(fields.date, 'dddd, mmmm dS, yyyy')}
      </time>
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  );
};

export const query = graphql`
  query PostsBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        slug
        date
        lastModified
        author
      }
      body
      excerpt(pruneLength: 150)
      frontmatter {
        title
        author
        tags
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`;
