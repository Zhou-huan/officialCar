<template>
  <div class="change-pwd">
      <header-bar bacColor="#fff">
        <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#333"/>
        <div slot="center">
          <span class="title fC333 fBold">修改手机号码</span>
        </div>
      </header-bar>
      <div class="form-box">
        <cell-group>
          <p class="title-item blue">新手机号码</p>
          <field v-model="form.phone" placeholder="请输入新手机号码" v-validate="'required|phoneRules'" data-vv-as="手机号码" :name="'phone'"/>
        </cell-group>
        <span v-show="errors2.has('phone')" class="help is-error">{{errors2.first('phone')}}</span>
        <cell-group>
          <p class="title-item fC999">密码</p>
          <field v-model="form.pass1" placeholder="请输入登录密码"  v-validate="'required'" data-vv-as="密码" :name="'pass1'"/>
          <span v-show="errors2.has('pass1')" class="help is-error">{{errors2.first('pass1')}}</span>
        </cell-group>
      </div>
      <div class="btn-box">
        <button class="btn" @click="doSubmit">提交</button>
      </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar/header-bar'
import { Icon, Field, CellGroup } from 'vant'
import { changePhonePwd } from '@/libs/const'
import { getStore } from '@/libs/util'
import '@/validate'
export default {
  components: {
    HeaderBar,
    Icon,
    Field,
    CellGroup
  },
  data () {
    return {
      form: {
        userId: getStore('userBean') ? JSON.parse(getStore('userBean')).id : 0,
        phone: '',
        pass1: ''
      }
    }
  },
  methods: {
    toBack () {
      this.$router.go(-1)
    },
    doSubmit () {
      this.$validator.validateAll().then(async (valid) => {
        if (valid) {
          changePhonePwd(this.form, res => {
            this.$toast({
              message: '手机号码修改成功',
              duration: 1000,
              className: 'toastStyle',
              onClose: () => {
                this.form.pass1 = ''
                this.form.phone = ''
                this.$router.go(-1)
              }
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.change-pwd {
  padding: 120px 0;
  background: #eff0f0;
  box-sizing: border-box;
  height: 100%;
  .form-box {
    font-size: 24px;
    padding: 0 36px;
    background: #fff;
    .title-item {
      padding-top: 20px;
    }
    .van-cell {
      padding: 10px 0;
    }
  }
  .explain {
    font-size: 24px;
    color: #ccc;
    padding: 20px 36px;
  }
  .btn-box {
    width: 100%;
    box-sizing: border-box;
    padding:220px 136px;
    font-size: 32px;
    .btn {
      width: 100%;
      height: 76px;
      background: #3378F1;
      border-radius: 8px;
      color:#fff;
      border:0;
      margin: 0 auto;
    }
  }
}
</style>
