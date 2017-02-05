'use strict'

const title       = '飛び出し坊やマップ'

const description = 'Hosted on <a class="link" href="https://github.com/KamataRyo/leaflet-lesson">GitHub</a>.'

const template    = './src/page.html.ejs'

const render = (map, L) => {

  const LoadJSON = (url, callback) => {
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

  const ENDPOINT = 'https://kamataryo.github.io/leaflet-lesson-datastore/dest/list.json'

  // load Data
  LoadJSON(ENDPOINT, (data) => {

    data.forEach(({lat, lng, title, description, imageURL}) => {
      // skip ancomplete data
      if (!lat || !lng || !imageURL) {
        console.log('No geolocation or imageURL')
        return
      }

      // set markers up
      L
        .marker([lat, lng], {title})
        .addTo(map)
        .bindPopup(`
          <div class="popup">
            <h1>${title || 'NO TITLE'}</h1>
        ` + (description ? `<p>${description}</p>` : '') + `
          <p><img src="${imageURL}" width="250px" /></p>
          </div>
        `)
    })
  })
}

export default {
  title,
  description,
  template,
  render
}
