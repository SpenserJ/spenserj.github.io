/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const dateFormat = require('dateformat');
const { attachFields } = require(`gatsby-plugin-node-fields`)

const descriptors = [
  {
    predicate: node => (node.internal.type === 'Mdx'),
    fields: [
      {
        name: 'author',
        getter: node => node.frontmatter.author,
        defaultValue: 'Spenser Jones',
      },
      {
        name: 'date',
        getter: node => node.frontmatter.date,
      },
      {
        name: 'lastModified',
        getter: node => node.frontmatter.lastModified,
        defaultValue: node => node.frontmatter.date,
      },
      {
        name: 'slug',
        getter: node => {
          const { date: rawDate, title, slug: rawSlug } = node.frontmatter;
          const date = new Date(rawDate);
          const dateSlug = date
            ? dateFormat(date, 'yyyy-mm-dd')
            : '0000-00-00';
          const titleSlug = rawSlug
            || title.toLowerCase().replace(/[^a-z0-9\-]+/g, '-');
          return `/posts/${dateSlug}-${titleSlug}/`;
        },
      },
    ],
  }
];

exports.onCreateNode = ({ node, actions, getNode }) => {
  attachFields(node, actions, getNode, descriptors);
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const blogPosts = await graphql(`
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
  `);
  if (blogPosts.errors) { throw blogPosts.errors; }

  blogPosts.data.allMdx.nodes.forEach(post => {
    createPage({
      path: post.fields.slug,
      component: path.resolve('src/templates/BlogPost/index.jsx'),
      context: { slug: post.fields.slug },
    });
  });

  const postsPerPage = 10;
  const numPages = Math.ceil(blogPosts.data.allMdx.nodes.length / postsPerPage);
  for (let i = 0; i < numPages; i += 1) {
    createPage({
      path: i === 0 ? '/' : `/blog/${i + 1}`,
      component: path.resolve('./src/templates/BlogList/index.jsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  }
};
