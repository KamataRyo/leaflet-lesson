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

  // Parse URL and get query
  const {query, pathname} = url.parse(document.URL, true)

  // Tokyo station
  const defaultLocation = {
    lat: 35.681297,
    lng: 139.766247,
    zoom: 10
  }

  // xyz in arguments > xyz in URL > default xyz
  const lat  = args.lat  || query.lat  || defaultLocation.lat
  const lng  = args.lng  || query.lng  || defaultLocation.lng
  const zoom = args.zoom || query.zoom || defaultLocation.zoom

  // Set URL
  window.history.pushState(null, null, `${pathname}?lat=${lat}&lng=${lng}&zoom=${zoom}`)

  // callback
  if (typeof callback == 'function') { callback({lat, lng, zoom}) }
}
