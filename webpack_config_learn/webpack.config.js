const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'index.html'
})
module.exports = {
  mode: 'production', // development production
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    htmlPlugin
  ]
}