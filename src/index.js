'use strict'
import L      from 'mapbox.js'
import render from './render.js' // ./render.js may not be found, but generate after build process
import Router from './router.js'
const ACCES_STOKEN = 'pk.eyJ1Ijoia2FtYXRhcnlvIiwiYSI6ImNpdWZld2JpeDAwYncyeXFwZnRuNHR1b3oifQ.HH5I3qlw_togDES3IDFOug';

/**
 * Main
 */
(() => {
  // set up mapbox AccessToken
  L.mapbox.accessToken = ACCES_STOKEN

  // Load map
  const map = L.mapbox.map('map', 'mapbox.streets').setView([0, 0], 1)

  // Initial routing with given URL
  Router.route({}, ({zoom, lat, lng}) => {
    map
      .setZoom(zoom)
      .panTo([lat, lng], true)
  })

  // URL routing at `moveend` and `zoomend`
  map.on('zoomend moveend', (e) => {
    const zoom       = e.target.getZoom()
    const {lat, lng} = e.target.getCenter()
    Router.route({zoom, lat, lng})
  })

  map.on('ready', render)

})()
