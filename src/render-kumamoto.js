'use strict'
export default {

  title: '地理院タイル利用サンプル',

  description: '<a class="link" href="http://maps.gsi.go.jp/development/ichiran.html#20160414kumamoto_0420dol02">地理院タイル 平成28年熊本地震 阿蘇2地区 正射画像（2016年4月20日撮影）</a>を使用',

  template: './src/page.html.ejs',

  render: (map, L) => {
    // Add some tile Layer
    const format = 'http://cyberjapandata.gsi.go.jp/xyz/20160414kumamoto_0420dol02/{z}/{x}/{y}.png'
    new L.tileLayer(format).addTo(map)
  }
}
