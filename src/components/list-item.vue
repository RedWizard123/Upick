<template>
  <li class="list-item">
    <router-link :to="`/detail/${shopName}`">
      <img :src="iconSrc" />
      <div class="text">
        <h2>
          <span class="name-left">{{shopName}}</span>
          <span class="score-right">{{scoreText}}</span>
        </h2>
        <ul class="tags-list">
          <li v-for="tag in tags"
              :class="{ 'positive': tag.positive, 'negative': !tag.positive }"
          >
            {{tag.tagName}}
          </li>
        </ul>
      </div>
    </router-link>
  </li>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    iconSrc: String,
    shopName: String,
    score: Number,
    tags: Array
  },
  computed: {
    scoreText () {
      return Number.prototype.toPrecision.call(this.score, 2) + '分'
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
  img {
    width 3.6rem
    height @width
    border-radius 0.2rem
    background-color #E0e0e0
    flex-shrink 0
  }
  div {
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
