'use strict'
import url from 'url'

/**
 * Tokyo station as default Location fall back
 * @type {Object}
 */
const defaultLocation = {
  zoom: 10,
  lat:  35.681297,
  lng:  139.766247
}

/**
 * Client side URL router. Specified for this project.
 * @param  {Object}   args        [description]
 * @param  {Function} callback    [description]
 * @return {null}
 */
const route = (args, callback) => {

  // Only work with pushState
  if (!window.history || !window.history.pushState) { return }

  // Parse URL and get query
  const {query, pathname} = url.parse(document.URL, true)

  // xyz in arguments > xyz in URL > default xyz
  const zoom = args.zoom || query.zoom || defaultLocation.zoom
  const lat  = args.lat  || query.lat  || defaultLocation.lat
  const lng  = args.lng  || query.lng  || defaultLocation.lng

  // Set URL
  window.history.replaceState(null, null, `${pathname}?zoom=${zoom}&lat=${lat}&lng=${lng}`)

  // callback
  if (typeof callback == 'function') { callback({zoom, lat, lng}) }
}


export default {route}
