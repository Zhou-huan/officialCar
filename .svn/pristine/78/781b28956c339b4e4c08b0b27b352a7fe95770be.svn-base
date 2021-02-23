<template>
  <div class="header-bar" :style="{'background': bacColor, 'justifyContent': justifyContent}">
      <div class="left">
        <slot name="left">
          <i class="iconfont icon-fanhui" @click="toBack" v-if="isShowLeft"></i>
        </slot>
      </div>
    <div class="center"><slot name="center">{{title}}</slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script>
export default {
  name: 'header-bar',
  props: {
    isShowLeft: { // 左侧内容是否显示
      type: Boolean,
      default: true
    },
    title: { // 标题内容
      type: String,
      default: ''
    },
    bacColor: { // 头部背景
      type: String,
      default: '#1880E8'
    },
    justifyContent: { // 头部样式
      type: String,
      default: 'space-between'
    }
  },
  methods: {
    toBack () {
      this.$emit('toBack')
    }
  }
}
</script>
<style lang="less" scoped>
  .header-bar{
    width: 100%;
    display: flex;
    background-color: #3378F1;
    height: 90px;
    line-height: 90px;
    padding: 0 30px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    align-items: center;
    .left{
      display: flex;
      align-items: center;
      flex-direction: row;
      width: 15%;
      text-align: left;
      .icon-fanhui{
        color: #fff;
        font-size: 40px;
        vertical-align: top;
      }
    }
    .right{
      width: 15%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      line-height: 1;
      .iconfont, a{
        display: block;
        margin-left: 11px;
      }
      .iconfont{
        color: #fff;
        font-size: 40px;
      }
      a{
        font-size:32px;
        font-weight:500;
        color:#fff;
      }
    }
    .center{
      font-size:34px;
      font-weight:500;
      color:#fff;
      text-align: center;
    }
  }
</style>
