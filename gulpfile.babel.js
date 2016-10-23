import gulp       from 'gulp'
import ejs        from 'gulp-ejs'
import rename     from 'gulp-rename'
import browserify from 'browserify'
import babelify   from 'babelify'
import source     from 'vinyl-source-stream'
import fs         from 'fs'

// duplicate src and generate page
gulp.task('pagenate', () => {
  fs.readdir('./src/', (err, files) => {
    const meta = {}
    var counter = 0
    files.forEach((file) => {
      const matched = file.match(/^render\-(.*)\.js$/i)
      if (matched) {
        // duplicate html
        const {title, description} = require(`./src/${matched[0]}`).default
        meta[matched[1]] = {title, description}
        gulp.src('./src/page.html.ejs')
          .pipe(ejs({title, description}))
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
      counter += 1
      if (counter === files.length) {

        const ws = fs.createWriteStream('./.sitemeta.json')
        ws.write(JSON.stringify(meta))
        ws.end()
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
    const meta = require('./.sitemeta.json')

    // generate each index page
    gulp.src('src/index.html.ejs')
      .pipe(ejs({meta}))
      .pipe(rename((path) => {
        path.basename = 'index'
        path.extname = '.html'
      }))
      .pipe(gulp.dest('./dest/'))

    // delete unnecessary files
    fs.unlink('./.sitemeta.json')
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
