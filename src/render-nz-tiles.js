'use strict'

export default {

  title: 'NZ tiles',

  description: `
    NZ tile loading test.
    Tiles are originated at <a href="http://www.linz.govt.nz/land/maps/linz-topographic-maps/map-chooser/map-1">Land Information New Zealand</a>.
  `,

  template: './src/page.html.ejs',

  render: (map, L) => {
    const ENDPOINT = 'http://tiles.biwako.io/nz/{z}/{x}/{y}.png'
    L.tileLayer(ENDPOINT, {tms: true}).addTo(map)
  }
}
