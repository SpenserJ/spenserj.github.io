import React from "react"
import { Link, graphql } from "gatsby"
import dateFormat from 'dateformat';

import Layout from "../components/Layout"
import SEO from "../components/seo"

export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Recent Posts</h1>
    {data.allMdx.nodes.map((post) => (
      <React.Fragment key={post.id}>
        <Link to={post.fields.slug}>
          <h2>{post.frontmatter.title}</h2>
        </Link>
        <time
          datetime={dateFormat(post.frontmatter.date, 'yyyy-mm-dd')}
        >
          {dateFormat(post.frontmatter.date, 'dddd, mmmm dS, yyyy')}
        </time>
        <p>{post.excerpt}</p>
      </React.Fragment>
    ))}
  </Layout>
);

export const query = graphql`
  query SITE_INDEX_QUERY {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
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
