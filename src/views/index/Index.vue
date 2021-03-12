<template>
  <div class="index">
      <img class="banner" src="../../assets/images/Index-banner.png"/>
      <div class="userCar-application" @click="useCar">
        <div class="user-left">
          <img src="../../assets/images/index-shengqi.png" alt="">
          <div class="userCar-center f32">
            用车申请
            <p class="f24">填写信息，申请用车计划</p>
          </div>
        </div>
        <img src="../../assets/images/index-add.png" alt="" class="user-add">
      </div>
      <div class="userCar-application" @click="useUrgeCar">
        <div class="user-left">
          <img src="../../assets/images/index-shengqi.png" alt="">
          <div class="userCar-center f32">
            紧急用车
            <p class="f24">填写信息，紧急用车计划</p>
          </div>
        </div>
        <img src="../../assets/images/index-add.png" alt="" class="user-add">
      </div>
      <div class="myCar" @click="goList(0)">
        <div class="myCar-title">
          <div>
            <h4 class="f28">我的用车</h4>
            <p class="fCccc">用车情况，一键查看</p>
          </div>
          <img src="../../assets/images/index-yongche.png" alt="">
        </div>
        <ul class="f24 fC333">
          <li>
            <p>待审批</p>
            <h5>{{homeData.stayAudit}}</h5>
          </li>
          <li>
            <p>待调派</p>
            <h5>{{homeData.stayDispatcher}}</h5>
          </li>
          <li>
            <p>待归队</p>
            <h5>{{homeData.stayBack}}</h5>
          </li>
          <li>
            <p>待评价</p>
            <h5>{{homeData.stayEvaluate}}</h5>
          </li>
        </ul>
        <p class="fCccc f24 myCar-text">累计完成订单{{homeData.stayEvaluate+homeData.evaluated}}</p>
        <p class="fCccc f24 myCar-text">累计失败订单{{homeData.failed}}</p>
      </div>
      <div class="my-box">
        <div class="myCost myCommon" @click="goList(1)">
          <div class="myTitle">
            <div>
              <h4 class="f28 fC333 fBold">我的费用</h4>
              <p class="fCccc f22">用车费用，轻松掌握</p>
            </div>
            <img src="../../assets/images/index-feiyong.png" alt="">
          </div>
          <div class="my-bottom">
            <h3 class="f24 fC333">累计费用</h3>
            <h4 class="f48">{{homeData.money | moneyFilter}}</h4>
            <p class="fCccc f24">费用次数  {{homeData.stayEvaluate+homeData.evaluated}}</p>
          </div>
        </div>
        <div class="evaluate myCommon" @click="goList(2)">
          <div class="myTitle">
            <div>
              <h4 class="f28 fC333 fBold">我的评价</h4>
              <p class="fCccc f22">我们进步，与您同步</p>
            </div>
            <img src="../../assets/images/index-pijia.png" alt="">
          </div>
          <div class="my-bottom">
            <h3 class="f24 fC333">全部评价</h3>
            <h4 class="f48">{{homeData.evaluated}}</h4>
            <p class="fCccc f24">待评价  {{homeData.stayEvaluate}}</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { useIndex, checkApply } from '@/libs/const'
import { getPrivilege, getStore } from '@/libs/util'
export default {
  data () {
    return {
      homeData: {}
    }
  },
  mounted () {
    this.getUseIndex()
  },
  methods: {
    getUseIndex () {
      useIndex({}, res => {
        this.homeData = res
      })
    },
    // 紧急用车
    useUrgeCar () {
      if (getPrivilege([177]) || JSON.parse(getStore('userBean')).user_type === 1) {
        this.$router.push('/urgeApplay')
      } else {
        return this.$toast({
          message: '暂无权限',
          duration: 1000,
          className: 'toastStyle'
        })
      }
    },
    // 判断是否有权利申请订单
    checkApplyCar () {
      checkApply({
        applyNameId: JSON.parse(getStore('userBean')).id
      }, res => {
        if (res.state === 0) {
          if (getPrivilege([25])) {
            this.$router.push('/applay')
          } else {
            return this.$toast({
              message: '暂无权限',
              duration: 1000,
              className: 'toastStyle'
            })
          }
        } else {
          this.$toast({
            message: res.str,
            duration: 1000,
            className: 'toastStyle'
          })
        }
      })
    },
    goList (type) {
      switch (type) {
        case 0: this.$router.push('/useCarList'); break
        case 1: this.$router.push('/costList'); break
        case 2: this.$router.push('/evaluateList'); break
      }
    },
    useCar () {
      this.checkApplyCar()
    }
  },
  filters: {
    moneyFilter (val) {
      if (val > 10000) {
        let moneyNum = (Math.round((val / 10000) * 100) / 100).toFixed(2)
        return moneyNum + '万'
      } else {
        return val
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import 'index';
</style>
