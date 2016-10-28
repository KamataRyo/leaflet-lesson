'use strict'
import gulp       from 'gulp'
import ejs        from 'ejs'
import rename     from 'gulp-rename'
import intercept  from 'gulp-intercept'
import browserify from 'browserify'
import babelify   from 'babelify'
import source     from 'vinyl-source-stream'
import buffer     from 'vinyl-buffer'
import uglify     from 'gulp-uglify'
import fs         from 'fs'

// prepare for streams
const prepareSources = () => {
  return new Promise((resolved, rejected) => {
    fs.readdir('./src/', (err, files) => {
      if (err) { rejected(err) }
      const meta = {}
      const templates = {}
      const sources = []
      var counter = 0

      // search render-xyz.js and summarize meta
      files.forEach((file) => {
        const matched = file.match(/^render\-(.*)\.js$/i)
        if (matched) {
          const [filename, slug] = matched
          const filepath = `./src/${filename}`
          const {title, description, template} = require(filepath).default
          meta[slug] = {title, description}
          templates[slug] = template
          sources.push(filepath)
        }
        counter += 1
        // loop finished
        if (counter === files.length) {
          resolved({meta, templates, sources})
        }
      })
    })
  })
}

// generate main index page from ejs template
gulp.task('create-main-index', () => {
  return prepareSources()
    .then(({meta}) => {
      return gulp.src('./src/index.html.ejs')
        .pipe(intercept((file) => {
          file.contents = new Buffer(ejs.render(
            file.contents.toString(),
            {meta}
          ))
          return file
        }))
        .pipe(rename((path) => {
          path.basename = 'index'
          path.extname = '.html'
        }))
        .pipe(gulp.dest('./dest/'))
    })
})

// create each index page from template
gulp.task('create-page-index', () => {
  return prepareSources()
    .then(({meta, templates}) => {
      const generateHTMLs = []

      for(var key of Object.keys(meta)) {

        generateHTMLs.push(new Promise((resolved, rejected) => {
          const slug = key // prevent to be closeure
          return gulp.src(templates[slug])
            .on('error', rejected)
            .pipe(intercept((file) => {
              // run ejs against each project
              file.contents = new Buffer(ejs.render(
                file.contents.toString(),
                meta[slug]
              ))
              return file
            }))
            .pipe(rename((path) => {
              path.dirname = slug
              path.basename = 'index'
              path.extname = '.html'
            }))
            .pipe(gulp.dest('./dest/'))
            .on('end', resolved)
        }))
      }

      return Promise.all(generateHTMLs)
    })
})

// aggregate and prepare for browserify
// lib/index.js requires ./render.js.
// This task resolve this dependecy.
gulp.task('aggregate-js', () => {

  return prepareSources()
    .then(({meta, sources}) => {

      const prepareJS = [
        // copy render-xyz.js into each project directory
        new Promise((resolved, rejected) => {
          return gulp.src(sources)
            .on('error', rejected)
            .pipe(rename((path) => {
              const slug = path.basename.split('-').slice(1).join('-')
              path.dirname = slug
              path.basename = 'render'
            }))
              .pipe(gulp.dest('./dest/'))
              .on('end', resolved)
        })
      ]

      // Copy library to each project directory
      for(var slug of Object.keys(meta)) {
        prepareJS.push(new Promise((resolved, rejected) => {
          return gulp.src('./lib/*.js')
            .on('error', rejected)
            .pipe(gulp.dest(`./dest/${slug}/`))
            .on('end', resolved)
        }))
      }

      return Promise.all(prepareJS)
    })
})


gulp.task('browserify',['aggregate-js'], () => {

  return prepareSources()
    .then(({meta}) => {
      const bundles = []

      for(var key of Object.keys(meta)) {
        bundles.push(new Promise((resolved, rejected) => {
          const slug = key
          return browserify({
            entries: [`./dest/${slug}/`]
          })
            .on('error', rejected)
            .transform([babelify])
            .bundle()
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest(`./dest/${slug}/`))
            .on('end', resolved)
        }))
      }

      return Promise.all(bundles)
    })
})

// clean up already bundled scripts
gulp.task('clean', ['browserify'], () => {

  return prepareSources()
    .then(({meta}) => {
      Object.keys(meta).forEach((slug) => {
        fs.readdir(`./dest/${slug}/`, (err, files) => {
          files.forEach((file) => {
            if (file !== 'app.js' && file !== 'index.html') {
              fs.unlink(`./dest/${slug}/${file}`)
            }
          })
        })
      })
    }
  )
})


gulp.task('build', [
  'create-main-index',
  'create-page-index',
  'aggregate-js',
  'browserify',
  'clean'
])
