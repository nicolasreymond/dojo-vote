const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
//const uglify = require('gulp-uglify'); @TODO
const sass = require('gulp-sass');

gulp.task('sass', () => {
  gulp.src('./app/sass/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

// Build JavaScript files 
gulp.task('scripts', () => {
  //gulp.src(['js/src/util.js', 'js/src/alert.js', 'js/src/button.js', 'js/src/carousel.js', 'js/src/collapse.js', 'js/src/dropdown.js', 'js/src/modal.js', 'js/src/scrollspy.js', 'js/src/tab.js', 'js/src/tooltip.js', 'js/src/popover.js'])
  gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(concat('./bootstrap.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', () => {
  gulp.watch('./app/sass/*.scss', ['sass']);
});

gulp.task('develop', () => {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee nunjucks',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', (chunk) => {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'sass',
  'scripts',
  'develop',
  'watch'
]);
