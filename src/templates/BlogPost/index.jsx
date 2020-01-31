import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import dateFormat from 'dateformat';

import SEO from "../../components/SEO"
import Layout from '../../components/Layout';

export default ({ data }) => {
  const { frontmatter, body } = data.mdx;
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <h1>{frontmatter.title}</h1>
      <time
        datetime={dateFormat(frontmatter.date, 'yyyy-mm-dd')}
      >
        {dateFormat(frontmatter.date, 'dddd, mmmm dS, yyyy')}
      </time>
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  );
};

export const query = graphql`
  query PostsBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date
      }
    }
  }
`;
