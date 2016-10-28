'use strict'
import L        from 'mapbox.js'
import Renderer from './render.js' // ./render.js may not be found, but generate after build process
import Router   from './router.js'
const ACCESS_TOKEN = 'pk.eyJ1Ijoia2FtYXRhcnlvIiwiYSI6ImNpdWZld2JpeDAwYncyeXFwZnRuNHR1b3oifQ.HH5I3qlw_togDES3IDFOug';

/**
 * Main
 */
(() => {
  // set up mapbox AccessToken
  L.mapbox.accessToken = ACCESS_TOKEN

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
    var {lat, lng} = e.target.getCenter()
    Router.route({zoom, lat, lng})
  })

  // indicate cursor latlng
  map.on('mousemove', ({latlng}) => {
    const [lat, lng] = [latlng.lat, latlng.lng].map((degree) => {
      return Math.round(degree * Math.pow(10, 5)) / Math.pow(10, 5)
    })
    document.getElementById('latlng').innerHTML = `
      <dl>
        <dt class="latlng-head">LatLng</dt>
        <dd class="latlng-value">${lat},${lng}</dd>
      </dl>
    `
  })

  map.on('ready', (e) => { Renderer.render(e.target, L) })

})()
