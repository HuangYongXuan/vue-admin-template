/**
 * @module		vue cli 配置文件
 * @author      nayo
 * @date        2020/7/29 11:09 上午
 * @version     1.0
 */
const HappyPack = require('happypack');
const os = require('os');
let happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

const assetsCDN = {
	// main.js里引入了对应的less以使 webpack-theme-color-replacer工作
	css: [
		'https://cdn.jsdelivr.net/npm/element-ui@2.13.2/lib/theme-chalk/index.css'
	],
	js: [
		'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
		'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
		'https://cdn.jsdelivr.net/npm/vue-router@3.3.4/dist/vue-router.min.js',
		'https://cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex.min.js',
		'https://cdn.jsdelivr.net/npm/element-ui@2.13.2/lib/element-ui.common.min.js'
	]
};

module.exports = {
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
			config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
			config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
			config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log', 'console.info'];

			config.externals = {
				'vue': 'Vue',
				'axios': 'axios',
				'vue-router': 'VueRouter',
				'vuex': 'Vuex',
				'element-ui': 'ElementUi'
			};
		}
		config.plugins.push(new HappyPack({
			id: 'babel',
			loaders: ['babel-loader?cacheDirectory=true'],
			threadPool: happyThreadPool
		}));
		config.resolve.extensions = ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'];
		config.module.rules.push({
			test: /\.tsx?$/,
			loader: 'ts-loader',
			exclude: /node_modules/,
			options: {
				appendTsSuffixTo: [/\.vue$/]
			}
		});
	},
	chainWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			config.plugin('html').tap(args => {
				args[0].cdn = assetsCDN;
				return args;
			});
		} else {
			config.plugin('html').tap(args => {
				args[0].cdn = {css: [], js: []};
				return args;
			});
		}
	},
	devServer: {
		port: 9000,
		open: process.platform === 'darwin',
		https: false,
		hotOnly: false,
		proxy: {
			'/api': {
				target: process.env.VUE_APP_BASE_API_URL,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
	publicPath: process.env.VUE_APP_PUBLICE_PATH,
	outputDir: process.env.VUE_APP_OUTPUT_DIR,
	runtimeCompiler: true,
	productionSourceMap: false
};
