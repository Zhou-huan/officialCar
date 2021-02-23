<template>
  <div class="login">
    <header-bar bacColor="#ebf2f5">
      <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#333"/>
      <div slot="center">
        <span class="title fC333 fBold">登录</span>
      </div>
    </header-bar>
    <div class="form-box">
      <img src="../../assets/images/login_chuanshi.png" alt="" class="login-icon">
      <div class="filed-box">
        <img class="icon-common" src="../../assets/images/login_username.png" alt="">
          <field
        v-model="form.name"
        :name="'username'" v-validate="'required|max:20'"
        placeholder="请输入账号"
        data-vv-as="账号"
        clearable
      />
      </div>
      <span v-show="errors2.has('username')" class="help is-error">{{errors2.first('username')}}</span>
      <div class="filed-box">
        <img class="icon-common" src="../../assets/images/login_password.png" alt="">
          <field
        v-model="form.pass"
        :name="'password'" v-validate="'required|max:20'"
        placeholder="请输入密码"
        data-vv-as="密码"
        :type="type"
      />
      <img class="field-pwd" src="../../assets/images/hidden.png" alt="" style="width:24px;height:24px" @click="type = 'text'" v-if="type === 'password'">
      <img class="field-pwd" src="../../assets/images/show.png" alt="" style="width:24px;height:24px" @click="type = 'password'" v-if="type === 'text'">
      </div>
      <span v-show="errors2.has('password')" class="help is-error">{{errors2.first('password')}}</span>
      <div class="login-bottom">
        <checkbox v-model="checked" shape="square">记住密码</checkbox>
        <span @click="forgetUser">忘记密码？</span>
      </div>
      <div class="btn-box">
          <Button type="info" @click="doSubmit()">登录</Button>
      </div>
    </div>
    <p class="form-bottom">智慧公务用车管理系统</p>
  </div>
</template>

<script>
import { Button, Field, Checkbox, Icon } from 'vant'
import HeaderBar from '@/components/header-bar/header-bar'
import { setStore, getStore, getPrivilege } from '@/libs/util'
import '@/validate'
import { login, useCarIndexCode, examineIndexCode, sendCarIndexCode, getUrl } from '@/libs/const'
import Cookies from 'js-cookie'
// import { hexMd5 } from '@/libs/md5'
export default {
  name: 'Home',
  components: {
    Button,
    Field,
    Checkbox,
    HeaderBar,
    Icon
  },
  data () {
    return {
      form: {
        name: '',
        pass: ''
      },
      qywxCode: '',
      access_token: '',
      checked: true,
      type: 'password'
    }
  },
  mounted () {
    let remU = getStore('rememberUser') ? JSON.parse(getStore('rememberUser')) : {}
    if (Object.keys(remU).length !== 0) {
      this.form = remU
    }
  },
  methods: {
    toBack () {
      getUrl({}, res => {
        window.location.href = res.oauth2Url
      })
    },
    async doSubmit () {
      this.$validator.validateAll().then(async (valid) => {
        if (valid) {
          await login(
            this.form,
            (res) => {
              if (this.checked) {
                setStore('rememberUser', this.form)
              } else {
                setStore('rememberUser', '')
              }
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
            }
          )
        }
      })
    },
    forgetUser () {
      this.checked = false
    }
  }
}
</script>

<style lang="less" scoped>
@import 'login';
</style>
