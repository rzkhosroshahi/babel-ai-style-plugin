const fs = require('fs')
const babel = require('@babel/core')
const babelPresetEnv = require('@babel/preset-env')
const babelPresetReact = require('@babel/preset-react')
// our plugin
const aiCssPlugin = require('./main')

// read the filename from the command line arguments
const fileName = process.argv[2]

babel.transformFileAsync(fileName, {
  presets: [babelPresetEnv, babelPresetReact],
  plugins: [aiCssPlugin]
}).then((output) => {
  fs.writeFileSync('./client/app.js', output.code)
})
