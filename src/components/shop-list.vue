<template>
  <ul>
    <transition-group name="fade">
      <list-item v-for="(shop, index) in shops"
                 :key="index"
                 :iconSrc="shop.imgUrls[0].msrc"
                 :shopName="shop.shopName"
                 :tags="shop.shopTags"
                 :score="shop.shopScore"
      >
      </list-item>
    </transition-group>
  </ul>
</template>
<script>
import ListItem from './list-item'
export default {
  components: {
    ListItem
  },
  props: {
    shops: Array
  }
}
</script>
<style scoped lang="stylus">
.fade-enter {
  opacity 0
}
.fade-enter-active {
  transition opacity 0.3s
}
ul {
  list-style none
  margin 0
  padding 0
}
ul:after {
  content '没有更多结果了'
  display inline-block
  width 100%
  font-size 0.7rem
  color #AAAAAA
  text-align center
}
</style>
