<template>
  <div class="login">
      <div class="login-icon">
        <img src="../../assets/images/login_chuanshi.png" alt="">
      </div>
      <div class="btn-box">
        <button @click="fastLogin()">企业微信用户一键登录</button>
        <button @click="doSubmit()" class="special-btn">账号密码登录</button>
      </div>
      <p class="form-bottom">智慧公务用车管理系统</p>
  </div>
</template>

<script>
import { setStore, getPrivilege } from '@/libs/util'
import '@/validate'
import { phoneLogin, useCarIndexCode, examineIndexCode, sendCarIndexCode } from '@/libs/const'
import Cookies from 'js-cookie'
// import { hexMd5 } from '@/libs/md5'
export default {
  data () {
    return {
      qywxCode: ''
    }
  },
  methods: {
    fastLogin () {
      this.qywxCode = this.getUrlParam('code')
      phoneLogin({
        code: this.qywxCode
      }, res => {
        if (res.flag) {
          setStore('userBean', res.userBean)
          Cookies.set('JSESSIONID', res.userBean.sessionId)
          this.$toast({
            message: res.msg,
            duration: 1000,
            className: 'toastStyle',
            onClose: () => {
              if (res.userBean.is_type === 1) {
                this.$router.push({
                  path: '/driveCar',
                  query: {
                    active: 3
                  }
                })
              } else if (getPrivilege(useCarIndexCode)) {
                this.$router.push({
                  path: '/index',
                  query: {
                    active: 0
                  }
                })
              } else if (getPrivilege(examineIndexCode)) {
                this.$router.push({
                  path: '/examine',
                  query: {
                    active: 1
                  }
                })
              } else if (getPrivilege(sendCarIndexCode)) {
                this.$router.push({
                  path: '/sendCar',
                  query: {
                    active: 2
                  }
                })
              } else {
                return false
              }
            }
          })
        } else {
          this.$toast({
            message: res.msg,
            duration: 1000,
            className: 'toastStyle'
          })
        }
      })
    },
    getUrlParam (name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      let r = window.location.search.substr(1).match(reg)
      if (r !== null) {
        return decodeURI(r[2])
      } else {
        return null
      }
    },
    doSubmit () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.login {
    height: 100vh;
    width: 100%;
    background: #EBF2F5 url('../../assets/images/login_bg.png') center top no-repeat;
    background-size: 750px 700px;
    padding: 100px 30px 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .login-icon {
      width: 100%;
      text-align: center;
      img {
        width: 200px;
        height: 200px;
      }
    }
    .btn-box {
      width: 100%;
      display: flex;
      flex-direction: column;
        button {
          width: 100%;
          height: 80px;
          background-color: rgb(13, 122, 211);
          color: #fff;
          border: 0;
          font-size: 28px;
        }
        .special-btn {
          background-color: #EBF2F5;
          color: #000;
        }
    }
    .form-bottom {
        width: 293px;
        height: 28px;
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        opacity: 0.65;
        margin: 280px auto 0;
    }
}
</style>
