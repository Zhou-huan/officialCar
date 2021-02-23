<template>
  <div class="useCarList costList">
    <header-bar bacColor="#fff" style="border-bottom: 1px solid #eee">
      <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#333"/>
      <div slot="center">
        <span class="title fC333 f32 fBold">我的费用</span>
      </div>
      <div slot="right" class="title-right" @click="filtrate">
        <img src="@/assets/images/list-filter.png" alt="">
        <span class="f24 fC333">筛选</span>
      </div>
    </header-bar>
    <div style="height:90vh;overflow:scroll">
      <Loadmore :top-method="loadTop"
                :bottom-method="loadBottom"
                :bottomAllLoaded="allLoaded"
                bottomPullText="上拉加载"
                bottomDropText="加载更多"
                :autoFill="false"
                ref="loadmore">
                  <div class="content" v-if="evaluateData.length > 0">
                    <ul class="list-box">
                      <li v-for="(item, index) in evaluateData" :key="index" @click="goDetail(item)">
                        <img :src="item.img_path + item.car_picture" alt="">
                        <div class="list-center">
                          <h4 class="f28">{{item.yong_che_no}}</h4>
                          <p>出发地：<span class="green">{{ item.apply_use_address_1 }}<em v-if="item.apply_use_address_2">({{ item.apply_use_address_2 }})</em></span></p>
                          <p>目的地：<span class="blue">{{ item.apply_destination_1 }}<em v-if="item.apply_destination_2">({{ item.apply_destination_2 }})</em></span></p>
                          <p>总里程：<span class="fC333">{{ item.xs_km }}km</span></p>
                        </div>
                        <div class="list-right">
                          {{ item.allMoney }}元
                          <h4 v-if="item.is_settle_accounts === 0 && item.apply_flow_state === 4">待确认</h4>
                        </div>
                      </li>
                    </ul>
              </div>
              <div class="no-data-wrapper"
                   v-else>
                <no-data></no-data>
              </div>
  </Loadmore>
  </div>
      <!-- 筛选框 -->
      <Popup
      v-model="popupVisible"
      position="right">
      <div class="filter-box">
        <h3>筛选<img src="@/assets/images/list-shouqi.png" alt="" @click="closePopup"></h3>
        <div class="form-box">
          <cell-group>
            <p class="title-item">用车编号</p>
            <field v-model="form.yongCheNo" placeholder="请输入订单编号" />
          </cell-group>
          <cell-group>
            <p class="title-item">用车单位</p>
            <field v-model="form.deptName" placeholder="请输入用车单位" />
          </cell-group>
          <cell-group>
            <p class="title-item">乘车人</p>
            <field v-model="form.yongCheRen" placeholder="请输入乘车人" />
          </cell-group>
          <cell-group>
            <p class="title-item">驾驶员</p>
            <field v-model="form.driverName" placeholder="请输入驾驶员" />
          </cell-group>
          <cell-group>
            <p class="title-item">车牌号码</p>
            <field v-model="form.carNum" placeholder="请输入车牌号码" />
          </cell-group>
          <cell-group>
            <p class="title-item">起始日期</p>
            <field v-model="form.time1" placeholder="起始日期" disabled @click="toTimeClick('start')" />
          </cell-group>
          <cell-group>
            <p class="title-item">截止日期</p>
            <field v-model="form.time2" placeholder="截止日期" disabled @click="toTimeClick('end')" />
          </cell-group>
        </div>
        <div class="btn-box">
          <button @click="reset">重置</button>
          <button class="doOk" @click="submit">确定</button>
        </div>
      </div>
    </Popup>
    <!-- 时间选择框 -->
    <action-sheet v-model="showDateTime">
      <datetime-picker @cancel="timeCancel" @confirm="timeConfirm" v-if="showDateTime" :title="this.timeType === 'start' ? '起始时间' : '截止时间'"></datetime-picker>
    </action-sheet>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar/header-bar'
