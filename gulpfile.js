import { src, dest, watch, series, parallel } from 'gulp';
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

const paths = {
  src: 'src',
  dist: 'dist',
};

const sourcePaths = {
  styles: `${paths.src}/scss/**/*.scss`,
  html: `${paths.src}/**/*.html`,
};

const destPaths = {
  styles: paths.dist,
  html: paths.dist,
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

const clean = () => del([paths.dist]);

const serve = () => {
  browserSync.init({
    server: paths.dist,
    open: true,
    notify: false,
  });
  watch(sourcePaths.styles, styles);
  watch(sourcePaths.html, html);
};

export default series(clean, parallel(styles, html), serve);
export const build = series(clean, parallel(styles, html));
export { styles, html, clean, serve };
