const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var package     = require('./package.json');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: "./src/scripts/index.js",
    vendor: Object.keys(package.dependencies),
    settings: "./src/scripts/settings.js"
  },
  output: {
    filename: "[name].bundle.js" ,
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    fs: 'empty', module: 'empty'
  },
  watch:false,
  devServer: {
    contentBase: './dist',
    open: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        title: 'Garagens Online',
        myPageHeader: 'Garagens',
        description: 'Entre e comece já!',
        template: './src/index.html',
        chunks: ['vendor', 'app'],
        filename: 'index.html',
        path: path.resolve(__dirname, 'dist'),
    }),
    new HtmlWebpackPlugin({
        hash: true,
        title: 'My Awesome application',
        myPageHeader: 'Settings',
        template: './src/index.html',
        chunks: ['vendor', 'settings'],
        filename: 'settings.html',
        path: path.resolve(__dirname, 'dist'),
    }),
    //new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test:/\.(s*)css$/,
        use:['style-loader',MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|ico|gif|jp(e*)g|svg)$/,  
        use: [{
            loader: 'url-loader',
            options: { 
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
            } 
        }]
      },
    ],
  },
};