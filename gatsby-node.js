/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const dateFormat = require('dateformat');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'Mdx') {
    const { date: rawDate, title, slug: rawSlug } = node.frontmatter;
    const date = new Date(rawDate);
    const dateSlug = date
      ? dateFormat(date, 'yyyy-mm-dd')
      : '0000-00-00';
    const titleSlug = rawSlug
      || title.toLowerCase().replace(/[^a-z0-9\-]+/g, '-');
    createNodeField({
      name: 'slug',
      node,
      value: `/posts/${dateSlug}-${titleSlug}`,
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve('src/templates/BlogPost/index.jsx');

  return graphql(`
    {
      allMdx(
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        nodes {
          fields { slug }
          frontmatter { title }
        }
      }
    }
  `).then(result => {
    if (result.errors) { throw result.errors; }
    const posts = result.data.allMdx.nodes;
    posts.forEach(post => {
      createPage({
        path: post.fields.slug,
        component: blogPostTemplate,
        context: { slug: post.fields.slug },
      });
    });
  });
};
