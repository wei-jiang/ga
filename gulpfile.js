//npm install --save-dev gulp gulp-concat gulp-minify-html gulp-minify-css gulp-uglify gulp-rename gulp-babel babel-preset-env merge-stream

const gulp = require('gulp')
    , fs = require("fs")
    , minifyHtml = require("gulp-minify-html")
    , concat = require('gulp-concat')
    , rename = require('gulp-rename')
    , uglify = require('gulp-uglify')
    , minifyCss = require("gulp-minify-css")
    , merge = require('merge-stream')
    , babel = require('gulp-babel')
    , sourcemaps = require('gulp-sourcemaps')
    , babel_env = require('babel-preset-env')
    ;

gulp.task('build', function () {
    return gulp.src([
        './ga.js', 'plugins.js'
    ]
        , { base: '.' })
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [babel_env]
        }))
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(rename(function (path) {
            // path.dirname += "";
            path.basename += ".min";
            // path.extname = ".js"
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});
gulp.task('build-all', function () {
    return gulp.src([
        './ga.js', 'plugins.js'
    ]
        , { base: '.' })
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [babel_env]
        }))
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(concat('ga.all.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});
gulp.task('default', ['build', 'build-all'], () => {

});