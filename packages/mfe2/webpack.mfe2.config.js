const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mfe2 =  {
  entry: "./src/main",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist/mfe2"),
    port: 3001
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },        
    ],
  },    
  output: {
      publicPath: "http://localhost:3001/",
      path: path.join(__dirname, "dist/mfe2"),
      filename: '[name].js'
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },  
  plugins: [
    new MiniCssExtractPlugin(),
    new ModuleFederationPlugin({
      name: "mfe2",
      library: { type: "var", name: "mfe2" },
      filename: "remoteEntry.js",
      exposes: {
        "./component": "./src/component"
      },
      // shared: ["rxjs", "useless-lib"]
      // shared: { 
      //   "rxjs": {},
      //   "useless-lib": ">=1.0.0 <3.0.0" 
      // }
      // shared: { 
      //   "rxjs": {},
      //   "useless-lib": {
      //     singleton: true
      //   } 
      // }
      // shared: { 
      //   "rxjs": {},
      //   "useless-lib": {
      //     singleton: true,
      //     strictVersion: true,
      //     // version: ">=1.0.0"
      //   } 
      // },
      shared: { 
        "rxjs": {},
        "useless-lib": {
          shareScope: "other",
          singleton: true
        } 
      }
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
  ]    
};

module.exports = mfe2;