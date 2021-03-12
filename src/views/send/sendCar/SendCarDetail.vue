<template>
  <div class="detail">
    <header-bar bacColor="#fff">
      <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#333"/>
      <div slot="center">
        <span class="title fC333 f32 fBold">派车详情</span>
      </div>
    </header-bar>
    <div class="title">
      <span>订单号：{{ detail.yong_che_no }}</span>
      <c-button class="btn-hollow" :clsName="stsCls[detail.apply_flow_state]">
        {{ detail.apply_flow_state | stsTxt(detail.apply_convoy_id) }}
      </c-button>
    </div>
    <div class="root">
      <h4>{{ detail.apply_use_address_1 }}<span v-if="detail.apply_use_address_2">({{ detail.apply_use_address_2 }})</span></h4>
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
    <div class="user-box f28" v-if="detail.apply_driver_name">
      <div class="user">
        <div class="fC999">驾驶员：<span class="fC333 fBold">{{ detail.apply_driver_name }}</span></div>
        <span>{{ detail.dirverPhone }}</span>
      </div>
    </div>
    <div class="user-box f28">
      <div class="user">
        <div class="fC999">用车人：<span class="fC333 fBold">{{ detail.yong_che_ren }}</span></div>
        <span>{{ detail.apply_use_phone }}</span>
      </div>
      <div>
        <p v-if="detail.car_num">车牌号：{{ detail.car_num }}</p>
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
    <div class="user-box f28">
      <div class="user">
          <div class="fC999">车队队长：<span class="fC333 fBold">{{ detail.convoy_leader_name }}</span></div>
          <span>{{ detail.convoy_leader_phone }}</span>
      </div>
    </div>
    <ul class="detail-list f28">
      <li>
        <span class="fCccc">审批记录：</span>{{ detail.audit_str}}
      </li>
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
      <li v-if="detail.apply_flow_state === 2">
        <span class="fCccc">反馈原因：</span>{{ detail.apply_check_yj }}
      </li>
    </ul>
    <template v-if="detail.apply_type === 1">
      <div class="form-box">
        <h3 class="order-title"  @click="isShowShare = !isShowShare "><span>拼车信息</span>
          <icon name="arrow-up" size="24px" v-if="!isShowShare"/>
          <icon name="arrow-down" size="24px" v-else/>
        </h3>
        <div class="order-box" v-if="isShowShare">
          <ul class="order-ul" v-for="(item, index) in shareList" :key="index">
            <li>订单号：<span>{{ item.yong_che_no }}</span></li>
            <li>用车部门：<span>{{ item.apply_dept_name }}</span></li>
            <li>用车人：<span>{{ item.yong_che_ren }}</span></li>
            <li>出发时间：<span>{{ item.apply_use_time_str }}</span></li>
            <li>归队时间：<span>{{ item.apply_back_time_str }}</span></li>
            <li>出发地：<span>{{ item.apply_use_address_1 }}</span><span v-if="item.apply_use_address_2">({{ item.apply_use_address_2 }})</span></li>
            <li>目的地：<span>{{ item.apply_destination_1 }}</span><span v-if="item.apply_destination_2">({{ item.apply_destination_2 }})</span></li>
          </ul>
        </div>
      </div>
    </template>
    <div class="btn-box" style="justify-content: center;" v-if="isShowBtn">
      <div class="right" v-if="detail.apply_flow_state === 1 && detail.apply_convoy_id !== 0">
        <button @click="toOpr('send')" v-if="detail.apply_flow_state === 1 && detail.apply_convoy_id !== 0 && detail.apply_type === 0">派车</button>
        <button @click="toOpr('send')" v-if="detail.apply_flow_state === 1 && detail.apply_convoy_id !== 0 && detail.apply_type === 1 && detail.car_sharing_apply_id === 0">派车</button>
        <!-- <button @click="toOpr('detail')" v-if="detail.apply_flow_state === 1 && detail.apply_convoy_id !== 0 && detail.apply_type === 1">拼车详情</button> -->
      </div>
      <div class="right right-btn-multiple" v-if="detail.apply_flow_state === 3 && detail.apply_convoy_id !== 0 ">
        <!-- <button @click="toOpr('detail')" v-if="detail.apply_flow_state === 3 && detail.apply_convoy_id !== 0 && detail.apply_type === 1">拼车详情</button> -->
        <template  v-if="detail.apply_flow_state === 3 && detail.apply_type === 1 && detail.car_sharing_apply_id === 0">
          <button @click="toOpr('cancel')">取消订单</button>
          <button @click="toOpr('dispatch')">重新派车</button>
        </template>
        <template  v-if="detail.apply_flow_state === 3 && detail.apply_type === 0">
          <button @click="toOpr('cancel')">取消订单</button>
          <button @click="toOpr('dispatch')">重新派车</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 判断
 * apply_flow_state:
 * 1. = 0 待审批
 * 2. = 1 && (apply_convoy_id = 0 待调度, apply_convoy_id ！= 0 待派车)
 * ** apply_convoy_id != 0 待派车：
 * ** apply_type（0正常订单、1拼车订单）,  car_sharing_apply_id（0主订单（拼单详情和派车）、不等于0的为从订单(只有拼车详情)，其保存的是主订单id）
 * ** apply_type = 0 || (apply_type = 1 && car_sharing_apply_id = 0 ) 时 重新调度 取消调度
 * 3. = 2 审批驳回
 * 4. = 3 待归队
 * 5. = 4 待评价
 * 6. = 5 已完成
 */
import HeaderBar from '@/components/header-bar/header-bar'
import { Icon, Toast } from 'vant'
import { getApplyInfoById, cancelApply, getMatchedApplyInfo } from '@/libs/const'
import CButton from '@/components/button/button'
import { getPrivilege } from '@/libs/util'
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
      isShowShare: false,
      id: this.$store.state.sendCarData.id,
      shareList: [],
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
      this.isShowBtn = getPrivilege([101])
      this.getDetail()
      this.getShareList()
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
    getShareList () {
      getMatchedApplyInfo({ applyId: this.id }, res => {
        this.shareList = res.rows
      })
    },
    toBack () {
      this.$store.commit('setOrderData', '')
      this.$router.push({
        path: '/sendCarList'
      })
    },
    async getDetail () {
      await getApplyInfoById({ applyId: this.id }, (res) => {
        this.detail = res.carAppFrom
      })
    },
    async toOpr (type, state) {
      switch (type) {
        case 'send': { // 派车
          this.$store.commit('setOrderData', this.detail)
          this.$router.push({
            path: '/changeIndex'
          })
          break
        }
        case 'detail': { // 详情
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
        case 'dispatch': { // 重新派车
          this.$store.commit('setOrderData', this.detail)
          this.$router.push({
            path: '/changeIndex'
          })
          break
        }
        default:
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .order-title {
    color: orange;
    border-bottom: 1px solid #eee;
    font-size: 30px;
    padding: 30px 0px 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .order-box {
    .order-ul {
      font-size: 28px;
      border-bottom: 1px solid #eee;
      padding: 20px 0;
      color: #999;
      li {
        line-height: 1.8em;
        span {
          color: #666;
        }
      }
    }
  }
  @import '../../../assets/css/commonDetail.less';
</style>
