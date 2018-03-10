var gulp = require('gulp'),
    sass = require('gulp-sass'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
   	validator = require('gulp-html');

// development mode?
//devBuild = (process.env.NODE_ENV !== 'production'),

 
	gulp.task('html', function() {
  		return gulp.src('src/index.html')
  		.pipe(validator())
  		.pipe(gulp.dest('dist/'));
	});

	//scss to css
	gulp.task('sass', function() {
	return gulp.src('src/styles/**/*.scss')
		.pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('dist/styles'))
	});

	// image processing
	gulp.task('images', function() {
  	var out = 'dist/media/';
  	return gulp.src('src/media/**/*')
    	.pipe(newer(out))
    	.pipe(imagemin({ optimizationLevel: 5 }))
    	.pipe(gulp.dest(out));
	});



	//Runs all the tasks in the array
	gulp.task('run', ['html','sass', 'images']);
	
	//Watches changes in the source files and runs the task inside the brackets
	gulp.task('watch', function() {
		gulp.watch('src/*.html', ['html']);
		gulp.watch('src/styles/**/*.scss', ['sass']);
		gulp.watch('src/media/**/*', ['images']);
	});

	gulp.task('default', ['watch']);