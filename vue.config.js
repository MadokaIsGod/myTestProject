module.exports = {
  outputDir: './build',
  // publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  },
  devServer: {
    port: 8080,
    open: true,
    hot: true, //自动保存
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
}
