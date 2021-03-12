<template>
  <div class="content">
    <header-bar>
      <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#fff"/>
      <div slot="center">
        <span class="title">选择位置</span>
      </div>
      <div slot="right" class="right-text" @click="getLnglat">确定</div>
    </header-bar>
    <div class="amap-wrapper">
      <el-amap-search-box
        class="search-box"
        :search-option="searchOption"
        :on-search-result="onSearchResult"
      ></el-amap-search-box>
      <el-amap class="amap-box" :zoom="zoom" :plugin="plugin" :center="center" :events="events" :mapStyle="mapStyle">
        <el-amap-marker :position="center"></el-amap-marker>
         <el-amap-text :text="address" :offset="offset" :position="center"></el-amap-text>
      </el-amap>
    </div>
  </div>
</template>
<script>
import { Icon } from 'vant'
import HeaderBar from '@/components/header-bar/header-bar'
export default {
  name: 'map-ycya',
  components: {
    HeaderBar,
    Icon
  },
  data () {
    let _this = this
    return {
      center: [116.461234, 39.921234], // 地图中心点坐标 济南市
      zoom: 12, // 初始化地图显示层级
      mapStyle: 'amap://styles/8b6be8ec497009e17a708205348b899a', // 设置地图样式
      markers: [[104.066143, 30.573095]],
      searchOption: { // 搜索条件
        city: '成都',
        citylimit: false // 是否限制城市内搜索
      },
      address: '北京',
      offset: [0, 10],
      lng: 104.066143,
      lat: 30.573095,
      loaded: false,
      plugin: [{
        pName: 'Geolocation',
        events: {
          init (o) {
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              if (result && result.position) {
                // 如果key是企业的，还可以直接result.addressComponent获取省市，周边等信息
                _this.lng = result.position.lng
                _this.lat = result.position.lat
                _this.center = [_this.lng, _this.lat]
                _this.markers = [[_this.lng, _this.lat]]
                _this.address = result.formattedAddress
                _this.loaded = true
                _this.$nextTick()
              }
            })
          }
        }
      }],
      events: {
        init: (o) => {},
        moveend: () => {},
        zoomchange: () => {},
        click: (e) => {
          let { lng, lat } = e.lnglat
          this.center = [lng, lat]
          this.markers = [[lng, lat]]
          this.lng = lng
          this.lat = lat
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                _this.address = result.regeocode.formattedAddress
              }
            }
          })
        }
      }
    }
  },

  methods: {
    toBack () {
      this.$emit('closePage')
    },
    addMarker: function () {
      this.markers = []
      let lng = 121.5 + Math.round(Math.random() * 1000) / 10000
      let lat = 31.197646 + Math.round(Math.random() * 500) / 10000
      this.markers = [[lng, lat]]
    },
    onSearchResult (pois) { // 搜索回调函数
      // let latSum = 0
      // let lngSum = 0
      if (pois.length > 0) {
        let center = pois[0]
        this.lng = center.lng
        this.lat = center.lat
        this.address = center.name
        this.center = [center.lng, center.lat]
        this.markers = [[center.lng, center.lat]]
      }
    },
    getLnglat () {
      this.$emit('getLnglat', this.lng, this.lat, this.address)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content {
  width: 100%;
  height: 100%;
}
.search-box {
  position: absolute;
  top: 100px;
  left: 20px;
  width: 95%;
}
.amap-wrapper {
  width: 100%;
  height: 100vh;
  position: relative;
  font-size: 24px;
}
.right-text {
  font-size: 32px;
  color: #fff;
}
</style>
