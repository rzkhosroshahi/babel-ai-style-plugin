const shortid = require('shortid');
const GetCss = require('./src/helpers/getCss')
const fs = require('fs')

// babel-ai-style-plugin
module.exports = function (babel) {
  const t = babel.types
  return {
    pre() {
      this.cache = new Map()
    },
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value.includes('aiCss')) {
          path.remove();
        }
      },
      VariableDeclarator(path) {
        if (path.node.init.type !== 'CallExpression' ||
            path.node.init.callee?.name !== 'aiCss'
        ) {
          return
        }

        const identifierName = path.node.id.name
        const className = `ai-${shortid()}`
        path.traverse({
          TemplateLiteral: (path) => {
            if (path.node.quasis && path.node.quasis.length) {
              const description = path.node.quasis[0].value.raw;
              this.cache.set(identifierName, { description, className })
            }
          },
        })
        path.remove();
      },
      JSXAttribute(path) {
        this.cache.forEach(() => {
          path.traverse({
            Identifier: (path) => {
              if (this.cache.has(path.node.name)) {
                const { className } = this.cache.get(path.node.name)
                path.replaceWith(t.stringLiteral(className))
              }
            }
          })
        })
      },
    },
    post() {
      buildCssFile(this.cache)
    }
  }
}

function buildCssFile(cache) {
  let styles = ''
  async function turnsDescriptionsToCss() {
    await Promise.all(Array.from(cache).map(async ([,value]) => {
      const style = await GetCss(value.description, value.className)
      styles += `\n ${style}`;
    }));
  }

  turnsDescriptionsToCss().then(() => {
    fs.writeFileSync('./client/style.css', styles)
  })
}
