import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index.js'
import { Toast } from 'vant'
import './assets/css/common.css'
import './libs/moment'

// 高德离线地图
import { mapKey } from '@/libs/const'
import VueAMap from 'vue-amap'
Vue.prototype.$toast = Toast
Vue.prototype.$amapManager = new VueAMap.AMapManager()
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: mapKey,
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'Geocoder', 'AMap.Geolocation', 'AMap.Driving'],
  v: '1.4.4'
})
// 自定义指令-点击非当前元素
Vue.directive('clickoutside', {
  bind (el, binding, vnode) {
    function handler (e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) return false
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = handler
    document.addEventListener('click', handler)
  },
  unbind (el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
})
Vue.config.productionTip = false
let vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default vue
