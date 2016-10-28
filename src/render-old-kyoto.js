'use strict'

export default {

  title: '京都市明細図',

  description: 'old central KYOTO map.',

  template: './src/page.html.ejs',

  render: (map, L) => {

    const ENDPOINT = 'http://www.arc.ritsumei.ac.jp/archive01/theater/image/PB/geo/maps/meisai_sougou/{z}/{x}/{y}.png'
    L.tileLayer(ENDPOINT, {tms: true}).addTo(map)
  }
}
