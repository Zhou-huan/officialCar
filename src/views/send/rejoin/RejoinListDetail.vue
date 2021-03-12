<template>
  <div class="detail">
    <header-bar bacColor="#fff">
      <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#333"/>
      <div slot="center">
        <span class="title fC333 f32 fBold">归队详情</span>
      </div>
    </header-bar>
    <div class="title"><span>订单号：{{ detail.yong_che_no }}</span>
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
    <ul class="detail-list f28">
      <li>
        <span class="fCccc">用车事由：</span>{{ detail.apply_remark_str }}
      </li>
      <li>
        <span class="fCccc">用车部门：</span> {{ detail.apply_dept_name }}
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
    <div v-if="detail.apply_flow_state !== 3" class="mileage-info">
      <h3>里程信息</h3>
      <ul>
        <li>
          <h4>{{detail.apply_start_lm}}</h4>
          <p>起始路码</p>
        </li>
        <li>
          <h4>{{detail.apply_end_lm}}</h4>
          <p>终止路码</p>
        </li>
        <li>
          <h4>{{detail.xs_km}}</h4>
          <p>行驶里程</p>
        </li>
        <li>
          <h4>{{detail.gps_km}}</h4>
          <p>GPS里程</p>
        </li>
      </ul>
    </div>
    <template v-else>
      <div class="form-box" v-if="(detail.apply_convoy_id !== 0 && detail.apply_type === 1 && detail.car_sharing_apply_id === 0) || (detail.apply_convoy_id !== 0 && detail.apply_type === 0)">
        <div class="title"><img src="@/assets/images/applay_danwei.png" alt="">订单补充</div>
          <cell-group>
            <p class="title-item">是否使用叉车</p>
            <div class="change-box">
                <radio-group v-model="form.have_forklift" direction="horizontal">
                  <radio :name="1">是</radio>
                  <radio :name="0">否</radio>
                </radio-group>
            </div>
          </cell-group>
        <cell-group>
           <p class="title-item">工人人数</p>
            <field v-model="form.worker_num" placeholder="请输入人数" type="number"/>
        </cell-group>
        <template v-if="form.worker_num > 0">
          <cell-group>
            <p class="title-item">工人工时</p>
              <field v-model="form.worker_hours" placeholder="请输入工时(小时)" type="number"/>
          </cell-group>
        </template>
        <cell-group>
           <p class="title-item">出车时间</p>
           <div class="change-box">
             <input v-model="form.apply_use_time_str" class="timeText" disabled/><img  @click="changeTime(0)"  src="@/assets/images/applay_time.png" alt="" style="width:24px;height:24px">
           </div>
        </cell-group>
        <cell-group>
           <p class="title-item">归队时间</p>
           <div class="change-box">
              <input v-model="form.return_time_str" class="timeText" disabled/><img  @click="changeTime(2)" src="@/assets/images/applay_time.png" alt="" style="width:24px;height:24px">
           </div>
        </cell-group>
        <cell-group>
           <p class="title-item">出车天数</p>
          <field v-model="form.chucheNum" type="number" placeholder="请输入出车天数" v-validate="'required'" data-vv-as="出车天数" :name="'chucheNum'"/>
          <span v-show="errors2.has('chucheNum')" class="help is-error">{{errors2.first('chucheNum')}}</span>
        </cell-group>
        <cell-group>
          <p class="title-item">起始路码</p>
          <field v-model="form.apply_start_lm"  type="number" placeholder="请输入起始路码"  v-validate="'required'" data-vv-as="起始路码" :name="'apply_start_lm'"/>
          <span v-show="errors2.has('apply_start_lm')" class="help is-error">{{errors2.first('apply_start_lm')}}</span>
        </cell-group>
        <cell-group>
          <p class="title-item">终止路码</p>
          <field v-model="form.apply_end_lm"  type="number" placeholder="请输入终止路码" v-validate="'required'" data-vv-as="终止路码" :name="'apply_end_lm'"/>
          <span v-show="errors2.has('apply_end_lm')" class="help is-error">{{errors2.first('apply_end_lm')}}</span>
        </cell-group>
        <cell-group class="gps-box">
          <p class="title-item">行驶里程</p>
          <field v-model="form.xingshi_km" v-validate="'required'"  type="number" data-vv-as="GPS里程" :name="'xingshi_km'"/>
          <span v-show="errors2.has('xingshi_km')" class="help is-error">{{errors2.first('xingshi_km')}}</span>
        </cell-group>
        <cell-group class="gps-box">
          <p class="title-item">GPS里程</p>
          <field v-model="form.gps_km" placeholder="请输入GPS里程" type="number" disabled v-validate="'required'" data-vv-as="GPS里程" :name="'gps_km'"/>
          <span v-show="errors2.has('gps_km')" class="help is-error">{{errors2.first('gps_km')}}</span>
          <button class="get-gps blue" @click="getGPSDistance">获取</button>
        </cell-group>
        <cell-group>
           <p class="title-item">行驶备注</p>
          <field v-model="form.travel_remark" placeholder="请输入行驶备注"/>
        </cell-group>
      </div>
      <div class="btn-box" v-if="isShowBtn">
        <button @click="doSubmit" class="backCar" v-if="detail.apply_flow_state === 3 && detail.apply_convoy_id !== 0 && detail.apply_type === 1 && detail.car_sharing_apply_id === 0">归队</button>
        <button @click="doSubmit" class="backCar" v-if="detail.apply_flow_state === 3 && detail.apply_convoy_id !== 0 && detail.apply_type === 0">归队</button>
      </div>
    </template>
      <action-sheet v-model="timeShow">
      <datetime-picker
      v-if="showTimeOut"
      v-model="currentDate"
      type="datetime"
      title="选择预计出车时间"
      :min-date="minDate"
      :max-date="maxDateOut"
      @confirm="confirmTimeOut"
      @cancel="cancelTime"
      />
      <datetime-picker
      v-if="showTimeIn"
      v-model="currentDate"
      type="datetime"
      title="选择预计归队时间"
      :min-date="minDateIn"
      :max-date="maxDate"
      @confirm="confirmTimeIn"
      @cancel="cancelTime"
      />
      </action-sheet>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar/header-bar'
