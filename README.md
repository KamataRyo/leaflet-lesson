# Leaflet Lesson

[![Build Status](https://travis-ci.org/KamataRyo/leaflet-lesson.svg?branch=master)](https://travis-ci.org/KamataRyo/leaflet-lesson)

This is my lesson with Leaflet to build a webmap application deployed here.

https://kamataryo.github.io/leaflet-lesson/

## Development

Process below generate new map at "http://host/dest/foo/index.html".

```
$ git clone https://github.com/KamataRyo/leaflet-lesson.git
$ cd leaflet-lesson
$ npm install
$ cp -i ./render-sample.js ./src/render-foo.js # foo is new map project name
$ vi ./src/render-foo.js
$ vi ./src/pages.json # edit meta information such as title
$ npm run build
```
