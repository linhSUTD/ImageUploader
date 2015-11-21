/**
 * Created by nguyenlinh on 11/19/15.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var streamify = require('gulp-streamify');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');

var production = process.env.NODE_ENV === 'production';

/// Bundle JS, JSX Files

gulp.task('vendor', function() {
	return gulp.src([
		"bower_components/jquery/dist/jquery.min.js",
		"bower_components/bootstrap/dist/js/bootstrap.min.js",
		"bower_components/magnific-popup/dist/jquery.magnific-popup.js",
		"bower_components/toastr/toastr.min.js"
	  ]).pipe(concat('vendor.js'))
		.pipe(gulpif(production, uglify({mangle: false})))
		.pipe(gulp.dest('public/js'));

})


gulp.task('browserify', function () {
	return browserify('public/main.js')
			.transform(babelify)
			.bundle()
			.pipe(source('bundle.js'))
			.pipe(gulpif(production, streamify(uglify({mangle: false}))))
			.pipe(gulp.dest('public/js'));
})


gulp.task('browserify-watch', function () {
	var bundler = watchify(browserify('public/main.js', watchify.args));
	bundler.transform(babelify);
	bundler.on('update', rebundle);
	return rebundle();

	function rebundle () {
		bundler.bundle()
		.on('error', function (err) {
				gutil.log(gutil.colors.red(err.toString()))
			})
		.on('end', function (err) {
				gutil.log(gutil.colors.green('Finished rebundling!'))
			})
		.pipe(source('bundle.js'))
		.pipe(gulpif(production, streamify(uglify({mangle: false}))))
		.pipe(gulp.dest('public/js'));
	}
})

gulp.task('styles', function () {
	return gulp.src('public/stylesheets/main.less')
			.pipe(plumber())
			.pipe(less())
			.pipe(autoprefixer())
			.pipe(gulpif(production, cssmin()))
			.pipe(gulp.dest('public/stylesheets'));
})

gulp.task('css-watch', function () {
	gulp.watch('public/stylesheets/**/*.less', ['styles']);
})

gulp.task('default', ['styles', 'vendor', 'css-watch', 'browserify-watch']);

gulp.task('build', ['styles', 'vendor', 'browserify']);