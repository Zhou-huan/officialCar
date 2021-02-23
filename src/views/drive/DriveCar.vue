<template>
  <div class="driveCar">
      <img class="banner" src="../../assets/images/Index-banner.png"/>
      <div class="myCar" @click="golist">
        <div class="myCar-title">
          <div>
            <h4 class="f28">任务列表</h4>
            <p class="fCccc">任务管理，无需错过</p>
          </div>
          <img src="../../assets/images/index4-renwulist.png" alt="">
        </div>
        <ul class="f24 fC333">
          <li>
            <p>进行中</p>
            <h5>{{DriveData.unreturn}}</h5>
          </li>
          <li>
            <p>今日完成</p>
            <h5>{{DriveData.returnedToday}}</h5>
          </li>
        </ul>
        <p class="fCccc f24 myCar-text">累计完成订单{{DriveData.returned}}</p>
      </div>
      <img src="../../assets/images/index4-shigushangbao.png" alt="" class="accident-banner">
  </div>
</template>

<script>
import { getDriveIndex } from '@/libs/const'
export default {
  data () {
    return {
      DriveData: {}
    }
  },
  mounted () {
    this.getDriveData()
  },
  methods: {
    golist () {
      this.$router.push('/taskList')
    },
    getDriveData () {
      getDriveIndex({}, res => {
        this.DriveData = res
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import 'driveCar';
</style>
