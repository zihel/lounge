"use strict";

const webpack = require("webpack");
const path = require("path");
const isWatch = process.argv.includes("--watch");

let config = {
	entry: {
		"js/bundle.js": path.resolve(__dirname, "client/js/lounge.js"),
		"js/bundle.vendor.js": [
			"handlebars/runtime",
			"jquery",
			"jquery-ui/ui/widgets/sortable",
			"mousetrap",
			"socket.io-client",
			"urijs",
		],
	},
	devtool: "source-map",
	output: {
		path: path.resolve(__dirname, "client"),
		filename: "[name]",
		publicPath: "/"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, "client"),
				],
				loader: "babel",
				query: {
					presets: [
						"es2015"
					]
				}
			},
			{
				test: /\.tpl$/,
				include: [
					path.resolve(__dirname, "client/views"),
				],
				loader: "handlebars-loader",
				query: {
					helperDirs: [
						path.resolve(__dirname, "client/js/libs/handlebars")
					],
					extensions: [
						".tpl"
					],
				}
			},
		]
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.CommonsChunkPlugin("js/bundle.vendor.js"),
	]
};

if (!isWatch) {
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		comments: false,
		compress: {
			warnings: false
		}
	}));
}

module.exports = config;
