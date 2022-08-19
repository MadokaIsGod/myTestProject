module.exports = {
  outputDir: './build',
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
    hot: true //自动保存
  }
}
