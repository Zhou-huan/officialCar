<template>
  <div class="examine">
      <img class="banner" src="../../assets/images/Index-banner.png"/>
      <div class="useCar" @click="goList">
          <div class="useTitle">
              <div>
                  <h3 class="fC333 f28">用车审批</h3>
                  <p class="fCccc f22">认真细致，服务大众</p>
              </div>
              <img src="../../assets/images/index2-ycshenpi.png" alt="">
          </div>
          <ul class="fC333 firstUl">
              <li>
                  <h5 class="f24">未审批</h5>
                  <p class="f48 fBold">{{examineData.audit}}</p>
              </li>
              <li>
                  <h5 class="f24">今日审批</h5>
                  <p class="f48 fBold">{{examineData.auditToday}}</p>
              </li>
          </ul>
          <ul class="secondUl f24 fCccc">
              <li v-for="(item, index) in lastList" :key="index">
                    <div>
                      <span class="green" style="padding-right:20px;">{{item.yong_che_ren}}</span>&emsp;{{item.apply_remark}}
                      <p>{{item.yong_che_no}}</p>
                    </div>
              </li>
          </ul>
      </div>
      <div class="record">
           <h3 class="fC333 f28">审批记录</h3>
            <ul class="fC333 firstUl">
              <li>
                  <h5 class="f24">已审批</h5>
                  <p class="f48 fBold">{{examineData.audited}}</p>
              </li>
              <li>
                  <h5 class="f24">审批未通过</h5>
                  <p class="f48 fBold">{{examineData.auditFail}}</p>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import { getExamine } from '@/libs/const'
export default {
  data () {
    return {
      examineData: {},
      lastList: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    goList () {
      this.$router.push('/carExamineList')
    },
    getData () {
      getExamine({}, res => {
        this.examineData = res
        this.lastList = res.auditList.slice(0, 2)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import 'examine';
</style>
