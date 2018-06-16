import { task, dest } from 'gulp';
import * as typescript from 'gulp-typescript';
import * as del from 'del';
import * as sourcemaps from 'gulp-sourcemaps';

var tsProject = typescript.createProject('./src/tsconfig.json');

task('clean', async () => {
    await del.sync('dist');
});

task('build', () => {
    return tsProject
        .src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js.pipe(sourcemaps.write('source-map'))
        .pipe(dest('dist'));
});