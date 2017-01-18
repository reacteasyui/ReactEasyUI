'use strict';
var fs = require("fs"),
    path = require("path"),
    //_config = require('./config'),
    pagejs = "/js/page/";
var getEntry = function () {
    var jsPath = path.resolve("src" + pagejs);
    var dirs = fs.readdirSync(jsPath);
    var matchs = [],
        files = {},
        all = [];
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        var _path = '';
        if (matchs) {
            _path = path.resolve("src" + pagejs, item);
            files[matchs[1]] = _path;
            all.push(_path);
        }
    });
    return files;
}

//var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
//var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
var IgnorePlugin = require("webpack/lib/IgnorePlugin");

var config = {
    devtool: "source-map",
    entry: getEntry(),
    resolve: {
        alias: {},
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, "build" + pagejs), //文件输出目录
        filename: "[name].js",
        sourceMapFilename: "[file].map"
    },
    plugins: [
        new UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    //watch: true,
    module: {
        noParse: [],
        loaders: [{
            test: /\.js|jsx$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-1', 'react'],
                plugins: ["transform-es3-member-expression-literals", "transform-es3-property-literals"]
            }
        }]
    }
};
//console.log(config);
module.exports = config;