# Web Map Generator

[![Build Status](https://travis-ci.org/KamataRyo/leaflet-lesson.svg?branch=master)](https://travis-ci.org/KamataRyo/leaflet-lesson)

This is a web map application generator with [Leaflet](http://leafletjs.com/).
The maps are published on [gh-pages](https://kamataryo.github.io/leaflet-lesson/).

## Development

Commands below generate a new map under new directory.

```
$ git clone https://github.com/KamataRyo/leaflet-lesson.git && cd leaflet-lesson
$ npm install
$ npm run scaffold "xyz" # xyz is project slug.
$ npm run build
```

Edit `./src/render-xyz.js` with leaflet to generate a map page at ``./dest/xyz/index/html`
