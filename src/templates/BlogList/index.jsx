import React from "react"
import { Link, graphql } from "gatsby"
import dateFormat from 'dateformat';

import Layout from "../../components/Layout"
import SEO from "../../components/SEO"

export default ({ data, pageContext }) => (
  <Layout>
    <SEO title="Recent Posts" />
    <h1>Recent Posts</h1>
    {data.allMdx.nodes.map((post) => (
      <React.Fragment key={post.id}>
        <Link to={post.fields.slug}>
          <h2>{post.frontmatter.title}</h2>
        </Link>
        <time
          dateTime={dateFormat(post.frontmatter.date, 'yyyy-mm-dd')}
        >
          {dateFormat(post.frontmatter.date, 'dddd, mmmm dS, yyyy')}
        </time>
        <p>{post.excerpt}</p>
      </React.Fragment>
    ))}
    {pageContext.currentPage === 1 ? null : (
      <Link
        to={pageContext.currentPage === 2 ? '/' : `/blog/${pageContext.currentPage - 1}`}
      >
        Newer Posts
      </Link>
    )}
    {pageContext.currentPage > 1 && pageContext.currentPage < pageContext.numPages
      ? <>&nbsp;</> : null}
    {pageContext.currentPage === pageContext.numPages ? null : (
      <Link to={`/blog/${pageContext.currentPage + 1}`}>Older Posts</Link>
    )}
  </Layout>
);

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date
        }
        fields {
          slug
        }
      }
    }
  }
`;
