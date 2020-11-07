const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const shell = {
  entry: ["./src/main", "./src/styles.css"],
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist/shell"),
    port: 5000
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
  resolve: {
    extensions: [ '.ts', '.js' ],
  },  
  output: {
    publicPath: "http://localhost:5000/",
    path: path.join(__dirname, "dist/shell"),
    filename: '[name].js'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new ModuleFederationPlugin({
      name: "shell",
      library: { type: "var", name: "shell" },
      remotes: {
        "mfe1": "mfe1",
        "mfe2": { external: "mfe2", shareScope: "other"},
        "mfe3": { external: "mfe3", shareScope: "other"},
      },
      // shared: ["rxjs", "useless-lib"]
      // shared: { 
      //   "rxjs": {}, 
      //   "useless-lib": {
      //     singleton: true,
      //   }
      // },
      // shared: { 
      //   "rxjs": {}, 
      //   "useless-lib": {
      //     singleton: true,
      //     strictVersion: true,
      //   }
      // },
      shared: { 
        "rxjs": {}, 
        "useless-lib": {
          singleton: true,
          // shareScope: "other"
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};

module.exports = shell;