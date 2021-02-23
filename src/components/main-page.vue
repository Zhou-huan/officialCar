<template>
  <div class="main-page">
    <header-bar bacColor="#f4f6f7">
      <div slot="left">
        <img @click="editPerson" class="icons" src="../assets/images/personal.png" alt="">
      </div>
      <div slot="center">
        <span class="title">公务用车管理系统</span>
      </div>
      <!-- <div slot="right">
        <img class="icons" src="../assets/images/search.png" alt="">
      </div> -->
    </header-bar>
    <router-view />
    <Tabbar v-model="active" @change="onChange" active-color="#737373" inactive-color="#ccc">
    <TabbarItem replace to="/index">
      <span>用车</span>
      <template #icon="props">
        <img :src="props.active ? icon.useCarActive : icon.useCar" />
      </template>
    </TabbarItem>
    <TabbarItem  replace to="/examine">
      <span>审批</span>
      <template #icon="props">
        <img :src="props.active ? icon.examineActive : icon.examine" />
      </template>
    </TabbarItem>
      <!-- <button class="add-btn" @click="add">+</button> -->
    <TabbarItem replace to="/sendCar">
      <span>派车</span>
      <template #icon="props">
        <img :src="props.active ? icon.sendCarActive : icon.sendCar" />
      </template>
    </TabbarItem>
    <TabbarItem replace to="/driveCar">
      <span>驾驶</span>
      <template #icon="props">
        <img :src="props.active ? icon.driveCarActive : icon.driveCar" />
      </template>
    </TabbarItem>
    </Tabbar>
    <!-- 弹框 -->
    <div class="more" v-show="moreShow">
      <div class="title">
        <p class="fC333 f48">30</p>
        <div class="f24 fC999">
          星期一<br>
          11/2020
        </div>
      </div>
      <img src="../assets/images/other-pic1.png" alt="" class="banner">
      <ul class="function-list f28 fC999">
        <li>
          <img src="../assets/images/other-cljiankong.png" alt="">
          <p>车辆监控</p>
        </li>
        <li>
          <img src="../assets/images/other-yjdaohang.png" alt="">
          <p>一键导航</p>
        </li>
        <li>
          <img src="../assets/images/other-lxditu.png" alt="">
          <p>离线地图</p>
        </li>
      </ul>
      <h3 @click="closeMore">关闭</h3>
    </div>
      <!-- 编辑个人信息 -->
      <popup v-model="showPerson" position="left" :style="{ width: '70%', height: '100%' }" >
        <div class="person-header">
          <div>
            <img src="../assets/images/person-touxiang.png" alt="">
            <h3 class="f32">{{userBean.user_name}}</h3>
            <p class="f24">{{userBean.user_dept_name}}</p>
          </div>
        </div>
        <ul class="person-list f24">
          <li @click="goChange(0)">
            <img src="../assets/images/person-mima.png" alt="">
            <span>修改密码</span>
          </li>
          <li @click="goChange(1)">
            <img src="../assets/images/person-shoujihao.png" alt="">
            <span>修改手机号</span>
          </li>
          <li @click="goChange(2)">
            <img src="../assets/images/person-xiaoxi.png" alt="">
            <span>消息中心</span>
          </li>
          <li @click="goChange(3)">
            <img src="../assets/images/person-tuichu.png" alt="">
            <span>退出账号</span>
          </li>
        </ul>
      </popup>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Popup } from 'vant'
