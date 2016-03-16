// load gulp plugins
var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename');

// define task called css
gulp.task('css', function() {

	// grab css file, minify it, save to style.min.css
	return gulp.src('public/assets/css/style.css')
		.pipe(minifyCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('public/assets/css'));
});