import NoData from '@/components/no-data/no-data'
import { Icon, Field, CellGroup, DatetimePicker, ActionSheet } from 'vant'
import { Loadmore, Popup } from 'mint-ui'
import { useCarList } from '@/libs/const'
import moment from 'moment'
import 'mint-ui/lib/style.css'
export default {
  components: {
    HeaderBar,
    Icon,
    Loadmore,
    Popup,
    Field,
    CellGroup,
    DatetimePicker,
    ActionSheet,
    NoData
  },
  mounted () {
    this.$nextTick(() => {
      this.getEvaluateList()
    })
  },
  data () {
    return {
      form: {
        limit: 10,
        pagest: 1,
        yongCheNo: '', // 订单号
        deptName: '', // 单位名称
        yongCheRen: '', // 乘车人
        driverName: '', // 驾驶员
        carNum: '', // 车牌号
        time1: '', // 起始时间
        time2: '', // 截止时间
        flowId: '4,5' // 订单类型
      },
      detailData: {}, // 详情数据
      type: this.$route.query.type ? this.$route.query.type : 0,
      name: '',
      popupVisible: false,
      allLoaded: false,
      currentIndex: 0,
      carList: [
        {
          name: '商务车',
          active: false,
          id: '123123'
        },
        {
          name: '商务车1',
          active: false,
          id: '22'
        },
        {
          name: '商务车2',
          active: false,
          id: '454545'
        },
        {
          name: '商务车3',
          active: false,
          id: '123133323'
        },
        {
          name: '商务车4',
          active: false,
          id: '1231355523'
        },
        {
          name: '商务车5',
          active: false,
          id: '77777'
        }
      ],
      stsCls: {
        0: 'yellow',
        1: 'yellow',
        2: 'red',
        3: 'yellow',
        4: 'yellow',
        5: ''
      },
      evaluateData: [],
      isLoading: false,
      showDateTime: false,
      timeType: ''
    }
  },
  filters: {
    stsTxt (flow) {
      let text = ''
      const obj = {
        0: '待审批',
        1: '',
        2: '审批驳回',
        3: '带归队',
        4: '待评价',
        5: '已完成'
      }
      text = obj[flow]
      return text
    }
  },
  methods: {
    unitChange (e) {
      this.form.unit = e.dicName
    },
    reasonChange (e) {
      this.form.reason = e.dicName
    },
    // 获取列表数据
    async getEvaluateList (flag) {
      await useCarList(this.form, (res) => {
        if (res.total - (this.form.limit * this.form.pagest) > 0) {
          this.allLoaded = false
        } else {
          this.allLoaded = true
        }
        if (flag === 'bottom') {
          this.evaluateData = this.useCarData.concat(res.rows)
        } else {
          this.evaluateData = res.rows
        }
      })
    },
    toTimeClick (type) {
      this.timeType = type
      this.showDateTime = true
    },
    timeCancel () {
      this.showDateTime = false
    },
    timeConfirm (value) {
      const val = moment(value).format('YYYY-MM-DD HH:mm')
      switch (this.timeType) {
        case 'start': this.form.time1 = val; break
        case 'end': this.form.time2 = val; break
        default:
      }
      this.showDateTime = false
    },
    loadTop () {
      this.form.pagest = 1
      this.getEvaluateList()
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      this.form.pagest += 1
      this.getEvaluateList()
      this.$refs.loadmore.onBottomLoaded()
    },
    onChange (index) {
      this.currentIndex = index
      this.form.flowId = this.list[index].key
      this.getEvaluateList()
    },
    toBack () {
      this.$router.push({
        path: '/index',
        query: {
          active: 0
        }
      })
    },
    click (index) {
      this.currentIndex = index
      this.form.flowId = this.list[index].key
      this.getEvaluateList()
    },
    goDetail (item) {
      this.$router.push({
        path: '/costDetail',
        query: {
          item: item
        }
      })
    },
    // 筛选部分功能
    toggleType (index, item) {
      this.carList[index].active = !this.carList[index].active
      if (this.carList[index].active) {
        this.form.carType.push(item.id)
      } else {
        this.form.carType.splice(this.form.carType.indexOf(item.id), 1)
      }
    },
    filtrate () {
      this.popupVisible = true
    },
    reset () {
      Object.keys(this.form).forEach((key) => {
        if (!['limit', 'pagest'].includes(key)) {
          this.form[key] = ''
        }
      })
    },
    submit () {
      this.popupVisible = false
      this.getEvaluateList()
    },
    closePopup () {
      this.popupVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.list-right {
  font-size: 30px;
  color: orange
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 90%;
  background-color: #fff;
  .detail-title {
    width: 100%;
    height: 80px;
    background-color: rgb(49, 120, 179);
    color: #fff;
    text-align: center;
    font-size: 32px;
    line-height: 80px;
    position: relative;
    .close-text {
      position: absolute;
      right: 20px;
      top: 0;
      font-size: 28px;
    }
  }
  .detail-data {
    padding: 10px;
    box-sizing: border-box;
    color: #333;
    width: 100%;
    font-size: 28px;
    li {
      line-height: 2em;
      border-bottom: 1px solid #eee;
    }
  }
}
.van-overlay {
  z-index: 999;
}
@import '../../../assets/css/commonList.less';
</style>
