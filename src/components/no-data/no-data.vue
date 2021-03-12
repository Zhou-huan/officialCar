<template>
  <div class="no-data">
    <img src="@/assets/images/quesheng.png">
    <div class="word" v-if="isShowWord">{{word}}</div>
  </div>
</template>
<script>
export default {
  name: 'no-data',
  props: {
    word: {
      type: String,
      default: '无数据'
    },
    isShowWord: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="less">
  .no-data{
    text-align: center;
    padding-top: 100px;
    width: 100%;
    height: 70vh;
    img{
      width: 300px;
      height: 300px;
    }
    .word{
      text-align: center;
      color: #97979C;
      font-size: 28px;
    }
  }
</style>
