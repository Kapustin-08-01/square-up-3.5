import gulp from 'gulp';
const { src, dest, watch, series, parallel } = gulp;
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
const sass = gulpSass(dartSass);
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import htmlmin from 'gulp-htmlmin';
import browserSyncModule from 'browser-sync';
const browserSync = browserSyncModule.create();
import del from 'del';
import imagemin from 'gulp-imagemin';

const paths = {
  src: 'src',
  dist: 'dist',
};

const sourcePaths = {
  styles: `${paths.src}/scss/**/*.scss`,
  html: `${paths.src}/**/*.html`,
  images: `${paths.src}/assets/images/**/*`,
  fonts: `${paths.src}/assets/fonts/**/*`,
};

const destPaths = {
  styles: paths.dist,
  html: paths.dist,
  assets: `${paths.dist}/assets`,
};

const styles = () => {
  const plugins = [autoprefixer(), cssnano()];
  return src(sourcePaths.styles)
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(dest(destPaths.styles))
    .pipe(browserSync.stream());
};

const html = () => {
  return src(sourcePaths.html)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest(destPaths.html))
    .pipe(browserSync.stream());
};

const images = () => {
  return src(sourcePaths.images)
    .pipe(imagemin())
    .pipe(dest(destPaths.assets))
    .pipe(browserSync.stream());
};

const fonts = () => {
  return src(sourcePaths.fonts)
    .pipe(dest(destPaths.assets))
    .pipe(browserSync.stream());
};

const clean = () => del([paths.dist]);

const serve = () => {
  browserSync.init({
    server: paths.dist,
    open: true,
    notify: false,
  });
  watch(sourcePaths.styles, styles);
  watch(sourcePaths.html, html);
  watch(sourcePaths.images, images);
  watch(sourcePaths.fonts, fonts);
};

export default series(clean, parallel(styles, html, images, fonts), serve);
export const build = series(clean, parallel(styles, html, images, fonts));
export { styles, html, images, fonts, clean, serve };
