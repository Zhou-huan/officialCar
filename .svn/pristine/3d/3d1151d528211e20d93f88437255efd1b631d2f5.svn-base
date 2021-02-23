<template>
  <div class="choose-wrapper">
    <header-bar bacColor="#fff">
      <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#333"/>
      <div slot="center">
        <span class="title fC333 f32 fBold">选择车队</span>
      </div>
    </header-bar>
    <div class="choose-cnt">
      <ul class="choose-single">
        <li v-for="(item, index) in list" :key="index" @click="toOpr(item)">
          <p class="dept">{{item.dept_name}}</p>
          <p><label>驾驶员：</label>{{item.driver_num}}</p>
          <template v-for="(key, ind) in Object.keys(item)">
            <p v-if="!['dept_name', 'driver_num', 'operation_state', 'dept_id'].includes(key)" :key="ind">
              <label>{{ key }}：</label> {{ item[key] }}
            </p>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import HeaderBar from '@/components/header-bar/header-bar'
import { getConvoyInfo } from '@/libs/const'
import { Icon } from 'vant'
export default {
  components: {
    HeaderBar,
    Icon
  },
  data () {
    return {
      list: [],
      params: this.$route.query,
      carpoolList: this.$store.state.carpoolData
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    toBack () {
      this.$router.push({
        path: '/dispatchDetail',
        query: {
          id: this.params.applyId
        }
      })
    },
    async getList () {
      const carpools = []
      if (this.carpoolList.length) {
        this.carpoolList.some((item, index) => {
          carpools[index] = item.id
        })
      }
      await getConvoyInfo({
        applyId: this.params.applyId,
        sharingApplys: carpools.join(',')
      }, (res) => {
        this.list = res.rows
      })
    },
    toOpr (item) {
      this.$store.dispatch('SET_FLEET', [{
        id: item.dept_id,
        name: item.dept_name
      }])
      this.toBack()
    }
  }
}
</script>
<style lang="less">
  @import "choose";
</style>
