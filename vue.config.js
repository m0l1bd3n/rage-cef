const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "../../client_packages/cef",
  publicPath: process.env.NODE_ENV === "production" ? "package://cef" : "/",
})
