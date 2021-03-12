<template>
  <div class="costDeatil">
    <header-bar bacColor="#3976E7">
      <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#fff"/>
      <div slot="center">
        <span class="title f32 fBold">费用详情</span>
      </div>
    </header-bar>
    <div class="cost-content">
        <div class="cost-title">
          <div class="cost-left">
            <img :src="details.img_path + details.car_picture" alt="">
            <div>
              <p class="fBold">{{details.car_num}}</p>
              <span>行驶里程：{{details.xs_km}}km</span>
            </div>
          </div>
          <div class="cost-right">
            <span>GPS里程：{{details.gps_km}}km</span>
          </div>
        </div>
        <div class="cost-remark fBold">
            <div>用车基本信息：<span class="blue">{{cardetails.carType}}</span></div>
            <div>基础费用：<span class="blue">￥{{cardetails.jichu}}</span></div>
            <div>小型叉车费用：<span class="blue">￥{{cardetails.forkliftMoney}}</span></div>
            <div>用车时长：<span class="blue">{{cardetails.timeStr}}</span></div>
            <div>人工费用：<span class="blue">￥{{cardetails.workerMoney}}(40*{{cardetails.workerNum}}人*{{cardetails.mins}}小时)</span></div>
            <div>总费用：<span class="orange">￥{{cardetails.allMoneyStr}}</span></div>
        </div>
        <ul class="detail-data">
          <li>编号：{{details.yong_che_no}}</li>
          <li>申请人：{{details.apply_name}}</li>
          <li>用车人：{{details.yong_che_ren}}</li>
          <li>驾驶员：{{details.apply_driver_name}}</li>
          <li>单位：{{details.apply_dept_name}}</li>
          <li>用车性质：{{details.yong_che_xz}}</li>
          <li>开始时间：{{details.apply_use_time_str}}</li>
          <li>结束时间：{{details.apply_back_time_str}}</li>
          <li>备注：{{details.travel_remark}}</li>
        </ul>
    </div>
    <button class="btn" @click="doOk" v-if="details.is_settle_accounts === 0 && details.apply_flow_state === 4">确定费用</button>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar/header-bar'
import { getCostById, carBack } from '@/libs/const'
import { Icon } from 'vant'
export default {
  components: {
    HeaderBar,
    Icon
  },
  data () {
    return {
      cardetails: {},
      details: this.$route.query.item
    }
  },
  mounted () {
    this.getDetails()
  },
  methods: {
    toBack () {
      this.$router.push('/costList')
    },
    getDetails () {
      getCostById({
        applyId: this.details.id
      }, res => {
        this.cardetails = res
      })
    },
    doOk () {
      carBack({
        apply_id: this.details.id,
        str: 'is_settle_accounts'
      }, res => {
        this.$toast({
          message: '操作成功',
          duration: 1000,
          className: 'toastStyle',
          onClose: () => {
            this.$router.push('/costList')
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.costDeatil {
  padding: 100px 30px 0px;
  font-size: 30px;
  .title {
    color: #fff;
  }
  .cost-content {
    color: #666;
    .cost-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      padding: 10px 0;
      img {
        width: 100px;
        height: 100px;
        margin-right: 30px;
      }
      .cost-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-right: 1px solid #eee;
        padding-right: 40px;
      }
      .cost-right {
        text-align: left;
      }
    }
    .cost-remark {
      padding: 20px 0;
      border-bottom: 1px solid #eee;
      div {
        padding: 10px 0px;
      }
    }
    .detail-data {
      height: 700px;
      li {
        padding: 10px 0px;
      }
    }
  }
  .btn {
    width: 100%;
    height: 100px;
    background-color:#3378F1;
    border: 0;
    color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
