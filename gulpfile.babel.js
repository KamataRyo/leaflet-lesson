import gulp       from 'gulp'
import ejs        from 'gulp-ejs'
import rename     from 'gulp-rename'
import browserify from 'browserify'
import babelify   from 'babelify'
import source     from 'vinyl-source-stream'
import fs         from 'fs'
import conf       from './src/pages.json'

// duplicate src and generate page
gulp.task('pagenate', () => {
  fs.readdir('./src/', (err, files) => {
    files.forEach((file) => {
      const matched = file.match(/^render\-(.*)\.js$/i)
      if (matched) {
        // duplicate html
        gulp.src('./src/page.html.ejs')
          .pipe(ejs(conf[matched[1]]))
          .pipe(rename((path) => {
            path.basename = 'index'
            path.extname = '.html'
          }))
          .pipe(gulp.dest(`./dest/${matched[1]}`))
        // duplicate libraries
        gulp.src('./lib/*.js')
          .pipe(gulp.dest(`./dest/${matched[1]}`))

        // duplicate rendering processes
        gulp.src(`./src/${matched[0]}`)
          .pipe(rename((path) => {
            path.basename = 'render'
          }))
          .pipe(gulp.dest(`./dest/${matched[1]}`))
      }
    })
  })
})

// bundle
gulp.task('browserify', () => {
  fs.readdir('./dest/', (err, projects) => {
    projects.forEach((folder) => {
      browserify({
        entries: [`./dest/${folder}/`]
      })
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(`./dest/${folder}/`))
    })
  })
})

// clean up and generate index
gulp.task('afterAll', () => {
  fs.readdir('./dest/', (err, projects) => {

    // generate each index page
    gulp.src('src/index.html.ejs')
      .pipe(ejs({projects, conf}))
      .pipe(rename((path) => {
        path.basename = 'index'
        path.extname = '.html'
      }))
      .pipe(gulp.dest('./dest/'))

    // delete unnecessary files
    projects.forEach((folder) => {
      fs.readdir(`./dest/${folder}/`, (err, files) => {
        files.forEach((file) => {
          if (file !== 'app.js' && file !== 'index.html') {
            fs.unlink(`./dest/${folder}/${file}`)
          }
        })
      })
    })
  })
})
