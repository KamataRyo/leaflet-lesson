'use strict'

/**
 * AJAX load from given URL
 * @param  {[String]}   url    [description]
 * @param  {Function} callback [description]
 */
export default (url, callback) => {
  const request = new XMLHttpRequest()
  request.open('get', url, true)
  request.onload = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        if (typeof callback === 'function') {
          callback(JSON.parse(request.response))
        }
      } else {
        console.log(`Request failed with status ${request.status}.`)
      }
    } else {
      console.log(`Request failed with readyState ${request.readyState}.`)
    }
  }
  request.send(null)
}
