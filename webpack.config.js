var path = require('path');

module.exports = {

	//エントリポイントのJavaScript
	entry: {
		"option": './dev/js/option/option.js',
		"action": './dev/js/action/action.js'

	},
	mode: "development",
	devtool: false,
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, './js/'),
	},
	module: {
		// rules: [
		//     {
		//         // 拡張子 .js の場合
		//         test: /\.js$/,
		//         use: [
		//             {
		//                 // Babel を利用する
		//                 loader: 'babel-loader',
		//                 // Babel のオプションを指定する
		//                 options: {
		//                     presets: [
		//                         // env を指定することで、ES2017 を ES5 に変換。
		//                         // {modules: false}にしないと import 文が Babel によって CommonJS に変換され、
		//                         // webpack の Tree Shaking 機能が使えない
		//                         ['env', {'modules': false}]
		//                     ]
		//                 }
		//             }
		//         ]
		//     }
		// ]
	}

};