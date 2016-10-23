'use strict'
import L from 'mapbox.js'

export default (e) => {
  const map = e.target

  // Add some tile Layer
  const format = 'http://cyberjapandata.gsi.go.jp/xyz/20160414kumamoto_0420dol02/{z}/{x}/{y}.png'
  new L.tileLayer(format).addTo(map)
}
