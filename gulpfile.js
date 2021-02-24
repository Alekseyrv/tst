const gulp = require('gulp')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const del = require('del')
const img = require('gulp-imagemin')
const browserSync = require('browser-sync').create();

const config = {
			   server: {
			       baseDir: "./build"
			   },
			   tunnel: false,
			   host: 'localhost',
			   cors: true
			 };

gulp.task('clearBuild', function() {
			   return del(['build/*'])
			 })

gulp.task('html', function () {
				return gulp.src('src/*.html')
						.pipe(gulp.dest('build/'))
			 	})


gulp.task('js', function () {
				return gulp.src('src/scripts/**/*.js')
						.pipe(sourcemaps.init())
						.pipe(concat('script.js'))
						.pipe(sourcemaps.write())
						.pipe(gulp.dest('build/'))
						.pipe(browserSync.stream())
			 	})

gulp.task('sass', function() {
			    return gulp.src(['src/scss/fonts.scss',
			    				//'src/scss/variables.scss',
			    				'src/scss/normalize.scss',
			    				'src/scss/style.scss',
			    				//'src/scss/slider-custom.scss',
			  			    	'src/scss/media.scss'])
			        .pipe(sass().on('error', sass.logError))
			        .pipe(concat('allstyles.css'))
			        .pipe(autoprefixer({
			          overrideBrowserslist: ['defaults'],
			          cascade: false
			        }))
			        .pipe(gulp.dest('build/css/'))
			        .pipe(browserSync.stream())
			 })


gulp.task('img', function() {
			    return gulp.src('src/img/**/*.*')
			    	.pipe(img())
					.pipe(gulp.dest('build/img/'))
			 	})


gulp.task('build',
			   gulp.series(
			       'clearBuild',
			       gulp.parallel('js', 'sass', 'img', 'html' )
			   )
			 )

 gulp.task('watch', function() {
	 				browserSync.init(config);
					gulp.watch('src/scss/**/*.scss', gulp.series('sass'))
					gulp.watch('src/js/*.js', gulp.series('js'))
					gulp.watch('src/img/**/*.jpg', gulp.series('img'))
					gulp.watch('src/*.html',  gulp.series('html')).on('change', browserSync.reload)
				})

 gulp.task('default', gulp.series('build', 'watch'))