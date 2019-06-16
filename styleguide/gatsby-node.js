const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');

const pageTemplate = path.resolve(__dirname, './src/components/page.js');

exports.onCreateNode = ({node, getNode, actions}) => {
  if (node.internal.type === 'MarkdownRemark') {
    const route = createFilePath({node, getNode});
    const group = route.split('/')[1];
    const isReadme = /\/readme.md/i.test(node.fileAbsolutePath);

    actions.createNodeField({node, name: 'route', value: route});
    actions.createNodeField({node, name: 'group', value: group});
    actions.createNodeField({node, name: 'isReadme', value: isReadme});
  }
};

exports.createPages = ({graphql, actions}) => {
  return new Promise((resolve, reject) => {
    graphql(
      `{
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                route
                isReadme
              }
            }
          }
        }
      }`
    ).then(result => {
      if (result.errors) reject(result.errors);

      result.data.allMarkdownRemark.edges.forEach(({node}) => {
        if (node.fields.isReadme) return;

        actions.createPage({
          path: node.fields.route,
          component: pageTemplate,
          context: {}
        });
      });

      resolve();
    });
  });
};

exports.onCreateWebpackConfig = ({stage, actions, loaders}) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            // CodeMirror refers to some browser globals which are
            // unavailable during the static rendering phase. This
            // rule tells Webpack not to try to load it during this
            // phase. See: https://www.gatsbyjs.org/docs/debugging-html-builds
            test: /node_modules\/codemirror/,
            use: loaders.null(),
          }
        ]
      }
    });
  }

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          // PUI CSS files (.css) are generated when PUI is built for
          // production - they're not available during development.
          // Here, we tell Webpack to not try to load the CSS. Instead,
          // we import PUI .scss files directly elsewhere.
          test: /\/src\/css\/.*index.js$/,
          use: loaders.null()
        }
      ]
    }
  });
};