var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
let cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uncss = require('gulp-uncss');
var concat = require('gulp-concat');


gulp.task('css', function() {
    return gulp.src('app/css/**/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('app/css'));
});



gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('js/all.js'))
        .pipe(uglyfly())
        .pipe(gulp.dest('dist/'));
});


var sass = require('gulp-sass');
var browserSync = require('browser-sync');


gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
})

//gulp.task('sass', function() {
//  return gulp.src('app20/sass/**/*.scss')
//      .pipe(sass().on('error', sass.logError))
//    .pipe(concatCss("bundle.css"))
//    .pipe(gulp.dest('app20/css'));
//});


gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});