// 设定为生产环境
process.env.NODE_ENV = 'production';
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var baseWebpackConfig = require('./webpack.base.config');
var utils = require('./utils');
var config = require('./config');

var pages = ['web', 'admin'];   // 页面
var vendorPlugins = [];
if( pages.length > 0 ) {
    pages.map( np => {
        vendorPlugins.push(
            new webpack.optimize.CommonsChunkPlugin({
                name: np+'-vendor',
                chunks: [np],
                minChunks: function (module) {
                    return module.context && module.context.indexOf("node_modules") !== -1;
                }
            })
        )
    });
    vendorPlugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: pages.map( np => np+'-vendor' )
        })
    );
} else {
    vendorPlugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        })
    )
}

module.exports = merge(baseWebpackConfig, {
    output: {
        path: config.prod.outputPath,
        publicPath: config.prod.outputPublicPath,
        filename: 'js/[name].js?[chunkhash]'
    },
    module: {
        rules: utils.styleLoaders()
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({
            allChunks: true,
            filename: "css/[name].css?[contenthash:8]"
        }),
        ...vendorPlugins,

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        ...utils.genHtmlPlugins()
    ]
})
