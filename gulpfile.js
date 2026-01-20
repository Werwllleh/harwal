/*
import gulp from 'gulp';
import path from 'path';
import pug from 'gulp-pug';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import insert from 'gulp-insert';
import concat from 'gulp-concat';
import browserSyncPkg from 'browser-sync';
import ghPages from 'gulp-gh-pages';
import {exec} from 'child_process';

const sass = gulpSass(dartSass);
const browserSync = browserSyncPkg.create();

const reload = done => {
  browserSync.reload();
  done();
};

// ===== helpers =====
const run = cmd =>
  new Promise((res, rej) =>
    exec(cmd, (err) => err ? rej(err) : res())
  );

// ===== public =====
export const copy = () =>
  gulp.src('src/public/!**!/!*', {encoding: false})
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());

// ===== pug =====
export const html = () =>
  gulp.src('src/pages/!**!/!*.pug')
    .pipe(pug({pretty: true, basedir: path.join(process.cwd(), 'src')}))
    .pipe(rename({dirname: '', extname: '.html'}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());

// ===== styles =====
export const styles = () =>
  gulp.src([
    'src/app/scss/index.scss'
  ])
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());

// ===== scripts =====
export const scripts = () =>
  gulp.src([
    'src/app/js/common.js',
    'src/blocks/!**!/!*.js',
    'src/components/!**!/!*.js',
    'src/pages/!**!/!*.js'
  ])
    .pipe(concat('common.js'))
    .pipe(insert.prepend(
      `document.addEventListener('DOMContentLoaded', function () {\n`
    ))
    .pipe(insert.append(
      `\n});`
    ))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());

// ===== clean =====
export const cleanDist = () =>
  gulp.src('dist', {allowEmpty: true, read: false})
    .pipe(clean());

// ===== serve =====
export const serve = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch('src/!**!/!*.pug', gulp.series(html, reload));
  gulp.watch('src/!**!/!*.scss', gulp.series(styles, reload));
  gulp.watch('src/!**!/!*.js', gulp.series(scripts, reload));
  gulp.watch('src/public/!**!/!*', gulp.series(copy, reload));
  gulp.watch(['src/sprite/sprite.svg', 'src/data/!**!/!*'], gulp.series('pug'));
};

// ===== main =====
export const build = gulp.series(
  cleanDist,
  copy,
  gulp.parallel(html, styles, scripts)
);

export default gulp.series(build, serve);

export const deploy = () =>
  gulp.src('./dist/!**!/!*')
    .pipe(ghPages({branch: 'dist'}));
*/

import gulp from 'gulp';
import path from 'path';
import pug from 'gulp-pug';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import insert from 'gulp-insert';
import browserSyncPkg from 'browser-sync';
import {deleteAsync} from 'del';

const sass = gulpSass(dartSass);
const browserSync = browserSyncPkg.create();

/* ================= helpers ================= */

const reload = done => {
  browserSync.reload();
  done();
};

/* ================= clean ================= */

export const cleanDist = () => {
  return deleteAsync(['dist']);
};

/* ================= public ================= */

export const copy = () =>
  gulp.src('src/public/**/*', {encoding: false})
    .pipe(gulp.dest('dist'));

/* ================= pug ================= */

export const html = () =>
  gulp.src('src/pages/**/*.pug')
    .pipe(
      pug({
        pretty: true,
        basedir: path.join(process.cwd(), 'src'),
      })
    )
    .pipe(rename({dirname: '', extname: '.html'}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());

/* ================= styles ================= */

export const styles = () =>
  gulp.src('src/app/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('dist/css'))
    // .pipe(browserSync.stream({match: '**/*.css'}));
    .pipe(browserSync.stream());


/* ================= scripts ================= */

export const scripts = () =>
  gulp.src([
    'src/app/js/common.js',
    'src/blocks/**/*.js',
    'src/components/**/*.js',
    'src/pages/**/*.js',
  ])
    .pipe(concat('common.js'))
    .pipe(insert.prepend(
      `document.addEventListener('DOMContentLoaded', function () {\n`
    ))
    .pipe(insert.append(
      `\n});`
    ))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());

/* ================= serve ================= */

export const serve = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
      serveStatic: ['dist']
    },
    notify: false,
    open: false
  });

  gulp.watch([
    'src/app/**/*.pug',
    'src/components/**/*.pug',
    'src/blocks/**/*.pug',
    'src/pages/**/*.pug'
  ], html);
  gulp.watch([
    'src/app/**/*.scss',
    'src/components/**/*.scss',
    'src/blocks/**/*.scss',
    'src/pages/**/*.scss'
  ], styles);
  gulp.watch([
    'src/app/**/*.js',
    'src/components/**/*.js',
    'src/blocks/**/*.js',
    'src/pages/**/*.js'
  ], scripts);
  gulp.watch('src/public/**/*', copy);

  gulp.watch(
    ['src/sprite/sprite.svg', 'src/data/**/*'],
    gulp.series(html, reload)
  );
};


/* ================= build ================= */

export const build = gulp.series(
  cleanDist,
  copy,
  gulp.parallel(html, styles, scripts)
);

export default gulp.series(build, serve);

/*export const deploy = () =>
  gulp.src('./dist/!**!/!*')
    .pipe(ghPages({ branch: 'dist' }));*/
