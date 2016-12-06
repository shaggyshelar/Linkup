import * as gulp from 'gulp';
import { join } from 'path';
import Config from '../../config';

export = () => {
  return gulp.src([
      join('src/server/**/*')
    ])
    .pipe(gulp.dest(Config.PROD_DEST));
};
