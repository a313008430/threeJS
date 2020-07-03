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
		app: "./app/app.ts",
	},
	devtool: "eval",
	// devtool: "source-map",
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
				test: /\.ts?$/,
				use: "ts-loader",
			},
			{
				test: /\.(png|svg|jpg|gif|glb|fbx|bin|gltf|jpeg)$/,
				loader: "file-loader",
				options: {
					outputPath: "res",
				},
			},
			{
				test: /\.s[ac]ss$/i,
				// test: /\.css$/,
				// use: ["style-loader", "css-loader"],
				//分离css
				use: [
					//TODO loader的顺序很重要，不然报错。。。。
					// MiniCssExtractPlugin.loader, //css分离 用 分离时 style-loader 这个不能用
					"style-loader", // 将 JS 字符串生成为 style 节点
					"css-loader", // 将 CSS 转化成 CommonJS 模块
					"sass-loader", // 将 Sass 编译成 CSS
				],
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
