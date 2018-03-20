/*
 * @Author: ManKeung
 * @Date: 2018-03-07
 */

'use strict'; // 严格模式
/**
 * 1. scss编译 压缩
 * 2. JS合并 压缩 混淆
 * 3. img压缩 复制
 * 4. html压缩
 * 5. ico
 * 6. font
 * 7. 音乐
 * 8. PHP
 * 9. server服务
 */

// 在gulpfile中先载入gulp包，因为这个包提供了一些API
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');

// 1. scss编译 压缩 --合并没有必要，一般预处理CSS都可以导包
gulp.task('style',() => {
  return gulp.src('./src/styles/*.scss') // 引入文件
    .pipe(sass().on('error', sass.logError)) // scss 编译成 css 有错输出
    .pipe(cssnano()) // css压缩
    .pipe(gulp.dest('./dist/styles'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// 2. ES6转ES5 js 合并 压缩混淆
const babel = require('gulp-babel'); // ES6转ES5
const concat = require('gulp-concat'); // 合并
const uglify = require('gulp-uglify'); // 压缩

/*gulp.task('script', () => {
  return gulp.src('./src/scripts/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(browserSync.reload({
      stream: true
    }));
});*/

gulp.task('script', () => {
  return gulp.src(['./src/scripts/main.js', './src/scripts/animate.js', './src/scripts/ajax.js', './src/scripts/own.js'])
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// 3. 图片复制 压缩
const imagemin = require('gulp-imagemin');

gulp.task('image', () => {
  return gulp.src('./src/images/**/*.{png,jpg,gif,jpeg}')
    .pipe(imagemin({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('./dist/images'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// html 压缩
const htmlmin = require('gulp-htmlmin'); // html压缩

gulp.task('html', () => {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// ico
gulp.task('ico', () => {
  return gulp.src('./src/*.ico')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// font 字体图标
gulp.task('font', () => {
  return gulp.src('./src/font/*.*')
    .pipe(gulp.dest('./dist/font'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// music
gulp.task('music', () => {
  return gulp.src('./src/music/*.*')
    .pipe(gulp.dest('./dist/music'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// php
gulp.task('php', () => {
  return gulp.src('./src/*.php')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// 服务
const browserSync = require('browser-sync'); // 服务

gulp.task('server', () => {
  browserSync({
    server: {
      baseDir: ['dist'] // 服务器根目录
    },
  }, (err, bs) => {
    console.log(bs.options.getIn(["urls", "local"]));
  });

  gulp.watch('./src/styles/*.scss', ['style']);
  gulp.watch('./src/scripts/*.js', ['script']);
  gulp.watch('./src/images/**/*.{png,jpg,gif,jpeg}', ['image']);
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/*.ico', ['ico']);
  gulp.watch('./src/font/*.*', ['font']);
  gulp.watch('./src/music/*.*', ['music']);
  gulp.watch('./src/*.php', ['php']);
});

