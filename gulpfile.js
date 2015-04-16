var gulp = require('gulp'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');

gulp.task('webserver', function() {
    connect.server({
        port: 8080,
        livereload: true,
        root: ['dist/']
    });
});

gulp.task('dev_webserver', function() {
    connect.server({
        port: 8080,
        livereload: true,
        root: ['src/']
    });
});

gulp.task('clean', function() {
    return gulp.src(['dist/*'], {read: false})
        .pipe(clean());
});

gulp.task('copy', function() {
    return gulp.src('src/*')
        .pipe(gulp.dest('dist/'))
        .pipe(notify({ message: 'copy task complete' }))
        .pipe(connect.reload());

});

gulp.task('reload', function() {
    return connect.reload();
});

gulp.task('watch', function() {
    gulp.watch('src/*', ['clean', 'copy']);
});

gulp.task('prod', ['clean', 'copy', 'webserver'], function() {
    console.log("== run server on localhost:8080 ==");
});

gulp.task('default', ['clean', 'dev_webserver', 'watch'], function() {
    console.log("== run server on localhost:8080 ==");
});
