'use strict'
import Leaflet from 'mapbox.js'
import Router  from './router.js'
import load    from './loader.js'
const ENDPOINT = 'https://kamataryo.github.io/leaflet-lesson-datastore/dest/list.json'
const ACCES_STOKEN = 'pk.eyJ1Ijoia2FtYXRhcnlvIiwiYSI6ImNpdWZld2JpeDAwYncyeXFwZnRuNHR1b3oifQ.HH5I3qlw_togDES3IDFOug';

/**
 * Main
 */
(() => {
  // set up AccessToken
  Leaflet.mapbox.accessToken = ACCES_STOKEN

  // Load map
  const map = Leaflet.mapbox.map('map', 'mapbox.streets').setView([0, 0], 1)

  // Initial routing with given URL
  Router.route({}, ({zoom, lat, lng}) => {
    map
      .setZoom(zoom)
      .panTo([lat, lng], true)
  })

  map.on('ready', () => {

    // Load Data
    load(ENDPOINT, (data) => {

      data.forEach(({lat, lng, title, description, imageURL}) => {
        // Skip ancomplete data
        if (!lat || !lng || !imageURL) {
          console.log('No geolocation or imageURL')
          return
        }

        // set markers up
        Leaflet
          .marker([lat, lng], {title})
          .addTo(map)
          .bindPopup(`
            <div class="popup">
              <h1>${title || 'NO TITLE'}</h1>
          ` + (description ? `<p>${description}</p>` : '') + `
              <p><img class="popupimage" src="${imageURL}" width="250px" /></p>
            </div>
          `)
      })
    })
  })

  // URL routing at `moveend` and `zoomend`
  map.on('zoomend moveend', (e) => {
    const zoom       = e.target.getZoom()
    const {lat, lng} = e.target.getCenter()
    Router.route({zoom, lat, lng})
  })

})()
