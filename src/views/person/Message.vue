<template>
  <div class="message">
      <header-bar bacColor="#fff">
        <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#333"/>
        <div slot="center">
          <span class="title fC333 fBold">消息中心</span>
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
            <ul class="message-list" v-if="listData.length > 0">
                <li v-for="(item, index) in listData" :key="index">
                    <h3 class="f32 fC333 fBold">用车消息<span class="f24" style="padding-left:5px">{{item.send_time}}</span></h3>
                    <p class="f28">{{item.send_msg}}</p>
                </li>
            </ul>
            <div class="no-data-wrapper" v-else>
              <no-data></no-data>
            </div>
        </Loadmore>
      </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar/header-bar'
import { Icon } from 'vant'
import { Loadmore } from 'mint-ui'
import { messageCenter } from '@/libs/const'
import NoData from '@/components/no-data/no-data'
import 'mint-ui/lib/style.css'
export default {
  components: {
    HeaderBar,
    Icon,
    Loadmore,
    NoData
  },
  data () {
    return {
      allLoaded: false,
      listData: [],
      form: {
        pagest: 1,
        limit: 5
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    toBack () {
      this.$router.go(-1)
    },
    getList (type) {
      messageCenter(this.form, res => {
        if (res.total - ((this.form.pagest) * this.form.limit) > 0) {
          this.allLoaded = false
        } else {
          this.allLoaded = true
        }
        if (type === 'bottom') {
          this.listData = this.listData.concat(res.rows)
        } else {
          this.listData = res.rows
        }
      })
    },
    loadTop () {
      this.form.pagest = 1
      this.getList()
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      this.form.pagest += 1
      this.getList('bottom')
      this.$refs.loadmore.onBottomLoaded()
    }
  }
}
</script>

<style lang="less" scoped>
.message {
  padding: 120px 0;
  background: #eff0f0;
  box-sizing: border-box;
  // min-height: 100%;
    /deep/.mint-loadmore{
    .mint-loadmore-top, .mint-loadmore-bottom{
        text-align: center;
    }
    .mint-loadmore-text{
        font-size: 30px;
    }
    }
  .message-list {
      padding: 0 36px;
      min-height: 85vh;
      li {
        padding: 26px;
        margin-top: 26px;
        background: #FFFFFF;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        p {
            padding: 26px 0px;
            border-bottom: 1px solid #eee;
            color: #737373;
        }
        h5 {
            padding-top: 20px;
        }
      }
  }
}
</style>
