

function cssLoader (options) {
  options = options || {}
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }
  

  const vueStyleLoader = {
    loader: 'vue-style-loader',
    options: {
    }
  }


  function generateCssLoader(loader, loaderOptions) {
    loaderOptions = loaderOptions || {}
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : []
    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: {
          ...loaderOptions,
          sourceMap: options.sourceMap
        }
      })
    }
    
    return [vueStyleLoader].concat(loaders)
  }

  return {
    css: generateCssLoader('postcss'),
    stylus: generateCssLoader('stylus'),
    styl: generateCssLoader('stylus')
  }
}

function styleLoader(options) {
  const output = []
  const loaders = cssLoader(options)

  for (const key in loaders) {
    const loader = loaders[key]
    output.push({
      test: new RegExp('\\.' + key + '$'),
      use: loader
    })
  }
  console.log(output)
  return output
}

module.exports = {
  styleLoader
}