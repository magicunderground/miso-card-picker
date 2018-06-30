var del = require('del');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');

var project = ts.createProject('tsconfig.json');

gulp.task('clean', function () {
    return del('dist');
});

gulp.task('build', gulp.series('clean', function () {
    return project.src()
        .pipe(sourcemaps.init())
        .pipe(project())
        .js.pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
}));