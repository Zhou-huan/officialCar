<template>
  <div class="changeCar">
    <header-bar bacColor="#3378F1">
      <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#fff"/>
      <div slot="center">
        <span class="title f32 fBold">选择驾驶员</span>
      </div>
    </header-bar>
    <div class="content-header">
      <div class="search-box">
          <field v-model="search" placeholder="搜索" :border="false" @input="input"/><button @click="searchList">搜索</button>
      </div>
      <div class="header-title">
          <ul>
              <li>姓名</li>
              <li>单位</li>
              <li>电话</li>
              <li>准驾车型</li>
          </ul>
      </div>
    </div>
      <div class="content">
        <Loadmore :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottomAllLoaded="allLoaded"
        bottomPullText="上拉加载"
        bottomDropText="加载更多"
        :autoFill="false"
        ref="loadmore">
          <div class="header-list">
            <ul>
                <li @click="setDriver(item)" v-for="(item, index) in driverList" :key="index">
                    <span>{{item.uname}}</span>
                    <span>{{item.user_dept_name}}</span>
                    <span>{{item.user_phone}}</span>
                    <span>{{item.driver_zjcx}}</span>
                </li>
            </ul>
        </div>
      </Loadmore>
      </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar/header-bar'
import { Icon, Field } from 'vant'
import { getStore } from '@/libs/util'
import { Loadmore } from 'mint-ui'
import { getSendDriverPage } from '@/libs/const'
export default {
  components: {
    HeaderBar,
    Icon,
    Field,
    Loadmore
  },
  data () {
    return {
      search: '',
      allLoaded: false,
      form: {
        pagest: 1,
        limit: 20,
        driverName: '',
        useTime: '',
        backTime: '',
        applyId: ''
      },
      driverList: []
    }
  },
  created () {
    this.orderData = this.$store.state.orderSendData
    this.form.applyId = this.orderData.id
    this.form.useTime = this.orderData.apply_time_str
    this.form.backTime = this.orderData.apply_back_time_str
  },
  mounted () {
    this.$nextTick(() => {
      this.getDriverList()
    })
  },
  methods: {
    loadTop () {
      this.form.pagest = 1
      this.getDriverList()
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      this.form.pagest += 1
      this.getDriverList('bottom')
      this.$refs.loadmore.onBottomLoaded()
    },
    toBack () {
      this.$router.push('/changeCar')
    },
    setDriver (item) {
      //  区分id
      item.driverId = item.id
      // 合并车驾驶员项，然后push到vuex中
      let carPeople = Object.assign(item, JSON.parse(getStore('carItem')))
      this.$store.commit('setSelectCar', carPeople)
      this.$router.push('/changeIndex')
    },
    async getDriverList (flag) {
      await getSendDriverPage(this.form, res => {
        // 已经选了的id数组集合
        let driverIds = []
        this.$store.state.selectCar.forEach((val, index) => {
          driverIds.push(val.driverId)
        })
        if (res.total - (this.form.limit * this.form.pagest) > 0) {
          this.allLoaded = false
        } else {
          this.allLoaded = true
        }
        if (flag === 'bottom') {
          this.driverList = this.driverList.concat(res.rows.filter(item => !(driverIds.indexOf(item.id) > -1) && item))
        } else {
          this.driverList = res.rows.filter(item => !(driverIds.indexOf(item.id) > -1) && item)
        }
      })
    },
    input (val) {
      this.form.driverName = val
      this.getDriverList()
    },
    searchList () {
      this.form.driverName = this.search
      this.getDriverList()
    }
  }
}
</script>

<style lang="less" scoped>
@import 'changeCar';
</style>
