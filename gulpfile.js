const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
const inlinesource = require('gulp-inline-source');
const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngQuant = require('imagemin-pngquant');
const htmlmin = require('gulp-htmlmin');
const tap = require('gulp-tap');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

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
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream());
};

gulp.task('optimize:img', optimizeImages);

const compressHTML = () => {
  return gulp.src('dist/**/*.+(html|ejs)')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'));
};

gulp.task('compress:html', compressHTML);

const loadFonts = () => {
  return gulp.src('./public/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts'));
};

gulp.task('load:fonts', loadFonts);

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
    tunnel: false,
  });
  done();
};

gulp.task('start:server', startBrowserSync);

const compileSass = () => {
  return gulp.src('./public/sass/pages/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write())
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

const compileJs = () => {
  return gulp.src('./public/js/!(*.bundle).js', { read: false })
    .pipe(tap((file) => {
      const f = file;

      f.contents = browserify(file.path, { debug: true })
        .transform(babelify, { presets: ['@babel/env'] })
        .bundle();

      f.path = f.path.replace(/.js$/, '.bundle.js');

      return f;
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream());
};

gulp.task('compile:js', compileJs);

const watch = () => {
  gulp.watch('./public/js/!(*.bundle).js', gulp.series('compile:js', 'inline'));

  gulp.watch('./public/**/*.+(html|ejs)', gulp.series('inline', 'compress:html'));

  gulp.watch('./public/**/*.scss', gulp.series('compile:sass', 'optimize:css', 'inline'));

  gulp.watch('./public/img/*', gulp.series('optimize:img'));
};

gulp.task('watch', watch);

gulp.task('clean', () => { return del(['./dist/**', '!dist']); });

gulp.task('serve', gulp.series('clean', 'optimize:img', 'compile:sass', 'optimize:css', 'compile:js', 'inline', 'compress:html', 'load:fonts', 'start:server', 'watch'));

gulp.task('default', gulp.series('serve'));