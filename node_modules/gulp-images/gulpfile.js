var gulp = require('gulp'), images = require('./app.js');


gulp.task('default', function(){
    return gulp.src('images/*').pipe(images()).pipe(gulp.dest('build'));
});