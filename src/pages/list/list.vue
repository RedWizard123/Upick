<template>
  <div class="list">
    <div class="top-bar">
      <router-link to="/search"></router-link>
      <div class="subtype-selector">
        <div class="wrapper">
          <div v-for="subtypeName in subtypes"
               class="subtype"
               ref="subtypeSelectors"
               :class="{ 'active': $route.params.subtype === subtypeName }"
               @click="$router.replace(subtypeName)">
            {{subtypeName}}
          </div>
        </div>
      </div>
    </div>
    <router-view :shops="shops" :subtype="subtypes" @pageChange="handlePageChange($event)"></router-view>
    <button class="float-button" @click="$tip.open('即将上线，敬请期待！')">
      <span class="vertical-line"></span>
      <span class="horizontal-line"></span>
    </button>
  </div>
</template>
<script>
import ShopList from '../../components/shop-list.vue'
import { getShopsByType } from '../../service'
export default {
  components: {
    ShopList
  },
  data () {
    return {
      subtypes: [],
      shops: []
    }
  },
  async mounted () {
    try {
      let typeData = await getShopsByType(this.$route.params.type)
      /*
      if (this.$route.params.subtype === 'default') {
        this.shops = typeData.shopList
        if (!this.shops) {
          this.$tip.open('加载失败！请刷新')
        }
      } else {
        this.$router.replace(typeData.subtypes[0])
      }
      */
      this.$router.replace(typeData.subtypes[0])
      this.subtypes = typeData.subtypes
    } catch (e) {
      this.$tip.open('加载失败！请刷新')
      throw e
    }
    document.title = this.$route.params.type
    window.closeLoading()
  },
  methods: {
    handlePageChange (index) {
      this.$refs.subtypeSelectors[index].scrollIntoView()
      this.$refs.subtypeSelectors[index].click()
    }
  }
}
</script>
<style scoped lang="stylus">
.list {
  height 100%
  display flex
  flex-direction column
  .top-bar {
    height 2rem
    flex-shrink 0
    display flex
    flex-direction row
    border-bottom 1px #f2f2f2 solid
    a {
      flex-shrink 0
      width 3rem
      background-image url('./search-colorful.png')
      background-repeat no-repeat
      background-size auto 1.2rem
      background-position center
    }
    .subtype-selector {
      flex-grow 1
      overflow auto
      .wrapper {
        white-space nowrap
        div {
          display inline-block
          height 2rem
          line-height 2rem
          font-size 0.75rem
          padding 0 0.7rem
          box-sizing border-box
        }
        .active {
          border-bottom 0.2rem solid #FFAC00
          color #FFAC00
        }
      }
    }
  }
}
.float-button {
  position fixed
  bottom 2rem
  right 1rem
  display block
  border none
  width (w = 4)rem
  height w rem
  border-radius (w / 2) rem
  background-color #ffac00
  transition all 0.5s
  box-shadow rgba(215, 142, 37, 0.40) 0 0 0.5rem 0.05rem
  z-index 999
  span {
    display inline-block
    background-color #FFFFFF
    border-radius 0.1rem
    position absolute
    margin auto
    top 0
    bottom 0
    right 0
    left 0
  }
  w = 1.8
  .vertical-line {
    width w rem
    height 0.2rem
  }
  .horizontal-line {
    width 0.2rem
    height w rem
  }
}
.float-button:active {
  background-color rgba(255, 172, 0, 0.6)
  box-shadow rgba(215, 142, 37, 0.40) 0 0 0.7rem 0.05rem
}
</style>
