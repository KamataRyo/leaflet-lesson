'use strict'
import url from 'url'

/**
 * Client side URL router. Specified for this project.
 * @param  {Object}   args        [description]
 * @param  {Function} callback    [description]
 * @return {null}
 */
export default (args, callback) => {
  // Only work with pushState
  if (!window.history || !window.history.pushState) { return }

  // Parse URL and get queries
  const queries = url.parse(document.URL, true).query

  // Tokyo station
  const defaultLocation = {
    lat: 35.681297,
    lng: 139.766247,
    zoom: 10
  }

  // xyz in arguments > xyz in URL > default xyz
  const lat  = args.lat  || queries.lat  || defaultLocation.lat
  const lng  = args.lng  || queries.lng  || defaultLocation.lng
  const zoom = args.zoom || queries.zoom || defaultLocation.zoom

  // Set URL
  window.history.pushState(null, null, `/?lat=${lat}&lng=${lng}&zoom=${zoom}`)

  // callback
  if (typeof callback == 'function') { callback({lat, lng, zoom}) }
}
