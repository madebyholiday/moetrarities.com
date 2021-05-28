const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const {
  NODE_ENV
} = process.env

module.exports = {
  entry: {
    app: './source/js/Application.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'app/public/assets/static/js')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/[name].[contenthash].css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CleanWebpackPlugin({
      dry: false,
      dangerouslyAllowCleanPatternsOutsideProject: true,
      cleanOnceBeforeBuildPatterns: [
        path.resolve(__dirname, 'app/public/assets/static/js/*'),
        path.resolve(__dirname, 'app/public/assets/static/css/*')
      ]
    }),
    new WebpackManifestPlugin({
      fileName: path.resolve(__dirname, 'app/public/assets/manifest.json'),
      publicPath: '',
      filter: f => {
        return !f.name.match(/\.html$/)
      },
      map: f => {        
        if ( f.name.match(/\.css$/) ) {
          f.path = f.path.replace('../css', 'static/css')
        }
        
        if ( f.name.match(/\.js$/) )
          f.path = 'static/js/' + f.path
        
        return f
      }
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'app/templates/partials/_bundle.html'),
      inject: false,
      publicPath: '',
      template: 'source/templates/bundle.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!load-google-maps-api)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'source-map-loader'
          }
        ]
      },          
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: NODE_ENV == 'production' ? 'compressed' : 'nested',
                includePaths: [
                  'node_modules/slick-carousel/slick'
                ]
              }              
            }
          }
        ]
      },
      {
        test: /\.modernizrrc.js$/,
        use: 'modernizr-loader'
      },
      {
        test: /\.modernizrrc(\.json)?$/,
        use: [ 'modernizr-loader', 'json-loader' ]
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  performance: {
    hints: false
  },
  mode: NODE_ENV,
  watch: NODE_ENV == 'development',
  resolve: {
    alias: {
      "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
      "preload-it": path.resolve(__dirname, "source/js/ext/preload-it.js"),
      modernizr$: path.resolve(__dirname, '.modernizrrc'),
      'application.scss': path.resolve(__dirname, 'source/scss/application.scss')
    },
    modules: [
      path.resolve(__dirname, 'source/js'),
      path.resolve(__dirname, 'source/css'),
      'node_modules'
    ]
  }
}
