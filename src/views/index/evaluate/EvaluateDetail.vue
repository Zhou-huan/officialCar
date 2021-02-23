<template>
  <div class="dispatch-detail">
    <header-bar bacColor="#fff">
      <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#333"/>
      <div slot="center">
        <span class="title fC333 f32 fBold">评价详情</span>
      </div>
    </header-bar>
    <div class="detail-item">
        <img :src="detailData.img_path + detailData.car_picture" alt="">
        <div class="detail-right">
            <p class="fC333 fBold"><span></span>{{detailData.yong_che_no}}</p>
            <p class="fC999"><span>总里程：</span>{{detailData.xs_km}}km</p>
            <p class="fC999"><span>总费用：</span>{{detailData.allMoney}}元</p>
        </div>
    </div>
    <div class="detail-btn">
        <ul class="f24">
          <li v-for="(item, index) in carList" :key="index" :class="{active:item.active}" @click="toggleType(index,item)">{{item.name}}</li>
        </ul>
        <textarea name="" class="text-remark" placeholder="请输入评价内容" v-model="form.evaluate_remark"></textarea>
    </div>
    <div class="comment" v-if="isShowBtn">
        <button @click="change">{{detailData.plid === 0 ? '评论' : '修改评价'}}</button>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar/header-bar'
import { addEvaluate } from '@/libs/const'
import { getPrivilege } from '@/libs/util'
import { Icon } from 'vant'
export default {
  components: {
    HeaderBar,
    Icon
  },
  data () {
    return {
      isShowBtn: false,
      carList: [
        {
          name: '非常满意',
          active: false,
          id: 1
        },
        {
          name: '满意',
          active: false,
          id: 2
        },
        {
          name: '一般',
          active: false,
          id: 3
        },
        {
          name: '不满意',
          active: false,
          id: 4
        }
      ],
      detailData: {},
      form: {
        evaluate_type: 1, // 评价等级
        apply_id: '', // 订单id
        evaluate_remark: '', // 评价备注
        evaluateId: 0// 评价id
      }
    }
  },
  mounted () {
    this.detailData = this.$route.query.param
    if (this.detailData.plid !== 0) {
      let index = this.detailData.evaluate_type - 1
      this.carList[index].active = true
      this.form.evaluate_type = this.detailData.evaluate_type
    } else {
      this.form.evaluate_type = 1
      this.carList[0].active = true
    }
    this.form.evaluate_remark = this.detailData.plbz
    this.form.apply_id = this.detailData.id
    this.form.evaluateId = this.$route.query.param.plid
    // 按钮权限设置
    this.isShowBtn = getPrivilege([25])
  },
  methods: {
    toBack () {
      this.$router.push({
        path: '/evaluateList',
        query: {
          currentIndex: this.$route.query.currentIndex
        }
      })
    },
    // 筛选部分功能
    toggleType (index, item) {
      this.carList.forEach((val, index) => {
        val.active = false
      })
      this.carList[index].active = true
      if (this.carList[index].active) {
        this.form.evaluate_type = item.id
      }
    },
    change () {
      addEvaluate(this.form, res => {
        this.$toast({
          message: '成功',
          duration: 1000,
          className: 'toastStyle',
          onClose: () => {
            this.$router.push({
              path: '/evaluateList',
              query: {
                currentIndex: this.$route.query.currentIndex
              }
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.dispatch-detail {
    padding:120px 36px 40px;
    font-size: 24px;
    .detail-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 190px;
        background: #FFFFFF;
        box-shadow: 0px 2px 12px 0px rgba(51, 51, 51, 0.08);
        border-radius: 12px;
        padding: 10px;
        box-sizing: border-box;
        font-size: 28px;
        .detail-right {
            p {
                padding-bottom: 10px;
            }
        }
        img {
            height: 100px;
            margin-right: 25px;
        }
    }
    .detail-btn {
        padding-top: 70px;
            ul {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            padding-bottom: 60px;
            li {
              padding: 0px 16px;
              height: 50px;
              border-radius: 20px;
              text-align: center;
              line-height: 50px;
              border: 1px solid #ccc;
              color: #ccc;
              margin-top: 15px;
              margin-right: 20px;
            }
            .active {
              background-color: #3378F1;
              border: 0;
              color: #fff;
            }
          }
          .text-remark {
            width: 100%;
            height: 300px;
            border: 1px solid #999;
            resize:none;
          }
        button {
            width: 128px;
            height: 56px;
            border: 1px solid #CCCCCC;
            border-radius: 8px;
            margin-right: 20px;
            background: #fff;
        }
    }
    .comment {
        width: 100%;
        padding: 36px;
        position: fixed;
        bottom: 0;
        left: 0;
        text-align: center;
        button {
            width: 480px;
            height: 76px;
            background: #3378F1;
            border-radius: 8px;
            border: 0;
            color: #fff;
            font-size: 32px;
        }
    }
}
</style>
