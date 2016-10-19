# Leaflet Lesson

[![Build Status](https://travis-ci.org/KamataRyo/leaflet-lesson.svg?branch=master)](https://travis-ci.org/KamataRyo/leaflet-lesson)

This is my lesson with Leaflet to build a webmap application.

## Development

```
$ git clone https://github.com/KamataRyo/leaflet-lesson.git
$ cd leaflet-lesson
$ npm i
$ npm run dev
$ npm start
```

## NOTE

### Add new Layer to map Object
```
// Add WMS Layer(Now trying but not working)
new L.tileLayer.wms('http://demo.opengeo.org/geoserver/wms', {
  format: 'image/png',
  transparent: true,
  layers: '5'
}).addTo(map)

// Add some tile Layer
new L.tileLayer(
    'http://cyberjapandata.gsi.go.jp/xyz/20160414kumamoto_0420dol02/{z}/{x}/{y}.png'
).addTo(map)
```
