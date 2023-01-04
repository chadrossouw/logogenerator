const path = require('path');
module.exports = {
	entry: './src/scripts/main.js',
	resolve: {
		modules: [path.resolve(__dirname, 'src/scripts'), 'node_modules'],
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
	output: {
		path: path.resolve(__dirname, '_site/js'),
		filename: 'main.js',
	},
};
