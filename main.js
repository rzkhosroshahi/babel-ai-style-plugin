const shortid = require('shortid');
const GetCss = require('./src/helpers/getCss')
const fs = require('fs')

// babel-ai-style-plugin
module.exports = function (babel) {
  const t = babel.types
  return {
    pre() {
      this.className = shortid()
    },
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value.includes('aiCss')) {
          path.remove();
        }
      },
      CallExpression(path) {
        if (path.node.callee.name !== 'aiCss') {
          return
        }
        const className = this.className
        path.traverse({
          TemplateLiteral(path) {
            if (path.node.quasis && path.node.quasis.length) {
              const description = path.node.quasis[0].value.raw;
              GetCss(description, className)
                  .then((style) => {
                    fs.writeFileSync('./client/style.css', style)
                  })
            }
          },
        })
        path.remove();
      },
      JSXAttribute(path) {
        const className = this.className

        path.traverse({
          Identifier(path) {
            path.replaceWith(t.stringLiteral(className))
          }
        })
      },
    },
  }
}
