<template>
    <div class="amap-wrapper">
     <Map @getLnglat="getPosi"></Map>
    </div>
</template>

<script>
import Map from '../../../components/map'
export default {
  components: {
    Map
  },
  data () {
    return {
      type: this.$route.query.type
    }
  },
  methods: {
    getPosi (lng, lat, address) {
      this.$router.push({
        path: '/applay',
        query: {
          lng,
          lat,
          address,
          type: this.type
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.amap-wrapper {
    height: 100%;
    height: 100%;
}
</style>
