module.exports = {
  outputDir: "../../../client_packages/cef",
  publicPath: process.env.NODE_ENV === 'production'
    ? 'package://cef'
    : '/'
};
