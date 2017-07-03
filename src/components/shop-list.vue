<template>
  <ul>
    <transition-group>
      <list-item v-for="(shop, index) in shopsToDisplay"
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
import { searchShops, getShopsBySubtype } from '../service'
import ListItem from './list-item'
export default {
  components: {
    ListItem
  },
  data () {
    return {
      shopsToDisplay: []
    }
  },
  mounted () {
    this.loadShops()
  },
  methods: {
    async loadShops () {
      if (this.keyword) {
        this.shopsToDisplay = (await searchShops(this.keyword)).shopList
      } else if (this.subtype && this.subtype !== 'default') {
        this.shopsToDisplay = (await getShopsBySubtype(this.subtype)).shopList
      } else if (this.shops && this.shops.length > 0) {
        this.shopsToDisplay = this.shops
      }
      this.$emit('loaded', (this.shopsToDisplay || []).length)
    }
  },
  props: {
    shops: Array,
    keyword: String,
    subtype: String
  },
  watch: {
    keyword () {
      this.loadShops()
    },
    subtype () {
      this.loadShops()
    },
    shops () {
      this.loadShops()
    }
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
  overflow auto
  margin 0
  padding 0
  flex-grow 1
  background-color #f2f2f2
}
ul:after {
  content '没有更多结果了'
  display inline-block
  width 100%
  font-size 0.7rem
  color #AAAAAA
  text-align center
  margin-bottom 3rem
}
</style>
