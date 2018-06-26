import { task, series, dest } from 'gulp';
import { createProject } from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';

var project = createProject('tsconfig.json');

task('clean', () => {
    return del('dist');
});

task('build', series('clean', () => {
    return project.src()
    .pipe(sourcemaps.init())
    .pipe(project())
    .js.pipe(sourcemaps.write())
    .pipe(dest('dist'));
}));
