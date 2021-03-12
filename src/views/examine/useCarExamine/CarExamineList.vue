<template>
  <div class="useCarList">
    <header-bar bacColor="#fff">
      <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#333"/>
      <div slot="center">
        <span class="title fC333 f32 fBold">用车审批</span>
      </div>
      <div slot="right" class="title-right" @click="filtrate">
        <img src="@/assets/images/list-filter.png" alt="">
        <span class="f24 fC333">筛选</span>
      </div>
    </header-bar>
    <tabs v-model="currentIndex" color="#fff" title-active-color="#333" swipeable title-inactive-color="#999" @click="click" style="width: 100%;">
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
            <div class="content"  v-if="listData.length > 0">
              <ul class="list-box">
                <li v-for="(use, ind) in listData" :key="ind" @click="goDetail(use)">
                  <img v-real-img="use.img_path + use.car_picture" alt="">
                  <div class="list-center" style="flex-grow: 1;">
                    <h4 class="f28">{{ use.yong_che_no }}</h4>
                    <p>用车人：<span class="fC333">{{ use.yong_che_ren }}</span></p>
                    <p class="nowrap">出发地：<span class="green">{{ use.apply_use_address_1 }}<em v-if="use.apply_use_address_2">({{ use.apply_use_address_2 }})</em></span></p>
                    <p class="nowrap">目的地：<span class="blue">{{ use.apply_destination_1 }}<em v-if="use.apply_destination_2">({{ use.apply_destination_2 }})</em></span></p>
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
            <p class="title-item">部门名称</p>
            <field v-model="form.deptName" placeholder="请输入部门名称" />
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
import { setStore, getStore } from '@/libs/util'
import { Icon, Tab, Tabs, Swipe, SwipeItem, Field, CellGroup, DatetimePicker, ActionSheet } from 'vant'
import { Loadmore, Popup } from 'mint-ui'
import 'mint-ui/lib/style.css'
import { auditList } from '@/libs/const'
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
        2: 'red'
      },
      list: [
        {
          key: '0',
          name: '待审批'
        },
        {
          key: '1',
          name: '已审批'
        },
        {
          key: '2',
          name: '审批驳回'
        }
      ],
      isLoading: false,
      form: {
        limit: 10,
        pagest: 1,
        yongCheNo: '', // 订单编号
        deptName: '', // 单位名称
        time1: '', // 起始时间
        time2: '', // 截止时间
        type: '0' // 数据类型
      },
      listData: [],
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
      this.form.type = this.list[this.currentIndex].key
      this.getList()
    })
  },
  methods: {
    loadTop () {
      this.form.pagest = 1
      this.getList()
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      this.form.pagest += 1
      this.getList('bottom')
      this.$refs.loadmore.onBottomLoaded()
    },
    onChange (index) {
      this.currentIndex = index
      this.form.type = this.list[index].key
      this.getList()
    },
    toBack () {
      setStore('currIndex', '')
      this.$router.push({
        path: '/examine',
        query: {
          active: 1
        }
      })
    },
    click (index) {
      this.currentIndex = index
      this.form.type = this.list[index].key
      this.getList()
    },
    goDetail (item) {
      setStore('currIndex', this.currentIndex)
      this.$router.push({
        path: '/examineDetail',
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
        if (!['limit', 'pagest', 'type'].includes(key)) {
          this.form[key] = ''
        }
      })
    },
    submit () {
      this.popupVisible = false
      this.getList()
    },
    closePopup () {
      this.popupVisible = false
    },
    async getList (flag) {
      await auditList(this.form, (res) => {
        if (res.total - (this.form.limit * this.form.pagest) > 0) {
          this.allLoaded = false
        } else {
          this.allLoaded = true
        }
        if (flag === 'bottom') {
          this.listData = this.listData.concat(res.rows)
        } else {
          this.listData = res.rows
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
