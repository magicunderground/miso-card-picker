var gulp  = require('gulp')
var ts = require('gulp-typescript');
var del = require('del');

var project = ts.createProject('tsconfig.json');

gulp.task('clean', function() {
    return del('dist');
});

gulp.task('build', gulp.series('clean', function() {
    return project.src()
    .pipe(project())
    .js.pipe(gulp.dest('dist'));
}));