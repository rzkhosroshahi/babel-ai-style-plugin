// babel-ai-style-plugin

module.exports = function (babel) {
  return {
    visitor: {
      TemplateLiteral: function (path) {
        console.log('path >>', path);
      }
    },
  }
}