import { getStore, getPrivilege } from '@/libs/util'
import HeaderBar from '@/components/header-bar/header-bar'
import { useCarIndexCode, examineIndexCode, sendCarIndexCode } from '@/libs/const'
export default {
  components: {
    Tabbar,
    TabbarItem,
    HeaderBar,
    Popup
  },
  data () {
    return {
      active: 0,
      userBean: JSON.parse(getStore('userBean')) ? JSON.parse(getStore('userBean')) : '',
      showPerson: false,
      moreShow: false,
      icon: {
        useCarActive: require('../assets/images/index-yongcheS.png'),
        useCar: require('../assets/images/index-yongche1.png'),
        examineActive: require('../assets/images/index-shengpiS.png'),
        examine: require('../assets/images/index-shengpi.png'),
        sendCarActive: require('../assets/images/index-zhipaiS.png'),
        sendCar: require('../assets/images/index-zhipai.png'),
        driveCarActive: require('../assets/images/index-jiashiS.png'),
        driveCar: require('../assets/images/index-jiashi.png')
      },
      preIndex: 0
    }
  },
  mounted () {
    if (this.$route.query && this.$route.query.active) {
      this.active = Number(this.$route.query.active)
      this.preIndex = Number(this.$route.query.active)
    }
  },
  methods: {
    editPerson () {
      this.showPerson = true
    },
    goChange (num) {
      switch (num) {
        case 0: this.$router.push('/changePwd'); break
        case 1: this.$router.push('/changePhone'); break
        case 2: this.$router.push('/message'); break
        default: this.$router.push('/login'); break
      }
    },
    onChange (index) {
      if (this.userBean.is_type === 1) {
        if (this.active !== 3) {
          this.active = this.preIndex
          return this.$toast({
            message: '暂无权限',
            duration: 1000,
            className: 'toastStyle'
          })
        } else {
          this.active = index
          this.preIndex = this.active
        }
      } else if (this.userBean.user_type === 1) {
        this.active = index
      } else {
        let boo = false
        switch (this.active) {
          case 0: {
            boo = getPrivilege(useCarIndexCode)
            break
          }
          case 1: {
            boo = getPrivilege(examineIndexCode)
            break
          }
          case 2: {
            boo = getPrivilege(sendCarIndexCode)
            break
          }
          case 3: {
            boo = false
            break
          }
          default:
        }
        if (boo) {
          this.active = index
          this.preIndex = this.active
        } else {
          this.active = this.preIndex
          return this.$toast({
            message: '暂无权限',
            duration: 1000,
            className: 'toastStyle'
          })
        }
      }
    },
    add () {
      this.moreShow = true
    },
    closeMore () {
      this.moreShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.main-page {
  min-height: 100vh;
  background: rgb(242, 245, 244);
  .icons {
      width: 36px;
      height: 36px;
  }
  .title {
      color: #333;
      font-weight: bold;
  }
  .van-tabbar {
    height: 96px !important;
      .add-btn {
      width: 108px;
      height: 56px;
      background: #3378F1;
      box-shadow: 0px 2px 16px 0px rgba(53, 78, 217, 0.24);
      border-radius: 28px;
      border: 0;
      line-height: 0;
      font-size: 58px !important;
      color: #fff;
      margin-top: 10px;
    }
  }
  .more {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgb(255, 255, 255);
    z-index: 999;
    padding: 100px 56px 0;
    box-sizing: border-box;
    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      p {
        padding-right: 10px;
      }
    }
    .banner {
      height: 400px;
      width: 100%;
      margin-bottom: 100px;
    }
    .function-list {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      li {
        text-align: center;
        img {
          width: 96px;
          height: 96px;
          padding-bottom: 26px;
        }
      }
    }
    h3 {
      width: 100%;
      margin: 0 auto;
      height: 88px;
      line-height: 88px;
      text-align: center;
      font-size: 32px;
      color: #ccc;
      border-top: 1px solid #eee;
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
      .van-popup {
        background-color: #202020;
        color: #fff;
        .person-header {
            height: 412px;
            background: #383838;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            p {
               opacity: 0.8;
               padding-top: 10px;
            }
            img {
                width: 128px;
                height: 128px;
            }
        }
        .person-list {
            li {
                margin: 20px 0;
                height: 60px;
                line-height: 60px;
                padding-left: 50px;
                img {
                    width: 30px;
                    height: 30px;
                    padding-right: 40px;
                }
            }
        }
    }
}
</style>
