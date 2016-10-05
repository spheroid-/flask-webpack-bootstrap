var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    ManifestRevisionPlugin = require('manifest-revision-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

var rootAssetPath = './assets',
    buildOutputPath = './build/public',
    publicPath = '/public/';

var IS_DEV = (path.basename(require.main.filename) === 'webpack-dev-server.js');

var config = {
    entry: {
        'main': [
            rootAssetPath + '/scripts/main.js',
            rootAssetPath + '/styles/main.scss'
        ]
    },

    output: {
        path: path.resolve(__dirname, buildOutputPath),
        publicPath: publicPath,
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.scss$/i,
                loader: 'style!css!sass'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file?context=' + rootAssetPath + '&name=[path][name].[hash].[ext]'
            },
            {
                test: /\.(woff2?|ttf|eot)$/i,
                loader: 'file?context=' + rootAssetPath + '&name=[path][name].[hash].[ext]'
            }
        ],
    },

    plugins: [
        new ManifestRevisionPlugin('build/manifest.json', {
            rootAssetPath: rootAssetPath,
            ignorePaths: ['/styles', '/scripts']
        })
    ]
};

if (IS_DEV) {
    config.devServer = {
        host: 'localhost',
        port: 2992
    };

    config.output.publicPath = 'http://' + config.devServer.host + ':' + config.devServer.port + config.output.publicPath;
} else {
    var extractSASS = new ExtractTextPlugin("[name].[contenthash].css");

    config.output.filename = '[name].[chunkhash].js';

    config.plugins.push(
        extractSASS,
        new CleanWebpackPlugin('build/public')
    );

    config.module.loaders.forEach(function(item) {
        if (item.test.test('.scss')) {
          delete item.loaders;
          item.loader = extractSASS.extract('css!sass');
        }
    });
}

module.exports = config;
