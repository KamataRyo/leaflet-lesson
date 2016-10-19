import gulp       from 'gulp'
import browserify from 'browserify'
import babelify   from 'babelify'
import source     from 'vinyl-source-stream'

gulp.task('browserify', () => {
  browserify({
    entries: ['./src/']
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./'))
})

gulp.task('build', ['browserify'])

gulp.task('watch', () => {
  gulp.watch('./src/*.js', ['build'])
})
