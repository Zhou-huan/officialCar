import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index.js'
import { Toast } from 'vant'
import './assets/css/common.css'
import './libs/moment'
import './directive/defaultImg'
import '@/directive/debounce'
import '@/directive/clickout'
import '@/directive/throttling'
// 高德离线地图
import { mapKey } from '@/libs/const'
import VueAMap from 'vue-amap'
Vue.prototype.$toast = Toast
// Vue.prototype.$amapManager = new VueAMap.AMapManager()
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: mapKey,
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'Geocoder', 'AMap.Geolocation', 'AMap.Driving'],
  v: '1.4.4'
})
Vue.config.productionTip = false
let vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default vue
