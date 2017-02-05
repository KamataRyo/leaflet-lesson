'use strict'

export default {

  title: 'dynamic vector tile',

  description: 'http://localhost:3000/{z}/{x}/{y}.svgとして動的に生成したタイルを読み込む',

  template: './src/page.html.ejs',

  render: (map, L) => {

    const ENDPOINT = 'http://localhost:3000/{z}/{x}/{y}.svg'
    L.tileLayer(ENDPOINT, {tms: true, opacity: .5}).addTo(map)
  }
}
