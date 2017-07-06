<template>
  <li class="list-item" ref="li">
    <router-link :to="`/detail/${shopName}`">
      <div class="image">
        <img v-if="needToLoadImage" :src="iconSrc" @load="imageLoaded = true" :key="iconSrc"/>
      </div>
      <div class="text">
        <h2>
          <span class="name-left">{{shopName}}</span>
          <span class="score-right">{{scoreText}}</span>
        </h2>
        <ul class="tags-list">
          <li v-for="tag in tags"
              :class="{ 'positive': tag.positive, 'negative': !tag.positive }"
          >
            {{tag.tagName ? tag.tagName : tag}}
          </li>
        </ul>
      </div>
    </router-link>
  </li>
</template>
<script>
export default {
  data () {
    return {
      displaySrc: '',
      imageLoaded: false,
      needToLoadImage: false
    }
  },
  props: {
    iconSrc: String,
    shopName: String,
    score: Number,
    tags: Array
  },
  methods: {
    checkLazyLoad () {
      let ele = this.$refs.li
      let bottomNum = ele.offsetTop - window.screen.availHeight
      let top = ele.offsetTop
      // 当滚动的距离等于bottomNum的时候说明这个元素已经
      // 被滚动到浏览器底部，当等于to的时候，说明元素顶部已
      // 经在浏览器顶部（如果需要计算完全显示完全隐藏可以把
      // 元素的高度也计算在内）
      if (bottomNum < ele.parentNode.scrollTop && ele.parentNode.scrollTop < top) {
        this.needToLoadImage = true
      } else {
        this.needToLoadImage = this.imageLoaded
      }
    }
  },
  computed: {
    scoreText () {
      return Number.prototype.toPrecision.call(this.score, 2) + '分'
    }
  },
  watch: {
    iconSrc (to) {
      this.displaySrc = ''
      this.$nextTick(() => {
        console.log(to)
        this.displaySrc = to
      })
    }
  }
}
</script>
<style scoped lang="stylus">
.list-item {
  padding 0.5rem 1.5rem
  border-bottom 1px #f2f2f2 solid
  background-color #FFFFFF
}
.list-item:last-child {
  border 0
}
a {
  text-decoration none
  color #000000
  display flex
  flex-direction row
  .image {
    width 3.6rem
    height @width
    flex-shrink 0
    background-color #e8e8e8
    img {
      width 3.6rem
      height @width
      border-radius 0.2rem
      background-color #E0e0e0
    }
  }
  .text {
    padding 0.2rem 0 0.3rem 1rem
    flex-grow 1
    position relative
    h2 {
      margin 0
      font-size 0.8rem
      display flex
      flex-direction row
      font-weight 500
      .name-left {
        flex-grow 1
      }
      .score-right {
        flex-shrink 0
        color #FF841B
      }
    }
    .tags-list {
      position absolute
      bottom 0.3rem
      padding 0
      list-style none
      font-size 0.6rem
      height (h = 1.1)rem
      overflow hidden
      li {
        color #717171
        display inline-block
        height h rem
        line-height h rem
        border-radius (h / 2)rem
        background-color #FFD273
        padding 0 0.5rem
        margin-right 0.5rem
      }
      li.negative {
        background-color #e8e8e8
      }
    }
  }
}
</style>
