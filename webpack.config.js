const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: "./src/index.tsx",
	mode: "development",
	module: {
		rules: [
			{
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: ["ts-loader"]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: { presets: ["@babel/env", "@babel/react"] }
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
		]
	},
	resolve: { extensions: ["*", ".js", ".jsx", ".tsx", ".ts"] },
	output: {
		path: path.resolve(__dirname, "dist/"),
		publicPath: "/dist/",
		filename: "bundle.js"
	},
	devServer: {
		contentBase: path.join(__dirname, "public/"),
		port: 3000,
		publicPath: "http://localhost:3000/dist/",
		hotOnly: true
	},
	devtool: 'source-map',
	// externals: {
    //     "react": "react",
    //     "react-dom": "reactDOM"
    // },
	plugins: [new webpack.HotModuleReplacementPlugin()]
};