const gulp = require('gulp');
// const rename = require('gulp-rename');
// const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
const inlinesource = require('gulp-inline-source');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const inject = require('gulp-inject');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngQuant = require('imagemin-pngquant');

gulp.task('optimize', () => {
  return gulp.src('public/img/*')
    .pipe(imagemin([
      imagemin.gifsicle(),
      imageminJpegRecompress({
        loops: 6,
        min: 40,
        max: 85,
        quality: 'low',
      }),
      imageminPngQuant(),
      imagemin.svgo(),
    ]))

    .pipe(gulp.dest('dist/img'));
});

// const images = () => {
//   return gulp.src('./public/img/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('./dist/img'));
// };

const fonts = () => {
  return gulp.src('./public/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts'));
};

gulp.task('fonts', fonts);

const inline = () => {
  return gulp.src('./public/**/*.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
};

gulp.task('inline', inline);

const startBrowserSync = (done) => {
  browserSync.init({
    proxy: 'localhost:3000',
  });
  done();
};

const compileSass = () => {
  return gulp.src('./public/sass/pages/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
};

gulp.task('compile:sass', compileSass);

const optimizeCSS = () => {
  return gulp.src('./public/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8',
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
};

gulp.task('optimize:css', optimizeCSS);

// const defaultContent = (done) => {
//   console.log('This is my default content');
//   done();
// };

const translateAndUglify = () => {
  return gulp.src('./public/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
};

gulp.task('uglify-js', translateAndUglify);

// const defaultTasks = gulp.series(gulp.parallel('uglify-js'), defaultContent);

// module.exports = { default: defaultTasks };

const watcherReporter = (path, stats) => {
  console.log(`File ${path} was changed`);
};

const watch = () => {
  const jsWatcher = gulp.watch('./public/**/*.js', gulp.series(translateAndUglify, inline));
  jsWatcher.on('change', watcherReporter);

  // const cssWatcher = gulp.watch('./public/**/*.css', gulp.series(optimizeCSS, inline));
  // cssWatcher.on('change', watcherReporter);

  const htmlWatcher = gulp.watch('./public/**/*.html', gulp.series(inline));
  htmlWatcher.on('change', watcherReporter);

  const scssWatcher = gulp.watch('./public/**/*.scss', gulp.series(compileSass, optimizeCSS, inline));
  scssWatcher.on('change', watcherReporter);
};

gulp.task('watch', watch);

const injectIndex = (done) => {
  const target = gulp.src('./public/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  const sources = gulp.src(['./public/**/*.css'], {
    read: false,
  });

  // gulp.src('./public/index.html')
  //   .pipe(inject(gulp.src(['./public/**/*.js'], ['./public/**/*.css']), {
  //     starttag: '<!-- inject:{{path}} -->',
  //     relative: true,
  //     transform: (filePath, file) => {
  //       // return file contents as string
  //       return file.contents.toString('utf8');
  //     },
  //   }))
  //   .pipe(gulp.dest('./dist'));
  // done();

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./dist'));
};

gulp.task('injectIndex', injectIndex);

gulp.task('default', gulp.series(compileSass, optimizeCSS, translateAndUglify, inline, fonts, startBrowserSync, watch));