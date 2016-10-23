'use strict'
export default (map, L) => {
  // Add some tile Layer
  const format = 'http://cyberjapandata.gsi.go.jp/xyz/20160414kumamoto_0420dol02/{z}/{x}/{y}.png'
  new L.tileLayer(format).addTo(map)
}
