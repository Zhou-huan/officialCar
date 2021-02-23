<template>
  <div class="changeCar">
    <header-bar bacColor="#3378F1">
      <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#fff"/>
      <div slot="center">
        <span class="title f32 fBold">选择车辆</span>
      </div>
    </header-bar>
    <div class="content-header">
      <div class="search-box">
          <field v-model="search" placeholder="搜索" :border="false" @input="input"/><button @click="searchList">搜索</button>
      </div>
      <div class="header-title">
          <ul>
              <li>车牌号</li>
              <li>车辆类型</li>
              <li>车辆单位</li>
              <li>车载人数</li>
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
                <li @click="setCar(item)" v-for="(item, index) in carList" :key="index">
                    <span>{{item.car_num}}</span>
                    <span>{{item.car_type_name}}</span>
                    <span>{{item.dept_name}}</span>
                    <span>{{item.car_seating}}</span>
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
import { Loadmore } from 'mint-ui'
import { setStore } from '@/libs/util'
import { getSendCarPage } from '@/libs/const'
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
      form: {
        pagest: 1,
        limit: 20,
        carNum: '',
        useTime: '',
        backTime: '',
        applyId: '',
        apply_man_num: ''
      },
      orderData: {},
      allLoaded: false,
      carList: [
        { carNum: '金12234Rty', carName: '桥车', carDep: '警匪运输', peopleNum: 5, carId: 123123 },
        { carNum: '金23334Rty', carName: '桥车', carDep: '警匪运输', peopleNum: 5, carId: 12123 },
        { carNum: '金234Rty', carName: '桥车', carDep: '警匪运输', peopleNum: 35, carId: 23123 },
        { carNum: '金27734Rty', carName: '桥车', carDep: '警匪运输', peopleNum: 4, carId: 1233 },
        { carNum: '川Y23994Rty', carName: '桥车', carDep: '警匪运输', peopleNum: 5, carId: 1123 },
        { carNum: '金23774Rty', carName: '桥车', carDep: '警匪运输', peopleNum: 15, carId: 1323 }
      ]
    }
  },
  created () {
    this.orderData = this.$store.state.orderSendData
    this.form.applyId = this.orderData.id
    this.form.useTime = this.orderData.apply_time_str
    this.form.backTime = this.orderData.apply_back_time_str
    this.form.apply_man_num = this.orderData.apply_use_car_num
  },
  mounted () {
    this.$nextTick(() => {
      this.getCarList()
    })
  },
  methods: {
    loadTop () {
      this.form.pagest = 1
      this.getCarList()
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      this.form.pagest += 1
      this.getCarList('bottom')
      this.$refs.loadmore.onBottomLoaded()
    },
    // 获取车辆数据
    async getCarList (flag) {
      await getSendCarPage(this.form, res => {
        let carIds = []
        this.$store.state.selectCar.forEach((val, index) => {
          carIds.push(val.id)
        })
        if (res.total - (this.form.limit * this.form.pagest) > 0) {
          this.allLoaded = false
        } else {
          this.allLoaded = true
        }
        if (flag === 'bottom') {
          this.carList = this.carList.concat(res.rows.filter(item => !(carIds.indexOf(item.id) > -1) && item))
        } else {
          this.carList = res.rows.filter(item => !(carIds.indexOf(item.id) > -1) && item)
        }
      })
    },
    toBack () {
      this.$router.push('/changeIndex')
    },
    setCar (item) {
      setStore('carItem', item)
      this.$router.push('/changeDriver')
    },
    input (val) {
      this.form.carNum = val
      this.getCarList()
    },
    searchList () {
      this.form.carNum = this.search
      this.getCarList()
    }
  }
}
</script>

<style lang="less" scoped>
@import 'changeCar';
</style>
