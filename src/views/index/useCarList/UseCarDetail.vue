<template>
  <div class="detail">
    <header-bar bacColor="#fff">
      <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#333"/>
      <div slot="center">
        <span class="title fC333 f32 fBold">订单详情</span>
      </div>
    </header-bar>
    <div class="title"><span>订单号：{{ detail.yong_che_no }}</span>
      <c-button class="btn-hollow" :clsName="stsCls[detail.apply_flow_state]">
      {{ detail.apply_flow_state | stsTxt(detail.apply_convoy_id) }}
      </c-button>
    </div>
    <div class="root">
        <h4>{{ detail.apply_use_address_1 }}<span v-if="detail.apply_use_address_2">({{ detail.apply_use_address_2}})</span></h4>
        <p>{{ detail.apply_use_time_str }} {{ detail.apply_use_time_str | getWeek}}<img src="@/assets/images/list-chu.png" alt=""></p>
        <div class="root-center">
          <img src="@/assets/images/list-jiantou.png" alt="">
          <span class="f24">{{ detail.apply_sx_pople }}</span>
        </div>
        <h4>{{ detail.apply_destination_1 }}<span v-if="detail.apply_destination_2">({{ detail.apply_destination_2 }})</span></h4>
        <p>{{ detail.apply_back_time_str }} {{ detail.apply_back_time_str | getWeek}}<img src="@/assets/images/list-gui.png" alt=""></p>
    </div>
    <div class="user-box f28">
      <div class="user">
        <div class="fC999">申请人：<span class="fC333 fBold">{{ detail.apply_name }}</span></div>
        <span>{{ detail.apply_name_phone }}</span>
      </div>
    </div>
    <div class="user-box f28" v-if="detail.apply_driver_id && detail.apply_flow_state >= 3 && detail.apply_flow_state !== 15">
      <div class="user">
        <div class="fC999">驾驶员：<span class="fC333 fBold">{{ detail.apply_driver_name }}</span></div>
        <span>{{ detail.apply_driver_phone }}</span>
      </div>
    </div>
    <div class="user-box f28">
      <div class="user">
          <div class="fC999">用车人：<span class="fC333 fBold">{{ detail.yong_che_ren }}</span></div>
        <span>{{ detail.apply_use_phone }}</span>
      </div>
      <div>
        <p v-if="detail.car_num && detail.apply_flow_state >= 3 && detail.apply_flow_state !== 15">车牌号：{{ detail.car_num }}</p>
        <span>乘车人数：{{ detail.apply_man_num }}人</span>
      </div>
    </div>
    <div class="user-box f28">
      <div class="user">
          <div class="fC999">车辆类型：<span class="fC333 fBold">{{ detail.apply_sx_pople }}</span></div>
      </div>
    </div>
    <div class="user-box f28" v-if="detail.leader_name">
      <div class="user">
          <div class="fC999">领导信息：<span class="fC333 fBold">{{ detail.leader_name }}</span></div>
      </div>
    </div>
    <ul class="detail-list f28">
      <li>
        <span class="fCccc">用车事由：</span>{{ detail.apply_remark_str }}
      </li>
      <li>
        <span class="fCccc">用车部门：</span> {{ detail.apply_dept_name }}
      </li>
      <li>
        <span class="fCccc">用车性质：</span>{{ detail.yong_che_xz }}
      </li>
      <li>
        <span class="fCccc">用车区域：</span> {{ detail.quyu_str }}
      </li>
      <li>
        <span class="fCccc">携带秘品：</span>{{ detail.carry_secret === 1 ? '是' : '否' }}
      </li>
      <li>
        <span class="fCccc">备注信息：</span>{{ detail.apply_bz }}
      </li>
    </ul>
    <div class="carCostInfo fC333" v-if="detail.apply_flow_state === 4 || detail.apply_flow_state === 5">
      <p>基础费用：<span>￥{{detail.moneyDetailData.jichu}}</span></p>
      <p>人工费：<span>￥{{detail.moneyDetailData.workerMoney}}</span></p>
      <p>小型叉车费用：<span>￥{{detail.moneyDetailData.forkliftMoney}}</span></p>
      <p>用车时长：<span>{{detail.moneyDetailData.timeStr}}</span></p>
      <p>总费用：<span>￥{{detail.moneyDetailData.allMoneyStr}}</span></p>
      <p>用车基本信息：<span>{{detail.moneyDetailData.carType}}、行驶里程为{{detail.moneyDetailData.km}}km、用车时间为{{detail.moneyDetailData.timeStr}}</span></p>
    </div>
    <div v-if="isShowBtn">
      <div class="btn-box" style="justify-content: center;" v-if="detail.apply_flow_state === 0 || detail.apply_flow_state === 1">
        <div class="right">
          <button @click="toOpr('mod')">订单修改</button>
          <button @click="toOpr('cancel')" v-if="isCancel">取消订单</button>
        </div>
      </div>
      <div class="btn-box"
          v-if="detail.apply_flow_state === 4 && detail.is_settle_accounts === 0 || (detail.apply_flow_state === 3 && detail.is_look === 0)"
          :style="detail.apply_flow_state === 3 ? {justifyContent: 'center'} : {}">
        <div class="left" v-if="detail.apply_flow_state === 4"><span>{{ detail.feiyong }} 元</span></div>
        <div class="right">
          <button @click="toOpr('confirm', detail.apply_flow_state)">确认</button>
        </div>
      </div>
      <div class="btn-box"  v-if="detail.apply_flow_state === 6 || detail.apply_flow_state === 15 || detail.apply_flow_state === 2">
        <div class="right">
          <button @click="toOpr('fail')">重新申请</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar/header-bar'
