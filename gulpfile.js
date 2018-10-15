const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
const inlinesource = require('gulp-inline-source');
const browserify = require('browserify');
const rename = require('gulp-rename');
const glob = require('glob');
const es = require('event-stream');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngQuant = require('imagemin-pngquant');

const optimizeImages = () => {
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
};

gulp.task('optimize:img', optimizeImages);

const fonts = () => {
  return gulp.src('./public/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts'));
};

gulp.task('fonts', fonts);

const inline = () => {
  return gulp.src('./public/**/*.+(html|ejs)')
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

gulp.task('start:server', startBrowserSync);

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

const js = (done) => {
  glob('./public/js/!(*.bundle).js', (err, files) => {
    const tasks = files.map((entry) => {
      return browserify({ entries: [entry] })
        .transform(babelify.configure({ presets: ['@babel/preset-env'] }))
        .bundle()
        .pipe(source(entry))
        .pipe(rename({
          dirname: '',
          extname: '.bundle.js',
        }))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream());
    });

    es.merge(tasks).on('end', done);
  });
};

const watcherReporter = (path, stats) => {
  console.log(`File ${path} was changed`);
};

gulp.task('compile:js', js);

const watch = () => {
  const jsWatcher = gulp.watch('./public/js/!(*.bundle).js', gulp.series(js, inline));
  jsWatcher.on('change', watcherReporter);

  const htmlWatcher = gulp.watch('./public/**/*.+(html|ejs)', gulp.series(inline));
  htmlWatcher.on('change', watcherReporter);

  const scssWatcher = gulp.watch('./public/**/*.scss', gulp.series(compileSass, optimizeCSS, inline));
  scssWatcher.on('change', watcherReporter);
};

gulp.task('watch', watch);

gulp.task('default', gulp.series(optimizeImages, compileSass, optimizeCSS, js, inline, fonts, startBrowserSync, watch));