var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function() {
    return del(['dist']);
});

function build() {
    return del(['dist']).then(function() {
        tsProject.src().pipe(sourcemaps.init()).pipe(tsProject()).js.pipe(sourcemaps.write()).pipe(gulp.dest('dist'));
    });
}

gulp.task('default', build);

gulp.task('build', build);