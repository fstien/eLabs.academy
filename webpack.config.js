
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const path = require('path');

const navFront = {
  entry: "./src/browser/navFront.js",
  output: {
    path: __dirname,
    filename: "./public/navFront.js"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, "")
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: { importLoaders: 1 }
            },
            {
              loader: "postcss-loader",
              options: { plugins: [autoprefixer()] }
            }
          ]
        })
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "public/css/[name].css"
    }),
    new webpack.BannerPlugin({
      banner: "__isBrowser__ = true;",
      raw: true,
      include: /\.js$/
    }),



    
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    




    new webpack.optimize.DedupePlugin(), //dedupe similar code 
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
  ]
};


const SolowFront = {
  entry: "./src/browser/course/solowFront.js",
  output: {
    path: __dirname,
    filename: "./public/solowFront.js"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, "")
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: { importLoaders: 1 }
            },
            {
              loader: "postcss-loader",
              options: { plugins: [autoprefixer()] }
            }
          ]
        })
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "public/css/[name].css"
    }),
    new webpack.BannerPlugin({
      banner: "__isBrowser__ = true;",
      raw: true,
      include: /\.js$/
    }),
    


    
    
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    
    
    new webpack.optimize.DedupePlugin(), //dedupe similar code 
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    
    






    new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
  ]
};



const serverConfig = {
  entry: "./src/server/server.js",
  target: "node",
  output: {
    path: __dirname,
    filename: "server.js",
    libraryTarget: "commonjs2"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, ""),
          emit: false
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader/locals"
          }
        ]
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: "__isBrowser__ = false;",
      raw: true,
      include: /\.js$/
    }),




    
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    //new webpack.optimize.UglifyJsPlugin(), //minify everything
    
    





    new webpack.optimize.DedupePlugin(), //dedupe similar code 
    new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
  ],
};


module.exports = [navFront, SolowFront, serverConfig];

