<template>
  <div class="sendCar">
      <img class="banner" src="../../assets/images/Index-banner.png"/>
      <div class="myCar" @click="goList(0)">
        <div class="myCar-title">
          <div>
            <h4 class="f28">调度派车</h4>
            <p class="fCccc">知你所需，轻松调度</p>
          </div>
          <img src="../../assets/images/index3-ddpaiche.png" alt="">
        </div>
        <ul class="f24 fC333">
          <li>
            <p>待调度</p>
            <h5>{{sendData.stayDispatcher}}</h5>
          </li>
          <li>
            <p>调度记录</p>
            <h5>{{sendData.dispatchered}}</h5>
          </li>
          <li>
            <p>驳回记录</p>
            <h5>{{sendData.dispatcherFail}}</h5>
          </li>
        </ul>
        <div class="myCar-bottom">
          <ul class="fC999 f24">
            <li>
              <span class="circle"></span>车队
              <h3  class="fC333 f32">{{sendData.convoyTotal}}</h3>
            </li>
            <li>
              <span class="circle circle-green"></span>车辆
              <h3 class="fC333 f32">{{sendData.carTotal}}</h3>
            </li>
          </ul>
        </div>
      </div>
      <div class="sendCar" @click="goList(1)">
        <div class="myCar-title">
          <div>
            <h4 class="f28">我的派车</h4>
            <p class="fCccc">知你所需，轻松调度</p>
          </div>
          <img src="../../assets/images/index3-wodepc.png" alt="">
        </div>
        <ul class="sendCar-list f24 fC999">
          <li class="fC333">
            <p>需要派车</p>
            <h5 class="f48 fBold">{{sendData.vehicleTotal}}</h5>
          </li>
          <li class="fC333">
            <p>派车记录</p>
            <h5 class="f48 fBold">{{sendData.vehicledTotal}}</h5>
          </li>
        </ul>
      </div>
      <div class="sendCar registerCar" @click="goList(2)">
        <div class="myCar-title">
          <div>
            <h4 class="f28">归队登记</h4>
            <p class="fCccc">不管在哪，轻松归队</p>
          </div>
          <img src="../../assets/images/index3-guiduidj.png" alt="">
        </div>
        <ul class="sendCar-list f24 fC999">
          <li class="fC333">
            <p>未归队</p>
            <h5 class="f48 fBold">{{sendData.unrejoin}}</h5>
          </li>
          <li class="fC333">
            <p>已归队</p>
            <h5 class="f48 fBold">{{sendData.rejoined}}</h5>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import { sendCarIndex } from '@/libs/const'
import { getPrivilege } from '@/libs/util'
export default {
  data () {
    return {
      sendData: {}
    }
  },
  mounted () {
    this.getSendData()
  },
  methods: {
    useCar () {
      console.log(11)
      this.$router.push({
        path: '/applay',
        query: {}
      })
    },
    goList (num) {
      if (num === 0) {
        if (getPrivilege([172, 173])) {
          this.$router.push({
            path: '/dispatchList'
          })
        } else {
          return this.$toast({
            message: '暂无权限',
            duration: 1000,
            className: 'toastStyle'
          })
        }
      } else if (num === 2) {
        if (getPrivilege([169])) {
          this.$router.push({
            path: '/rejoinList'
          })
        } else {
          return this.$toast({
            message: '暂无权限',
            duration: 1000,
            className: 'toastStyle'
          })
        }
      } else {
        if (getPrivilege([175, 176])) {
          this.$router.push({
            path: '/sendCarList'
          })
        } else {
          return this.$toast({
            message: '暂无权限',
            duration: 1000,
            className: 'toastStyle'
          })
        }
      }
    },
    getSendData () {
      sendCarIndex({}, res => {
        this.sendData = res
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import 'sendCar';
</style>
