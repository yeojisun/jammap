const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/jjammap',
  chainWebpack: config => {
    config.module.rules.delete('eslint');
},
lintOnSave: false
})
