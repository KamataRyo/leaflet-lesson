'use strict'
import load from './loader.js'

export default (map, L) => {
  const ENDPOINT = 'https://kamataryo.github.io/leaflet-lesson-datastore/dest/list.json'

  // load Data
  load(ENDPOINT, (data) => {

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