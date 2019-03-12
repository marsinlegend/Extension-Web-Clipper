const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackChromeReloaderPlugin = require('webpack-chrome-extension-reloader');
const tsImportPluginFactory = require('ts-import-plugin');
const WebpackCreateExtensionManifestPlugin = require('webpack-create-extension-manifest-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const baseConfig = {
  entry: {
    background: resolve('src/background/index.ts'),
    tool: resolve('src/pages/app.tsx'),
    content_script: resolve('src/content/index.tsx')
  },
  output: {
    path: resolve('dist/js'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [tsImportPluginFactory({ style: true })]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        },
        exclude: /node_modules/
      },
      {
        include: /hypermd|codemirror/,
        test: [/\.css$/],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=1024000'
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        exclude: /node_modules/,
        test: [/\.scss$/, /\.css$/],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss', 'less']
  },
  plugins: [
    process.env.NODE_ENV === 'development'
      ? new WebpackChromeReloaderPlugin({
        reloadPage: false,
        entries: {
          contentScript: 'content_script',
          background: 'background'
        }
      })
      : null,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: true
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('chrome'),
        to: resolve('dist'),
        ignore: ['.*']
      }
    ]),
    new WebpackCreateExtensionManifestPlugin({
      output: resolve('dist/manifest.json'),
      extra: { name: '语雀剪藏' }
    }),
    new HtmlWebpackPlugin({
      title: '语雀剪藏插件',
      filename: '../tool.html',
      chunks: ['tool']
    })
  ].filter(plugin => !!plugin)
};

module.exports = baseConfig;
