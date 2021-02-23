<template>
    <ul v-if="dataList.length" class="tree">
        <li v-for="(item, index) in dataList" :key="index">
            <div class="tree-title" @click="chooseItems(item)">
                <div>
                    <template v-if="item.child && item.child.length">
                        <img @click.stop="changeItem(item, item.isExpand)" class="icons" src="../../assets/images/close.png" alt="" v-if="item.isExpand">
                        <img @click.stop="changeItem(item, item.isExpand)" class="icons" src="../../assets/images/open.png" alt="" v-else>
                    </template>
                    {{item.name}}
                </div>
            </div>
            <div class="tree-box">
                <TreeBox :data="item.child" v-show="item.isExpand" @changeOne="changeChild"></TreeBox>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'TreeBox',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      checked: false,
      dataList: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.dataList = this.data
    })
  },
  methods: {
    changeItem (list, val) {
      if (list.child && list.child.length > 0) {
        this.$set(list, 'isExpand', !val)
      }
    },
    chooseItems (item) {
      this.$emit('changeOne', item)
    },
    changeChild (item) {
      this.$emit('changeOne', item)
    }
  }
}
</script>

<style lang="less" scoped>
.tree {
  background: #fff;
  padding-left: 26px;
  .tree-title {
      padding: 26px 20px 26px 0px;
      font-size: 34px;
      border-bottom: 1px solid #eee;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      &:active {
        background-color: #eee;
      }
      .icons {
          width: 40px;
          height: 40px;
          margin-right: 5px;
      }
  }
}
</style>
