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

  // Tokyo station as default
  const defaultLocation = {
    zoom: 10,
    lat:  35.681297,
    lng:  139.766247
  }

  // xyz in arguments > xyz in URL > default xyz
  const zoom = args.zoom || query.zoom || defaultLocation.zoom
  const lat  = args.lat  || query.lat  || defaultLocation.lat
  const lng  = args.lng  || query.lng  || defaultLocation.lng

  // Set URL
  window.history.pushState(null, null, `${pathname}?zoom=${zoom}&lat=${lat}&lng=${lng}`)

  // callback
  if (typeof callback == 'function') { callback({zoom, lat, lng}) }
}
