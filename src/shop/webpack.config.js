var webpack = require("webpack")
// var autoprefixer = require('autoprefixer-core');
// var csswring     = require('csswring');

module.exports = {
    entry:{
        main:'./main.js'
    },
    output: {
        path:__dirname+'../public/shop/',
        publicPath:'../shop/',
        filename: "main.js",
        // chunkFilename: "[id].js"
    },
    module: {
        loaders: [
           { test: /\.css$/, loader: "style!css" },
           { test: /\.html$/, loader: "html"}   
          // { test: /\.html$/, loader: "./ejs-loader-to-html?name=[name].[ext]&a="+Date.now()}   
        //    { test: /\.html$/, loader: "file?name=[name].[ext]" }
        ]
    },
    // cssnext: {
    //     browsers: "last 2 versions",
    //     minimize:true,
    //     sourceMap:true
    // },
    // postcss:function(){
    //     // return [autoprefixer,csswring]
    //     return [postcssfor]
    // },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: true,
        //     compress: {
        //         warnings: false
        //     }
        // })
    ],
    devtool: 'source-map'
}