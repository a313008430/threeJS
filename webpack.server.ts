import path from "path";
import webpack from "webpack";
//自动生成Html
import HtmlWebpackPlugin from "html-webpack-plugin";
//清楚导出的时候删除原始目录
import { CleanWebpackPlugin } from "clean-webpack-plugin";

//TODO server 编译是在内存中进行的，所以性能会特别好

const config: webpack.Configuration = {
  mode: "production",
  entry: {
    app: "./src/index.tsx",
  },
  devtool: "#source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    //[name] 是entry里面的name
    filename: "[name].bundle.js",
  },
  plugins: [
    //生成Html
    new HtmlWebpackPlugin({
      template: "./index.html",
      title: "Output Management",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    //遍历的后缀，包括引用node模块的时候有js等都要加进来
    extensions: [".ts", ".tsx", ".js"],
  },
  performance: {
    //webpack提示
    hints: false,
  },
};

export default config;
