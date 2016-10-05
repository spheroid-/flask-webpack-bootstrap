var webpack = require('webpack'),
    webpackDevServer = require('webpack-dev-server');

var config = require("./webpack.config.js");

console.log(config);

config.entry['app'].unshift('webpack/hot/dev-server');
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
    stats: {
        colors: true
    },
    hot: true,
    contentBase: '.',
    publicPath: '/public/'
});

server.listen(8080);
