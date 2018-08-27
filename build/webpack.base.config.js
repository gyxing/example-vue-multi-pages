var webpack = require('webpack');
var path = require('path');
var utils = require('./utils');
var pages = require('./pages');

function resolve(relPath) {
    return path.resolve(__dirname, relPath);
}

function pageEntry() {
    var ret = {};
    pages.map(function(key) {
        ret[key] = resolve('../src/pages/'+key+'/main.js');
    });
    return ret;
}

module.exports = {
    entry: pageEntry(),
    output: {
        filename: 'js/[name].js',
        chunkFilename: "js/[name].[chunkhash].js"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('../src'),
            '~': resolve('../src/assets'),
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: "babel-loader",
            include: [resolve('../src')]
        },
            {
                test: /\.vue$/,
                use: {
                    loader: "vue-loader",
                    options: utils.vueLoaderOptions()
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: 'images/[name].[hash:7].[ext]'
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }]
            }
        ]
    }
}
