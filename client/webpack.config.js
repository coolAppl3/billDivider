const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

process.env.NODE_ENV = 'production'

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: {
    index: './src/js/index.js',
    signUp: './src/js/signUp.js',
    signIn: './src/js/signIn.js',
    session: './src/js/session.js',
    history: './src/js/history.js',
  },

  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'js/[name]-[contenthash].js',
    clean: true,
    assetModuleFilename: (pathData) => {
      const { filename } = pathData;

      if (filename.endsWith('.woff') || filename.endsWith('.woff2') || filename.endsWith('.eot') || filename.endsWith('.ttf') || filename.endsWith('.otf')|| filename.endsWith('.otf'))  {
        return 'assets/fonts/[name][ext]';
      };

      if (filename.endsWith('.png') || filename.endsWith('.jpg') || filename.endsWith('.jpeg') || filename.endsWith('.gif') || filename.endsWith('.svg')) {
        return 'assets/images/[name][ext]';
      };

      return 'assets/[name][ext]';
    },
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, '../public'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  // performance: {
  //   hints: false,
  //   maxEntrypointSize: 512000,
  //   maxAssetSize: 512000
  // },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV === 'development'
          ? "style-loader"
          : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
      },

    ],
    
  },

  plugins: [
    new MiniCssExtractPlugin(),

    new CopyPlugin({
      patterns: [
        { from: "src/assets/font-licenses", to: "assets/LICENSES/font-licenses" },
      ],
    }),

    // index.html
    new HtmlWebpackPlugin({
      title: 'Home - Bill Divider',
      filename: 'index.html',
      template: 'src/html/index.html',

      chunks: [
        "index"
      ],
    }),

    // signUp.html
    new HtmlWebpackPlugin({
      title: 'Sign Up - Bill Divider',
      filename: 'signUp.html',
      template: 'src/html/signUp.html',

      chunks: [
        "signUp"
      ],
    }),

    // signIn.html
    new HtmlWebpackPlugin({
      title: 'Sign In - Bill Divider',
      filename: 'signIn.html',
      template: 'src/html/signIn.html',

      chunks: [
        "signIn"
      ],
    }),

    // session.html
    new HtmlWebpackPlugin({
      title: 'Session - Bill Divider',
      filename: 'session.html',
      template: 'src/html/session.html',

      chunks: [
        "session"
      ],
    }),

    // history.html
    new HtmlWebpackPlugin({
      title: 'History - Bill Divider',
      filename: 'history.html',
      template: 'src/html/history.html',

      chunks: [
        "history"
      ],
    }),

  ],
};