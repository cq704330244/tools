const { series } = require('gulp');
var gulp = require('gulp'), //gulp基础包
  rename = require('gulp-rename'), //重命名
  uglify = require('gulp-uglify'), //压缩js
  less = require('gulp-less'),
  minifycss = require('gulp-minify-css'), //压缩css
  htmlmin = require('gulp-htmlmin'), //html压缩
  imagemin = require('gulp-imagemin'), //图片压缩
  concat = require('gulp-concat'), //合并
  jshint = require('gulp-jshint'), //js检测
  autoprefixer = require('gulp-autoprefixer'), //补充前缀
  rev = require('gulp-rev-append'), //版本号自动更新
  map = require('map-stream'),
  notify = require('gulp-notify'),
  colors = require('colors');

var exitOnJshintError = map(function (file, cb) {
  if (!file.jshint.success) {
    console.log(
      colors.red('----------------------------------------------------')
    );
    console.log(colors.green('javascript 格式错误，进程退出'));
    console.log(
      colors.red('----------------------------------------------------')
    );
    process.exit(1);
  }
});

var myReporter = map(function (file, cb) {
  if (!file.jshint.success) {
    console.log(
      colors.green('----------------------------------------------------')
    );
    console.log(
      colors.red(file.jshint.results.length + ' errors in ' + file.path)
    );
    console.log(
      colors.green('----------------------------------------------------')
    );
    file.jshint.results.forEach(function (err) {
      console.log(
        colors.red(
          ' ' +
            file.path +
            ': line ' +
            err.error.line +
            ', col ' +
            err.error.character +
            ', code ' +
            err.error.code +
            ', ' +
            err.error.reason
        )
      );
    });
  }
  cb(null, file);
});

function jscodelint(cb) {
  gulp
    .src('./common/js/**/*.js')
    .pipe(jshint())
    .pipe(myReporter)
    .pipe(exitOnJshintError)
    .pipe(notify({ message: 'jslint pass' }));
  cb();
}
function minifjs() {
  gulp
    .src(['js/**/*.js', 'js/*.js', '!src/js/all.js'])
    .pipe(concat('all.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(notify({ message: 'Javascript 代码压缩成功 ！' }));
}
function mudifyless() {
  gulp
    .src('./common/less/**.less')
    .pipe(less())
    .pipe(
      rename({
        extname: '.acss',
      })
    )
    .pipe(gulp.dest('./dist/acss'))
    .pipe(notify({ message: 'less --> acss 代码压缩成功 ！' }));
}
function mudifycss() {
  var cssOption = {
    advanced: false,
    compatibility: '*',
    keepBreaks: false,
    keepSpecialComments: '*',
  };
  gulp
    .src(['css/**/*.css', 'css/*.css'])
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true,
        remove: true,
      })
    )
    .pipe(minifycss(cssOption))
    .pipe(gulp.dest('./dist/css'))
    .pipe(notify({ message: 'css 代码压缩成功 ok' }));
}

function miniHtml() {
  var options = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyCSS: true,
  };
  gulp
    .src('./common/html/*.html')
    .pipe(rev())
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/html'))
    .pipe(notify({ message: 'Html 代码压缩成功 ！' }));
}

function minimage() {
  gulp
    .src('./common/images/*.*')
    .pipe(
      imagemin({
        progressive: true,
      })
    )
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: '图片压缩成功 ！' }));
}
function clean(cb) {
  cb();
}

async function build(cb) {
  await minifjs();
  await miniHtml();
  await mudifyless();
  mudifycss();
  cb();
}

exports.build = build;
exports.default = series(clean, jscodelint, build);