import CButton from '@/components/button/button'
import { Icon, CellGroup, Field, DatetimePicker, ActionSheet, RadioGroup, Radio } from 'vant'
import { getApplyInfoById, getAddBackCar, getCPSDistance, getMatchedApplyInfo } from '@/libs/const'
import { getDaysBetween, getPrivilege } from '@/libs/util'
import '@/validate'
import moment from 'moment'
export default {
  components: {
    HeaderBar,
    Icon,
    CButton,
    CellGroup,
    Field,
    DatetimePicker,
    ActionSheet,
    RadioGroup,
    Radio
  },
  data () {
    return {
      detail: {},
      isShowBtn: false,
      id: this.$route.query.id,
      stsCls: {
        3: 'yellow',
        5: ''
      },
      isShowShare: false,
      timeShow: false,
      showTimeIn: false,
      showTimeOut: false,
      minDate: new Date(),
      maxDateOut: new Date(2025, 10, 1),
      minDateIn: new Date(),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      shareList: [],
      form: {
        apply_use_time_str: '', // 用车时间（格式 yyyy-MM-dd HH:mm）
        return_time_str: '', // 归队时间
        id: '', // 订单id
        type_id: 1, // 状态（1新增、2修改)
        xingshi_km: '', // 里程
        gps_km: '', // GPS里程
        chucheNum: '', // 出车天数
        apply_start_lm: '', // 开始路码
        apply_end_lm: '', // 结束路码
        worker_num: 0, // 工人人数
        have_forklift: 0, // 使用叉车(1使用，0没用)
        worker_hours: 0, // 工人工时
        have_worker: 0, // 是否使用工人(1使用，0没使用)只要工人数量大于1就传1
        travel_remark: '' // 行驶备注
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.isShowBtn = getPrivilege([102])
      this.getDetail()
      this.getShareList()
    })
  },
  filters: {
    stsTxt (flow) {
      let text = ''
      if (flow === 3) {
        text = '未归队'
      } else {
        text = '已归队'
      }
      return text
    },
    getWeek (val) {
      return moment(val).format('dddd')
    }
  },
  methods: {
    // 工人人数改变
    // workNumChange (e) {
    //   if (e <= 0) {
    //     this.form.have_worker = 0
    //     this.form.worker_hours = 0
    //   } else {
    //     this.form.have_worker = 1
    //   }
    // },
    // 计算天数差
    getDays () {
      this.form.chucheNum = Math.ceil(getDaysBetween(this.form.apply_use_time_str, this.form.return_time_str))
    },
    // 计算路码差
    getRoadCode () {
      this.form.xingshi_km = this.form.apply_end_lm - this.form.apply_start_lm
    },
    toBack () {
      this.$router.push({
        path: '/rejoinList',
        query: {
          currentIndex: this.$route.query.currentIndex
        }
      })
    },
    // 获取GPS里程
    getGPSDistance () {
      getCPSDistance({
        startTime: this.form.apply_use_time_str,
        endTime: this.form.return_time_str,
        carId: this.detail.apply_car_id
      }, res => {
        this.form.gps_km = res.gpsKM
      })
    },
    async getDetail () {
      await getApplyInfoById({ applyId: this.id }, (res) => {
        this.detail = res.carAppFrom
        this.form.id = this.detail.id
        this.form.return_time_str = this.detail.apply_back_time_str
        this.form.apply_use_time_str = this.detail.apply_use_time_str
        this.form.xingshi_km = this.detail.xingshi_km ? this.detail.xingshi_km : ''
        this.form.apply_start_lm = this.detail.apply_start_lm ? this.detail.apply_start_lm : ''
        this.form.apply_end_lm = this.detail.apply_end_lm ? this.detail.apply_end_lm : ''
        this.form.travel_remark = this.detail.travel_remark ? this.detail.travel_remark : ''
      })
    },
    getShareList () {
      getMatchedApplyInfo({ applyId: this.id }, res => {
        this.shareList = res.rows
      })
    },
    // 时间选择部分
    confirmTimeOut (value) {
      this.form.apply_use_time_str = moment(value).format('YYYY-MM-DD HH:mm')
      this.timeShow = false
      this.minDateIn = value
    },
    confirmTimeIn (value) {
      this.form.return_time_str = moment(value).format('YYYY-MM-DD HH:mm')
      this.maxDateOut = value
      this.timeShow = false
    },
    cancelTime () {
      this.timeShow = false
    },
    changeTime (flag) {
      this.timeShow = true
      if (flag === 0) {
        this.showTimeOut = true
        this.showTimeIn = false
      } else {
        this.showTimeIn = true
        this.showTimeOut = false
      }
    },
    doSubmit () {
      this.form.worker_num = Number(this.form.worker_num)
      this.form.worker_hours = Number(this.form.worker_hours)
      this.$validator.validateAll().then(async (valid) => {
        if (valid) {
          if (this.form.worker_num > 0 && this.form.worker_hours <= 0) {
            this.$toast({
              message: '工时必须大于0',
              duration: 1000,
              className: 'toastStyle'
            })
            return
          }
          if (this.form.worker_num < 0) {
            this.form.have_worker = 0
            this.form.worker_hours = 0
            this.$toast({
              message: '工人人数不能小于0',
              duration: 1000,
              className: 'toastStyle'
            })
            return
          } else if (this.form.worker_num > 0) {
            this.form.have_worker = 1
            if (this.form.worker_hours <= 0) {
              this.$toast({
                message: '工时必须大于0',
                duration: 1000,
                className: 'toastStyle'
              })
              return
            }
          } else {
            this.form.have_worker = 0
            this.form.worker_hours = 0
          }
          // Number(this.form.apply_start_lm) > Number(this.form.apply_end_lm)
          if (this.form.xingshi_km <= 0) {
            this.$toast({
              message: '起始码小于终止码!',
              duration: 1000,
              className: 'toastStyle'
            })
            return
          }
          getAddBackCar(this.form, res => {
            this.$toast({
              message: '归队成功',
              duration: 1000,
              className: 'toastStyle',
              onClose: () => {
                this.$router.push('/rejoinList')
              }
            })
          })
        }
      })
    }
  },
  watch: {
    'form.apply_use_time_str' () {
      this.getDays()
    },
    'form.return_time_str' () {
      this.getDays()
    },
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
    .form-box {
        margin-top: 20px;
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
        .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
            border-width: 0px;
        }
        .van-cell-group {
            border-bottom: 1px solid #eee;
        }
        .van-cell::after {
            border: 0;
        }
        .help {
            padding: 0 0 10px;
        }
        .title {
            font-size: 28px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            padding: 20px 0;
            color: #B0B2B8;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start !important;
            img {
                width: 30px;
                height: 30px;
                padding-right: 5px;
            }
        }
        .title-item {
            font-size: 24px;
            color: #999;
            padding: 20px 0 0px;
        }
        .van-cell {
            padding: 20px 0;
        }
        .gps-box {
            position: relative;
            .get-gps {
                width: 88px;
                height: 44px;
                border: 1px solid #3378F1;
                border-radius: 22px;
                position: absolute;
                right: 30px;
                top: 45px;
            }
        }
    }
    .mileage-info {
      padding: 30px 0;
      h3 {
        color: orange;
        font-size: 30px;
        padding: 30px 0px 10px;
        border-bottom: 1px solid #eee;
      }
      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          text-align: center;
          font-size: 28px;
          h4 {
            padding: 30px 0;
            font-size: 32px;
          }
        }
      }
    }
  .change-box {
      padding: 20px 0;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .timeText {
          font-size: 24px;
          border: 0;
          flex: 1;
          resize:none; // 去掉右下角的三角
      }
      input:disabled {
          background-color: #fff;
      }
      textarea:disabled {
          background-color: #fff;
      }
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
  .backCar {
    width: 100%;
    height: 76px;
    background: #3378F1;
    border-radius: 8px;
    border: 0;
    color: #fff;
    margin: 0 10px;
    font-size: 32px;
  }
@import '../../../assets/css/commonDetail.less';
</style>
