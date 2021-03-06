var gulp = require('gulp'),
    jshint = require('gulp-jshint')
    rename = require('gulp-rename')
    uglify = require('gulp-uglify')
    less = require('gulp-less')
    path = require('path')
    karma = require('karma').Server
    license = require('gulp-license')
    author = 'Maas Dianto <maas.dianto@gmail.com>'

gulp.task('compress', function() {
  gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(license('apache', { tiny: false, organization: author } ))
    .pipe(gulp.dest('dist'))
});

gulp.task('copy', function() {
    gulp.src('src/*.js')
    .pipe(license('apache', { tiny: false, organization: author } ))
    .pipe(gulp.dest('dist'));
});

gulp.task('jslint', function() {
    return gulp.src(['src/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('less', function () {
  return gulp.src('src/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(license('apache', { tiny: false, organization: author } ))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('test', function (done) {
    return new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('default', function() {
        gulp.start('jslint', 'test', 'compress', 'copy', 'less');
});