'use strict'
export default (url, callback) => {
  const request = new XMLHttpRequest()
  request.open('get', url, true)
  request.onload = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        if (typeof callback === 'function') {
          callback(JSON.parse(request.response))
        }
      }
    }
  }
  request.send(null)
}
