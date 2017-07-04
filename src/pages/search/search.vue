<template>
  <div class="search">
    <div class="input">
      <input placeholder="请输入搜索内容"
             ref="input" v-model="keyword"
             @keyup.enter="$router.replace(`/search/${keyword}`)"
      />
      <button :disabled="!keyword"
              @click="$router.replace(`/search/${keyword}`)"
      >搜索</button>
    </div>
    <div v-if="keyword === '' && !$route.params.keyword" class="hot-history">
      <div class="hot-search" v-if="hot.length > 0">
        <h2>热门搜索</h2>
        <ul class="hot-search-list">
          <li v-for="keyword in hot" @click="$router.push(`/search/${keyword}`)">{{keyword}}</li>
        </ul>
      </div>
      <div class="history" v-if="history.length > 0">
        <h2>历史记录</h2>
        <ul class="hot-search-list">
          <li v-for="keyword in history" @click="$router.push(`/search/${keyword}`)">{{keyword}}</li>
        </ul>
      </div>
    </div>
    <div class="preview" v-else-if="!$route.params.keyword">
      <ul>
        <li v-for="preview in previews">
          <img class="search-icon" src="./search.png">
          <span>{{preview.shopName}}</span>
          <span>{{preview.shopScore.toPrecision(2) + '分'}}</span>
        </li>
      </ul>
    </div>
    <router-view v-if="showShopList"
                 :keyword="$route.params.keyword"
                 @loaded="catchNoShopError($event)"
    ></router-view>
    <result v-if="!showShopList"
            headText="没有找到该店铺哦～"
            text="到添加新店里提醒我们吧"
            buttonText="添加新店"
            @buttonClick="$tip.open('即将上线，敬请期待！')"
    >
    </result>
  </div>
</template>
<script>
import ShopList from '../../components/shop-list.vue'
import result from '../../components/result.vue'
import { getShopsByPrefix, searchHistory, hotRecords } from '../../service'
export default {
  components: {
    ShopList,
    result
  },
  data () {
    return {
      keyword: '',
      refreshTimeout: 0,
      previews: [],
      shops: [],
      hot: [],
      history: [],
      showShopList: true
    }
  },
  watch: {
    keyword () {
      if (!this.$route.params.keyword) {
        clearTimeout(this.refreshTimeout)
        this.refreshTimeout = setTimeout(async () => {
          if (this.keyword) {
            this.previews = (await getShopsByPrefix(this.keyword)).shopList
          }
        }, 300)
      }
    }
  },
  async mounted () {
    window.closeLoading()
    document.title = '搜索'
    if (this.$route.params.keyword) {
      this.keyword = this.$route.params.keyword
    } else {
      // this.$refs.input.focus()
      this.history = (await searchHistory()).searchHistory
      this.hot = (await hotRecords()).hotRecords
    }
  },
  methods: {
    catchNoShopError (n) {
      if (n <= 0) {
        // todo
        this.showShopList = false
      }
    }
  }
}
</script>
<style scoped lang="stylus">
yellow = rgba(255, 172, 0, 1)
yellow_op = rgba(255, 172, 0, 0.8)
.search {
  height 100%
  background-color #f2f2f2
  display flex
  flex-direction column
}
.preview {
  flex-grow 1
  background-color #FFFFFF
  ul {
    list-style none
    margin 0
    padding 0
    li {
      display flex
      flex-direction row
      padding 0.7rem 1.5rem
      border-bottom 1px solid #f5f5f5
      h = 0.7rem
      .search-icon {
        display inline-block
        width h
        height h
        vertical-align top
        flex-shrink 0
        margin 0 0.5rem 0 0
      }
      span {
        display inline-block
        height h
        font-size h
        line-height h
        vertical-align top
        flex-grow 1
      }
      span:last-child {
        flex-shrink 0
        flex-grow 0
        color yellow
      }
    }
    li:last-child {
      border-bottom 0
    }
  }
}
.input {
  flex-shrink 0
  display flex
  flex-direction row
  padding 1.5rem 1.5rem 0.5rem
  font-size 0
  background-color #FFFFFF
  h = 1.7
  input {
    flex-grow 1
    height h rem
    line-height h rem
    border none
    border-radius (h / 2)rem
    background-color #E0E0E0
    padding 0 1rem
    margin-right 0.5rem
    color #717171
  }
  button {
    width 3.4rem
    height h rem
    border none
    border-radius (h / 2)rem
    font-size 0.8rem
    color #FFFFFF
    background-color yellow
    flex-shrink 0
  }
  button[disabled] {
    background-color rgb(187, 187, 187)
  }
  button:active {
    background-color yellow_op
  }
}
.hot-history {
  padding 0 1.5rem
  flex-grow 1
  background-color #FFFFFF
  color #8b8b8b
  h2 {
    font-size 0.6rem
  }
  ul {
    list-style none
    margin 0
    padding 0
    li {
      display inline-block
      height 1.5rem
      line-height @height
      font-size 0.6rem
      padding 0 1rem
      margin-right 0.6rem
      margin-bottom 0.3rem
      border-radius 0.2rem
      background-color #f0f0f0
    }
  }
}
</style>
