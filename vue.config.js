// vue.config.js
const path = require('path')
//npm install webpack-bundle-analyzer --save-dev  Bundle Analyzer插件的使用
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
//npm install compression-webpack-plugin -D
const CompressionPlugin = require('compression-webpack-plugin')// 引入gzip压缩插件
//首页骨架屏  npm install vue-skeleton-webpack-plugin 这是一个基于 Vue 的 webpack 插件，为单页/多页应用生成骨架屏 skeleton，减少白屏时间，在页面完全渲染之前提升用户感知体验。
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
// //是否是生产环境
// const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {

  publicPath: './',

  // 将构建好的文件输出到哪里
  outputDir: process.env.outputDir,

  // 放置生成的静态资源(js、css、img、fonts)的目录。
  assetsDir: 'static',

  // 指定生成的 index.html 的输出路径
  indexPath: 'index.html',

  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],

  // 生产环境关闭 source map
  productionSourceMap: false,
  
  // lintOnSave: true,
  
  //  配置是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    // 配置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
  
    config.optimization.minimizer('terser').tap((args) => {
      // 去除生产环境console
      args[0].terserOptions.compress.drop_console = true
      return args
    })
  },
  //相当于webpack 配置
   configureWebpack: (config) => {
	//首页骨架屏 减少白屏时间
    config.plugins.push(new SkeletonWebpackPlugin({
      webpackConfig: {
        entry: {
          app: path.join(__dirname, './src/common/entry-skeleton.js')
        },
        resolve: {
          extensions: ['.js', '.vue', '.json'],
          alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
          }
        },
      },
      
      minimize: true,
      quiet: true,
      // router: {
      //   mode: 'hash',
      //   routes: [
      //     { path: '/', skeletonId: 'skeleton1' },
      //     { path: '/about', skeletonId: 'skeleton2' }
      //   ]
      // }
    }))
	  process.env.BASE_URL =  process.env.VUE_APP_API_URL;
	if (process.env.VUE_APP_MODE === 'production') {
    
		//读取输出文件夹（通常是dist）中的stats.json文件，把该文件可视化展现的插件。
		//便于直观地比较各个bundle文件的大小，以达到优化性能的目的
	    config.plugins.push(new BundleAnalyzerPlugin())
	    //打包的时候开启gzip可以大大减少体积，非常适合于上线部署。vue中开启gzip。😄
	    config.plugins.push(new CompressionPlugin({ // gzip压缩配置
	      test: /\.js$|\.html$|\.css/, // 匹配文件名
	      threshold: 10240, // 对超过10kb的数据进行压缩
	      deleteOriginalAssets: false // 是否删除原文件
	    }))
	  }
	},
  
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    parallel: require('os').cpus().length > 1,
  
    // 向 PWA 插件传递选项。
    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
  
    devServer: {
	   host:'http://192.168.1.111',
      port: 8080, // 端口号
      https: false, // https:{type:Boolean}
      //open: false, // 配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌
      open: 'Google Chrome',
      proxy:'https://elm.cangdu.org',
    //  // 配置多个代理
    //   proxy: {
    //     '/api': {
    //       target: 'https://elm.cangdu.org',
    //       ws: true, // 代理的WebSockets
    //       changeOrigin: true, // 允许websockets跨域
    //       pathRewrite: {
    //         '^/api': ''
    //       }
    //     }
    //   }
    }
  }
  

