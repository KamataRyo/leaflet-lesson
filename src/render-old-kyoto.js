'use strict'
import L from 'mapbox.js'

export default (e) => {
  const map = e.target

  const ENDPOINT = 'http://www.arc.ritsumei.ac.jp/archive01/theater/image/PB/geo/maps/meisai_hasegawa/{z}/{x}/{y}.png'
  L.tileLayer(ENDPOINT).addTo(map)

}
