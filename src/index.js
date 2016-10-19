'use strict'
import Leaflet from 'mapbox.js'
import route   from './router.js'

/**
 * Main
 */
(() => {
  // set up AccessToken
  Leaflet.mapbox.accessToken = 'pk.eyJ1Ijoia2FtYXRhcnlvIiwiYSI6ImNpdWZld2JpeDAwYncyeXFwZnRuNHR1b3oifQ.HH5I3qlw_togDES3IDFOug'

  // Load map
  const map = Leaflet.mapbox.map('map', 'mapbox.streets').setView([0, 0], 1)

  map.on('ready', () => {
    // initial routing with given URL
    route({}, ({lat, lng, zoom}) => {
      map.panTo(new Leaflet.LatLng(lat, lng))
      map.setZoom(zoom)
    })
    // Do anything
  })

  // URL routing at `moveend` and `zoomend`
  map.on('moveend zoomend', (e) => {
    const {lat, lng} = e.target.getCenter()
    const zoom = e.target.getZoom()
    route({lat, lng, zoom})
  })

})()
