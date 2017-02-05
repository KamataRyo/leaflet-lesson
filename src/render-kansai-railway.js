'use strict'

export default {

  title: '関西路線図タイル',

  description: '関西路線図にジオリファレンスを当ててタイル化したもの',

  template: './src/page.html.ejs',

  render: (map, L) => {

    const ENDPOINT = 'http://tiles.biwako.io/kansai-railway/{z}/{x}/{y}.png'
    L.tileLayer(ENDPOINT, {tms: true, opacity: .7}).addTo(map)

  }
}
