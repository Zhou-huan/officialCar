<template>
  <div class="detail">
    <header-bar bacColor="#fff">
      <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#333"/>
      <div slot="center">
        <span class="title fC333 f32 fBold">任务详情</span>
      </div>
    </header-bar>
    <div class="title"><span>订单号：{{ detail.yong_che_no }}</span>
      <c-button class="btn-hollow" :clsName="stsCls[detail.apply_flow_state]">
        {{ detail.apply_flow_state | stsTxt(detail.driverDDZT) }}
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
    <div class="user-box f28">
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
        <span class="fCccc">备注信息：</span>{{ detail.apply_bz }}
      </li>
    </ul>
    <div class="btn-box" v-if="detail.apply_flow_state===3 && detail.driverDDZT!==4">
      <div class="right">
        <button @click="show = true">回车</button>
      </div>
    </div>
    <popup v-model="show">
      <div class="back-form">
        <h3>请输入行车的费用</h3>
        <cell-group>
          <p class="title-item">起始路码</p>
          <field v-model="form.apply_start_lm" type="number" placeholder="请输入起始路码" v-validate="'required'" data-vv-as="起始路码" :name="'apply_start_lm'"/>
        </cell-group>
        <span v-show="errors2.has('apply_start_lm')" class="help is-error">{{errors2.first('apply_start_lm')}}</span>
        <cell-group>
          <p class="title-item">终止路码</p>
          <field v-model="form.apply_end_lm" type="number" placeholder="请输入终止路码" v-validate="'required'" data-vv-as="终止路码" :name="'apply_end_lm'"/>
        </cell-group>
        <span v-show="errors2.has('apply_end_lm')" class="help is-error">{{errors2.first('apply_end_lm')}}</span>
        <cell-group>
          <p class="title-item">行驶路码</p>
          <field v-model="form.xs_km" placeholder="请输入行驶路码" disabled v-validate="'required'" data-vv-as="行驶路码" :name="'xs_km'"/>
        </cell-group>
        <span v-show="errors2.has('xs_km')" class="help is-error">{{errors2.first('xs_km')}}</span>
        <cell-group>
          <p class="title-item">行驶备注</p>
          <textarea v-model="form.travel_remark" class="timeText" placeholder="请输入行驶备注"/>
        </cell-group>
        <div class="btn-box">
          <button @click="show = false">取消</button>
          <button @click="doSubmit">确定</button>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar/header-bar'
import CButton from '@/components/button/button'
import { getApplyInfoById, driverBackCar } from '@/libs/const'
import { Icon, Popup, Field, CellGroup } from 'vant'
import moment from 'moment'
import '@/validate'
export default {
  components: {
    HeaderBar,
    Icon,
    CButton,
    Popup,
    Field,
    CellGroup
  },
  data () {
    return {
      show: false,
      detail: {},
      id: this.$route.query.id,
      stsCls: {
        0: 'yellow',
        1: ''
      },
      form: {
        id: this.$route.query.id,
        apply_start_lm: '', // 起始路码
        apply_end_lm: '', // 结束路码
        xs_km: '', // 里程数
        travel_remark: '' // 行驶备注
      }
    }
  },
  mounted () {
    this.getDetail()
  },
  filters: {
    // apply_flow_state=3&&  driverDDZT！=4
    stsTxt (flow, driverDDZT) {
      let text = ''
      if (flow === 3 && driverDDZT !== 4) {
        text = '未回车'
      } else {
        text = '已回车'
      }
      return text
    },
    getWeek (val) {
      return moment(val).format('dddd')
    }
  },
  methods: {
    async getDetail () {
      await getApplyInfoById({ applyId: this.id }, (res) => {
        this.detail = res.carAppFrom
      })
    },
    // 计算路码差
    getRoadCode () {
      this.form.xs_km = this.form.apply_end_lm - this.form.apply_start_lm
    },
    doSubmit () {
      this.$validator.validateAll().then(async (valid) => {
        if (valid) {
          if (this.form.xs_km <= 0) {
            this.$toast({
              message: '起始码必须小于终止码!'
            })
            return false
          }
          driverBackCar(this.form, res => {
            this.$toast({
              message: '回车成功',
              duration: 1000,
              className: 'toastStyle',
              onClose: () => {
                this.$router.push('/taskList')
                this.show = false
              }
            })
          })
        }
      })
    },
    toBack () {
      this.$router.push({
        path: '/taskList',
        query: {
          currentIndex: this.$route.query.currentIndex
        }
      })
    }
  },
  watch: {
    'form.apply_end_lm' () {
      this.getRoadCode()
    },
    'form.apply_start_lm' () {
      this.getRoadCode()
    }
  }
}
</script>

<style lang="less" scoped>
.right {
  width: 100%;
  button {
    width: 100% !important;
  }
}
.back-form {
  padding: 20px 40px;
  .btn-box {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    button {
      width: 160px;
      height: 80px;
      background-color: #3378F1;
      color: #fff;
      border: 0;
      font-size: 28px;
      border-radius: 5px;
    }
  }
  .timeText {
      width: 500px;
      font-size: 24px;
      border: 0;
      flex: 1;
      resize:none; // 去掉右下角的三角
      &::-webkit-input-placeholder {
          font-size: 28px;
          color:#c8c9cc;
      }
  }
  input:disabled {
      background-color: #fff;
  }
  textarea:disabled {
      background-color: #fff;
  }
  h3 {
    font-size: 28px;
  }
  .title-item {
      font-size: 24px;
      color: #333;
  }
  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
      border-width: 0px;
  }
  .van-cell::after {
      border: 0;
  }
  .van-cell-group {
    width:500px;
    padding: 20px 0px;
    border-bottom: 1px solid #eee;
    .van-cell {
      padding: 0px;
    }
  }
}
@import '../../../assets/css/commonDetail.less';
</style>
