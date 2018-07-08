const gulp = require('gulp');
// const rename = require('gulp-rename');
// const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
const inlinesource = require('gulp-inline-source');
const babel = require('gulp-babel');
const smushit = require('gulp-smushit');

const smush = () => {
  return gulp.src('./public/img/*')
    .pipe(smushit({
      verbose: true,
    }))
    .pipe(gulp.dest('./dist/img'));
};

// const images = () => {
//   return gulp.src('./public/img/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('./dist/img'));
// };

const fonts = () => {
  return gulp.src('./public/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts'));
};

const inline = () => {
  return gulp.src('./public/index.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('./dist'));
};

const startBrowserSync = (done) => {
  browserSync.init({
    proxy: 'localhost:3000',
  });
  done();
};

const clean = () => {
  return gulp.src('./public/css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
};

const defaultContent = (done) => {
  console.log('This is my default content');
  done();
};

const translateAndUglify = () => {
  return gulp.src('./public/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
};

gulp.task('uglify-js', translateAndUglify);

const defaultTasks = gulp.series(gulp.parallel('uglify-js'), defaultContent);

module.exports = { default: defaultTasks };

gulp.task('scripts', (done) => {
  console.log('Running the scripts gulp task');
  done();
});

gulp.task('styles', (done) => {
  console.log('Running the styles gulp task');
  done();
});

gulp.task('default', gulp.series(translateAndUglify, inline, smush, fonts, startBrowserSync));

const watcherReporter = (path, stats) => {
  console.log(`File ${path} was changed`);
};

gulp.task('watch', gulp.series('default', () => {
  const jsWatcher = gulp.watch('./public/js/**/*.js', gulp.series(translateAndUglify, inline));

  jsWatcher.on('change', watcherReporter);

  const cssWatcher = gulp.watch('./public/css/**/*.css', gulp.series(clean, inline));
  cssWatcher.on('change', watcherReporter);
}));
