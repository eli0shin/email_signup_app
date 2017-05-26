var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gulp = require('gulp');
var image = require('gulp-image');
var minifyCss = require("gulp-minify-css");
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//script paths
var jsFiles = ['public/javascripts/raw/jquery-3.2.1.min.js', 'public/javascripts/raw/script.js'],
    jsDest = 'public/javascripts';

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));

});

gulp.task('images', function() {
    gulp.src('public/images/raw/*')
        .pipe(image())
        .pipe(gulp.dest('public/images/'));
});

gulp.task('less', function() {
  gulp.src('public/less/theme.less')
    .pipe(less())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(minifyCss())
    .pipe(gulp.dest('public/stylesheets'));
});


gulp.task('watch', function() {
    gulp.watch('public/less/*.less', ['less']);
    gulp.watch('public/stylesheets/*.css', browserSync.reload);
    gulp.watch('public/javascripts/**/*.js', ['scripts'], browserSync.reload);
});
gulp.task('default', ['scripts', 'less', 'watch']);
