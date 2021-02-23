<template>
  <button :class="clsName" :style="styles" @click="cEvent($event)"><slot></slot></button>
</template>
<script>
export default {
  name: 'c-button',
  props: {
    clsName: {
      type: String,
      default: ''
    },
    styles: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    cEvent (e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="less" scoped>
  /*空心*/
  button{
    display: block;
    font-weight: 500;
    outline: none;
    border-radius: 4px;
    padding: 8px;
    box-sizing: border-box;
    border: 0;
    line-height: 1;
    -webkit-appearance:button;
  }
  .btn-hollow{
    border-radius:20px;
    font-size: 24px;
    &.small{
      font-size:20px;
      padding: 5px 7px;
    }
    &.red{  //红色
      color: #FC3232;
      background:rgba(251,207,207,1);
      border:1px solid rgba(251,64,64,1);
    }
    &.blue{ //蓝色
      color: #2D69FF;
      border: 1px solid #2D69FF;
      background: #E7EEFE;
    }
    &.green{ //绿色
      color: #2DBC8C;
      background:#CBECE1;
      border:1px solid #27BA88;
    }
    &.purple{ //紫色
      color: #9A27F2;
      background:#E0C7F3;
      border:1px solid #9A27F2;
    }
    &.yellow{ //黄色
      color: #FFCC00;
      background:#fdfbf1;
      border:1px solid#FFCC00;
    }
  }

  /*实心*/
  .btn-solid{
    color: #fff;
    border-radius: 4px;
    &.small{
      font-size:22px;
      padding: 8px 12px;
    }
    &.large{
      width: 100%;
      font-size:30px;
      font-weight:500;
      height: 80px;
      border-radius: 10px;
    }
    &.green{
      background: #0BA91A;
    }
    &.orange{
      background: #FF7800;
    }
    &.purple{
      background: #AB6CFB;
    }
    &.red{
      background: #FC3232;
    }
    &.blue{
      background: #1a65e1;
    }
  }
</style>
