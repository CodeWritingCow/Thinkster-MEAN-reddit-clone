// load gulp plugins
var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	jshint = require('gulp-jshint'),
	imagemin = require('gulp-imagemin');

// define task called css
gulp.task('css', function() {

	// grab css file, minify it, save to style.min.css
	return gulp.src('public/assets/css/style.css')
		.pipe(minifyCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('public/assets/css'));
});

// task for linting js files
gulp.task('js', function() {
	
	return gulp.src(['public/assets/js/*.js', 'public/app/*.js', 'public/app/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// task for minifying images
gulp.task('img', function() {
	return gulp.src('public/assets/img/**/*.+(jpg|png|gif|svg)')
		.pipe(imagemin())
		.pipe(rename({ suffix: '-min' }))
		.pipe(gulp.dest('public/assets/img'));
});