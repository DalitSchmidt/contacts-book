const maps = require('gulp-sourcemaps')
const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const gutil = require('gulp-util')
const babelify = require('babelify')
const connect = require('gulp-connect')
const sass = require('gulp-sass')
const nodemon = require('gulp-nodemon')
const concat = require('gulp-concat')
const minify = require('gulp-minify')
const sequence = require('run-sequence')

gulp.task('compile', () => {
    return gulp.src(['./src/application/**/*.js', '!src/application/vendor/*.js'])
    .pipe( maps.init() )
    .pipe( concat('app.min.js') )
    .pipe( gulp.dest('./public/application') )
});

gulp.task('transfile', () => {
    return browserify({
        entries: ['./public/application/app.min.js']
    })
    .transform( babelify )
    .bundle()
    .pipe( source('app.min.js') )
    // .pipe( minify() )
    .pipe( gulp.dest("./public/application") )
});

gulp.task('build', () => sequence('compile', 'transfile'))
gulp.task('connect', () => connect.server({ livereload: true }))
gulp.task('nodemon', () => {nodemon({ script: './bin/www', env: { 'NODE_ENV': 'development' }, ignore: ['public', 'gulpfile.js'] })})

gulp.task('watch', () => {
    gulp.watch('./src/sass/**/*.scss', ['sass'])
    // gulp.watch(['./src/application/*.js'], ['compile'])

    // gulp.watch('./public/*.html', ['html'])
})

// Compile SASS files
gulp.task('sass', () => {
    return gulp.src('./src/sass/style.scss')
        .pipe( maps.init() )
        .pipe( sass({ expended: true }).on( 'error', sass.logError ) )
        .pipe( maps.write('./') )
        .pipe( gulp.dest('./public/css') )
        .pipe( connect.reload() )
})

gulp.task('start', () => sequence('build', 'sass', 'nodemon'))
gulp.task('default', ['nodemon', 'connect', 'watch', 'sass', 'compile'])