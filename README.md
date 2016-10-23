# Leaflet Lesson

[![Build Status](https://travis-ci.org/KamataRyo/leaflet-lesson.svg?branch=master)](https://travis-ci.org/KamataRyo/leaflet-lesson)

This is my lesson with Leaflet to build a webmap application deployed here.

https://kamataryo.github.io/leaflet-lesson/

## Development

Process below generate new map at "http://host/foo/index.html".

```
$ git clone https://github.com/KamataRyo/leaflet-lesson.git
$ cd leaflet-lesson
$ npm i
$ cp src/render-sample.js src/render-foo.js
$ vi src/render-foo.js
$ npm run build
```
