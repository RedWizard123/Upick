<template>
  <div class="root" ref="root">
    <swiper ref="swiper" :options="swiperOption">
      <swiper-slide v-for="(shopsInSubtype, i) in shopsInSubtypes" :key="i">
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
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
// import { Swipe, SwipeItem } from 'vue-swipe'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

import { searchShops, getShopsBySubtype } from '../service'
import ListItem from './list-item'
export default {
  components: {
    ListItem,
    swiper,
    swiperSlide
  },
  data () {
    return {
      scrollEventHandler: 0,
      initialHeight: undefined,
      shopsInSubtypes: [],
      swiperOption: {
        // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        // grabCursor: true,
        // setWrapperSize: true,
        autoHeight: true,
        // pagination: '.swiper-pagination',
        // paginationClickable: true,
        // prevButton: '.swiper-button-prev',
        // nextButton: '.swiper-button-next',
        // scrollbar: '.swiper-scrollbar',
        // mousewheelControl: true,
        // observeParents: true,
        // if you need use plugins in the swiper, you can config in here like this
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        // more Swiper configs and callbacks...
        // ...
        onSlideChangeEnd () {}
      }
    }
  },
  mounted () {
    setTimeout(() => {
      // this.loadShops()
      this.$nextTick(() => {
        this.initialHeight = this.$refs.root.clientHeight + 'px'
        this.$refs.swiper.options.onSlideChangeEnd = this.onSlideChangeEnd
      })
    }, 100)
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
          (this.$refs['listItems' + i] || []).forEach((listItem) => {
            listItem.checkLazyLoad()
          })
        }
      }, 100)
    },
    onSlideChangeEnd (swiper) {
      const index = swiper.activeIndex
      this.lazyLoadCheck(index)
      /**
       * 换页事件
       */
      window.requestAnimationFrame(() => {
        this.$emit('pageChange', index)
      })
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
      setTimeout(() => {
        this.loadShops()
      }, 400)
    },
    shops () {
      this.loadShops()
    },
    $route (to) {
      let a = (this.subtype || []).findIndex(ele => ele === to.params.subtype)
      this.$refs.swiper.swiper.slideTo(a = a === -1 ? 0 : a)
    }
  }
}
</script>
<style scoped lang="stylus">
.root {
  width 100%
  flex-grow 1
  // overflow hidden
}
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