import CButton from '@/components/button/button'
import { Icon, Toast } from 'vant'
import { getPrivilege } from '@/libs/util'
import { getApplyInfoById, cancelApply, affirmInfo } from '@/libs/const'
import moment from 'moment'
export default {
  components: {
    HeaderBar,
    Icon,
    CButton
  },
  data () {
    return {
      detail: {},
      isShowBtn: false,
      isCancel: false,
      id: this.$route.query.id,
      stsCls: {
        0: 'yellow',
        1: 'yellow',
        2: 'red',
        3: 'yellow',
        4: 'yellow',
        5: '',
        6: 'red',
        15: 'red'
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getDetail()
      this.isShowBtn = getPrivilege([25])
      this.isCancel = getPrivilege([113])
    })
  },
  filters: {
    stsTxt (flow, convoy) {
      let text = ''
      const obj = {
        0: '待审批',
        1: '',
        2: '审批驳回',
        3: '待归队',
        4: '待评价',
        5: '已完成',
        6: '调度驳回',
        15: '订单取消'
      }
      if (flow === 1) {
        if (convoy === 0) {
          text = '待调度'
        } else {
          text = '待派车'
        }
      } else {
        text = obj[flow]
      }
      return text
    },
    getWeek (val) {
      return moment(val).format('dddd')
    }
  },
  methods: {
    toBack () {
      this.$router.push({
        path: '/useCarList',
        query: {}
      })
    },
    async getDetail () {
      await getApplyInfoById({ applyId: this.id }, (res) => {
        this.detail = res.carAppFrom
        console.log(this.detail)
      })
    },
    async toOpr (type, state) {
      switch (type) {
        case 'mod': { // 订单修改
          if (this.detail.is_urgent === 0) {
            this.$router.push({
              path: '/applay',
              query: {
                applyId: this.id,
                operation_state: 2
              }
            })
          } else {
            this.$router.push({
              path: '/urgeApplay',
              query: {
                applyId: this.id,
                operation_state: 2
              }
            })
          }
          break
        }
        case 'cancel': { // 取消订单
          await cancelApply({
            applyId: this.id,
            type: 1
          }, (res) => {
            Toast.success('操作成功')
            setTimeout(() => {
              this.toBack()
            }, 1000)
          })
          break
        }
        case 'confirm': { // 确认
          const column = {
            3: 1, // 派车
            4: 2 // 费用
          }
          await affirmInfo({
            applyId: this.id,
            type: column[state]
          }, (res) => {
            Toast.success('操作成功')
            setTimeout(() => {
              this.toBack()
            }, 1000)
          })
          break
        }
        case 'fail': { // 重新申请
          if (this.detail.is_urgent === 0) {
            this.$router.push({
              path: '/applay',
              query: {
                applyId: this.id,
                operation_state: 1
              }
            })
          } else {
            this.$router.push({
              path: '/urgeApplay',
              query: {
                applyId: this.id,
                operation_state: 1
              }
            })
          }
          break
        }
        default:
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/commonDetail.less';
</style>
