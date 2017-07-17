<template>
  <swipe :auto="0" :continous="false" ref="swipe" :showIndicators="false">
    <swipe-item v-for="(shopsInSubtype, i) in shopsInSubtypes" :key="i">
      <ul @scroll="lazyLoadCheck(i)" :style="{ 'height': initialHeight }">
        <list-item v-for="(shop, index) in shopsInSubtype"
                   :key="index"
                   :ref="'listItems' + i"
                   :iconSrc="shop.imgs[0].msrc ? shop.imgs[0].msrc : shop.imgs[0].src"
                   :shopName="shop.shopName"
                   :tags="shop.shopTags"
                   :score="shop.shopScore"
        >
        </list-item>
      </ul>
    </swipe-item>
  </swipe>
</template>
<script>
import { Swipe, SwipeItem } from 'vue-swipe'
import { searchShops, getShopsBySubtype } from '../service'
import ListItem from './list-item'
export default {
  components: {
    ListItem,
    Swipe,
    SwipeItem
  },
  data () {
    return {
      scrollEventHandler: 0,
      initialHeight: undefined,
      shopsInSubtypes: []
    }
  },
  mounted () {
    this.loadShops()
    this.$nextTick(() => {
      this.initialHeight = this.$refs.swipe.$el.clientHeight + 'px'
    })
  },
  methods: {
    async loadShops () {
      if (this.keyword) {
        // this.shopsToDisplay = (await searchShops(this.keyword)).shopList
        this.shopsInSubtypes = (await Promise.all(this.keyword.map(searchShops))).map(result => result.shopList)
      } else if (this.subtype && this.subtype !== 'default') {
        // this.shopsToDisplay = (await getShopsBySubtype(this.subtype)).shopList
        this.shopsInSubtypes = (await Promise.all(this.subtype.map(getShopsBySubtype))).map(result => result.shopList)
      } else if (this.shops && this.shops.length > 0) {
        this.shopsInSubtypes = this.shops
      }
      this.$nextTick(() => {
        this.$emit('loaded', (this.shopsInSubtypes || []).length)
        this.lazyLoadCheck(0)
      })
    },
    lazyLoadCheck (i) {
      clearTimeout(this.scrollEventHandler)
      this.scrollEventHandler = setTimeout(() => {
        if (this.shopsInSubtypes && this.shopsInSubtypes.length > 0) {
          this.$refs['listItems' + i].forEach((listItem) => {
            listItem.checkLazyLoad()
          })
        }
      }, 100)
    }
  },
  props: {
    shops: Array,
    keyword: Array,
    subtype: Array
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
    },
    $route (to) {
      let a = this.subtype.findIndex(ele => ele === to.params.subtype)
      console.log(a)
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
