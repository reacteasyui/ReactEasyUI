'use strict';
var fs = require("fs"),
    path = require("path"),
    //_config = require('./config'),
    pagejs = "/js/page/";
//var lib = ["react","react-dom"];
var getEntry = function () {
    var jsPath = path.resolve("src" + pagejs);
    //console.log(jsPath);
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
    //files["common"] = lib;
    return files;
}

//var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
//var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
//var NoErrorsPlugin = require("webpack/lib/NoErrorsPlugin");
var IgnorePlugin = require("webpack/lib/IgnorePlugin");

var config = {
    //devtool: "source-map",
    entry: getEntry(),
    resolve: {
        alias: {},
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, "dev" + pagejs), //文件输出目录
        //publicPath: "build" + pagejs,
        filename: "[name].js"
    },
    //watch:true,
    //debug:true,
    module: {
        noParse: [],
        loaders: [{
            test: /\.js|jsx$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'stage-1', 'react'],
                plugins: ["transform-es3-member-expression-literals", "transform-es3-property-literals"],
                compact: false
            }
        }]
    }
};
var node_modules_dir = path.join(__dirname, 'node_modules');
//var deps = [
//	'src/js/lib/react/react.js',
//	'src/js/lib/react/react-dom.js',
//];
var deps = [
    'react/dist/react.min.js',
    'react-dom/dist/react-dom.min.js',
    'react-router/dist/react-router.min.js',
];
deps.forEach(function (dep) {
    var depPath = path.resolve(node_modules_dir, dep);
    //config.resolve.alias[dep.split(path.sep)[0]] = depPath;
    config.module.noParse.push(depPath);
});
//console.log(config);
module.exports = config;