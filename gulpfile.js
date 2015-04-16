var gulp = require('gulp'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    wait = require('gulp-wait');

gulp.task('webserver', function() {
    connect.server({
        port: 8080,
        livereload: true,
        root: ['dist/']
    });
});

gulp.task('clean', function() {
    return gulp.src(['dist/*'], {read: false})
        .pipe(clean());
});

gulp.task('copy', function() {
    return gulp.src('src/**')
        .pipe(gulp.dest('dist/'))
        .pipe(notify({ message: 'copy task complete' }));
});

gulp.task('reload', function() {
    return gulp.src('dist/*').pipe(wait(500)).pipe(connect.reload());
});

gulp.task('browserify', function() {
    return gulp.src('src/js/main.js')
        .pipe(browserify({
            insertGlobals : true
        }))
        .pipe(rename('build.js'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('common', ['clean', 'copy', 'browserify']);

gulp.task('watch', function() {
    gulp.watch('src/**', ['common', 'reload']);
});

gulp.task('default', ['common', 'webserver', 'watch'], function() {
    console.log("== run server on localhost:8080 ==");
});
