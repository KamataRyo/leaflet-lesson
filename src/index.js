'use strict'
import Leaflet from 'mapbox.js'
import route   from './router.js'
import load    from './loader.js'
const ENDPOINT = 'https://raw.githubusercontent.com/KamataRyo/leaflet-lesson-datastore/master/data/data.json'
const ACCES_STOKEN = 'pk.eyJ1Ijoia2FtYXRhcnlvIiwiYSI6ImNpdWZld2JpeDAwYncyeXFwZnRuNHR1b3oifQ.HH5I3qlw_togDES3IDFOug';

/**
 * Main
 */
(() => {
  // set up AccessToken
  Leaflet.mapbox.accessToken = ACCES_STOKEN
  // Load map
  const map = Leaflet.mapbox.map('map', 'mapbox.streets').setView([0, 0], 1)

  map.on('ready', () => {
    // initial routing with given URL
    route({}, ({lat, lng, zoom}) => {
      map.panTo(new Leaflet.LatLng(lat, lng))
      map.setZoom(zoom)
    })

    // Load Data
    load(ENDPOINT, (data) => {
      data.forEach(({lat, lng, title, description, imageURL}) => {
        Leaflet
          .marker([lat, lng])
          .addTo(map)
          .bindPopup(`
            <h3>${title}</h3>
            <p>${description}</p>
            <p><img src="${imageURL}" width="100px"/></p>
        `)
      })
    })
  })

  // URL routing at `moveend` and `zoomend`
  map.on('moveend zoomend', (e) => {
    const {lat, lng} = e.target.getCenter()
    const zoom = e.target.getZoom()
    route({lat, lng, zoom})
  })

})()
