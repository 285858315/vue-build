var gulp = require('gulp')
var ejs = require("gulp-ejs")
var moment = require("moment")
var uglify = require('gulp-uglify')
var webpack = require('gulp-webpack')
var fs = require('fs-extra')
var connect = require('gulp-connect')
var httpProxy = require('http-proxy')


//---------------------------------------
//  Config
//---------------------------------------

var proxy = new httpProxy.createProxyServer({
  target: {
    host: '192.168.1.254',
    port: 80
  }
});
proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  }); 
  res.end('Something went wrong. And we are reporting a custom error message.');
});



var project = "";
var project_name = "shop"
var dir = {
    out:"../../public/shop/",
    src:"./" + project,
    public:"../../public"
}
fs.mkdirsSync(dir.out)

//---------------------------------------
//  Static
//---------------------------------------
gulp.task("static",function(){
    gulp.src(dir.src + "static/**")
        .pipe(gulp.dest(dir.out + 'static'));
})

//---------------------------------------
//  Html
//---------------------------------------
gulp.task("html",function(){
    gulp.src([dir.src + "*.html"])
        .pipe(ejs({
            version:moment().format("YYYYMMDDhhmmss"),
            r:Math.random(),
            base:"/" + project_name + "/"
        }))
        .pipe(gulp.dest(dir.out))
        .pipe(connect.reload())
})

//---------------------------------------
//  Webpack
//---------------------------------------
gulp.task('webpack', function() {
    //gulp.src([dir.src+'*.js',dir.src+'components/**',dir.src+'node_modules/**'])
    return gulp.src([dir.src+'*.js'])
        .pipe(webpack(require("./webpack.config.js")))
        // .pipe(uglify())
        .pipe(gulp.dest(dir.out))
        .pipe(connect.reload())
})

//---------------------------------------
//  Watch
//---------------------------------------
gulp.task('watch', function () {
    connect.server({
        root: dir.public,
        livereload: true,
        port:10000,
        host:"localhost",
        middleware: function(connect, opt) {
            return [            
                function(req,res,next){
                    var url = req.url
                    if(RegExp('/'+project_name+'/').test(url)){
                        if (/.js/.test(url) || /static/.test(url)) {
                        }else{
                            req.url = "/"+project_name+"/index.html"
                        }
                        next()
                    }else{
                        console.log(url)
                        proxy.web(req, res)
                    }
                }
            ]
        }
    })
    gulp.watch([dir.src+'*.html'],["html"])
    gulp.watch([dir.src + "static/**"],["static"])
    gulp.watch([dir.src+'*.js',dir.src+'components/**'],["webpack"])
})

//---------------------------------------
//  Default
//---------------------------------------
gulp.task("default",["watch","static","html","webpack"])