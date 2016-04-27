var gulp = require("gulp"),
	browserSync = require('browser-sync').create(),
	less = require('gulp-less'),
	path = require('path'),
	inject = require('gulp-inject');


gulp.task('browser-sync',['less-compile', 'inject'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        open: false,
    });
});

gulp.task('less-compile', function(){
	return gulp.src('./src/less/bootstrap.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less') ]
    }))
    .pipe(gulp.dest('./bundled/css'));
});

gulp.task('inject', function(){
	var target = gulp.src('./index.html');
  	// It's not necessary to read the files (will speed up things), we're only after their paths: 
  	var sources = gulp.src(['./bundled/js/*.js', './bundled/css/*.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['browser-sync'], function(){
});