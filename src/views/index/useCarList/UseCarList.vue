<template>
  <div class="useCarList">
    <header-bar bacColor="#fff">
      <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#333"/>
      <div slot="center">
        <span class="title fC333 f32 fBold">我的用车</span>
      </div>
      <div slot="right" class="title-right" @click="filtrate">
        <img src="@/assets/images/list-filter.png" alt="">
        <span class="f24 fC333">筛选</span>
      </div>
    </header-bar>
    <tabs v-model="currentIndex" color="#fff" title-active-color="#333" swipeable title-inactive-color="#999" @click="click">
      <tab v-for="(item, index) in list" :title="item.name" :key="index">
      </tab>
    </tabs>
    <div style="height:90vh;overflow:scroll">
      <Loadmore :top-method="loadTop"
                :bottom-method="loadBottom"
                :bottomAllLoaded="allLoaded"
                bottomPullText="上拉加载"
                bottomDropText="加载更多"
                :autoFill="false"
                ref="loadmore">
        <swipe @change="onChange" :initial-swipe="currentIndex" :show-indicators="false">
          <swipe-item v-for="(item, index) in list" :key="index">
            <div class="content" v-if="useCarData.length > 0">
              <ul class="list-box">
                <li v-for="(use, ind) in useCarData" :key="ind" @click="goDetail(use)">
                  <img v-real-img="use.img_path + use.car_picture" alt="">
                  <div class="list-center">
                    <h4 class="f28">{{ use.yong_che_no }}</h4>
                    <p>用车人：<span class="fC333">{{ use.yong_che_ren }}</span></p>
                    <p class="nowrap">出发地：<span class="green">{{ use.apply_use_address_1 }}<em v-if="use.apply_use_address_2">({{ use.apply_use_address_2 }})</em></span></p>
                    <p class="nowrap">目的地：<span class="blue">{{ use.apply_destination_1 }}<em v-if="use.apply_destination_2">({{ use.apply_destination_2 }})</em></span></p>
                  </div>
                  <div class="list-right">
                    <c-button class="btn-hollow" :clsName="stsCls[use.apply_flow_state]">{{use.apply_flow_state | stsTxt(use.apply_convoy_id)}}</c-button>
                  </div>
                </li>
              </ul>
            </div>
            <div class="no-data-wrapper"
                  v-else>
              <no-data></no-data>
            </div>
          </swipe-item>
        </swipe>
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
            <p class="title-item">订单编号</p>
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
            <field v-model="form.time1" placeholder="起始日期" disabled @click="toTimeClick(0)" />
          </cell-group>
          <cell-group>
            <p class="title-item">截止日期</p>
            <field v-model="form.time2" placeholder="截止日期" disabled @click="toTimeClick(1)" />
          </cell-group>
        </div>
        <div class="btn-box">
          <button @click="reset">重置</button>
          <button class="doOk" @click="submit">确定</button>
        </div>
      </div>
    </Popup>
    <!-- 起始时间弹窗 -->
    <action-sheet v-model="showDateTimeOut">
      <datetime-picker @cancel="timeCancel" @confirm="timeConfirm" :min-date="minDateOut" :max-date="maxDateOut" title="起始时间"></datetime-picker>
    </action-sheet>
    <!-- 截止时间弹窗 -->
    <action-sheet v-model="showDateTimeIn">
      <datetime-picker @cancel="timeCancel" @confirm="timeConfirm" :min-date="minDateIn" :max-date="maxDateIn" title="截止时间"></datetime-picker>
    </action-sheet>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar/header-bar'
import CButton from '@/components/button/button'
import { Icon, Tab, Tabs, Swipe, SwipeItem, Field, CellGroup, DatetimePicker, ActionSheet } from 'vant'
import { Loadmore, Popup } from 'mint-ui'
import 'mint-ui/lib/style.css'
import { useCarList } from '@/libs/const'
import { setStore, getStore } from '@/libs/util'
import moment from 'moment'
import NoData from '@/components/no-data/no-data'
export default {
  components: {
    HeaderBar,
    Icon,
    Tab,
    Tabs,
    Loadmore,
    Swipe,
    SwipeItem,
    CButton,
    Popup,
    Field,
    CellGroup,
    DatetimePicker,
    ActionSheet,
    NoData
  },
  data () {
    return {
      type: this.$route.query.type ? this.$route.query.type : 0,
      name: '',
      popupVisible: false,
      allLoaded: false,
      currentIndex: getStore('currIndex') ? JSON.parse(getStore('currIndex')) : 0,
      stsCls: {
        0: 'yellow',
        1: 'yellow',
        2: 'red',
        3: 'yellow',
        4: 'yellow',
        5: '',
        6: 'red',
        15: 'red'
      },
      list: [
        {
          key: '',
          name: '全部'
        },
        {
          key: '0',
          name: '待审批'
        },
        {
          key: '1',
          name: '待调派'
        },
        {
          key: '3',
          name: '待归队'
        },
        {
          key: '4',
          name: '待评价'
        },
        {
          key: '5',
          name: '已完成'
        }
      ],
      isLoading: false,
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
        flowId: '' // 订单类型
      },
      useCarData: [],
      // 时间弹窗部分
      showDateTimeOut: false,
      showDateTimeIn: false,
      timeType: '',
      minDateOut: new Date(2010, 10, 1),
      maxDateOut: new Date(2050, 10, 1),
      minDateIn: new Date(),
      maxDateIn: new Date(2050, 10, 1)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.form.flowId = this.list[this.currentIndex].key
      this.getCarList()
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
    }
  },
  methods: {
    loadTop () {
      this.form.pagest = 1
      this.getCarList()
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      this.form.pagest += 1
      this.getCarList('bottom')
      this.$refs.loadmore.onBottomLoaded()
    },
    onChange (index) {
      this.currentIndex = index
      this.form.flowId = this.list[index].key
      this.getCarList()
    },
    toBack () {
      setStore('currIndex', '')
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
      this.getCarList()
    },
    goDetail (item) {
      setStore('currIndex', this.currentIndex)
      this.$router.push({
        path: '/useCarDetail',
        query: {
          id: item.id
        }
      })
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
      this.getCarList()
    },
    closePopup () {
      this.popupVisible = false
    },
    async getCarList (flag) {
      await useCarList(this.form, (res) => {
        if (res.total - (this.form.limit * this.form.pagest) > 0) {
          this.allLoaded = false
        } else {
          this.allLoaded = true
        }
        if (flag === 'bottom') {
          this.useCarData = this.useCarData.concat(res.rows)
        } else {
          this.useCarData = res.rows
        }
      })
    },
    // 时间弹窗部分
    toTimeClick (type) {
      this.timeType = type
      if (type === 0) {
        this.showDateTimeOut = true
      } else {
        this.showDateTimeIn = true
      }
    },
    timeCancel () {
      this.showDateTimeOut = false
      this.showDateTimeIn = false
    },
    timeConfirm (value) {
      const val = moment(value).format('YYYY-MM-DD HH:mm')
      switch (this.timeType) {
        case 0: this.form.time1 = val; this.minDateIn = value; break
        case 1: this.form.time2 = val; this.maxDateOut = value; break
        default:
      }
      this.showDateTimeOut = false
      this.showDateTimeIn = false
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/commonList';
</style>
