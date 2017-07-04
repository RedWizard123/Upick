<template>
  <div class="entry">
    <div class="img-to-load">
      <img src="./types.png"/>
      <img src="./quote.png"/>
      <img src="./search.png"/>
      <img src="./wave.png"/>
      <img src="./logo.png"/>
    </div>
    <div class="header-title">
      <img class="bg-wave" src="./wave.png"/>
      <h1 class="title" @click="$tip.open('暂未开发！')"> Upick </h1>
      <div class="search-icon">
        <router-link to="/search"><span class="icon"></span></router-link>
      </div>
    </div>
    <div class="classify" ref="typeRoot">
      <h3 class="slogan">
        <span></span>{{ slogan }}<span></span>
      </h3>
      <h2>
        <span></span>分类<span></span>
      </h2>
      <div class="shop-types">
        <div v-for="(line, lineIndex) in shopTypes"
             class="shop-types-line"
             ref="line"
        >
          <div class="wrapper"
               v-for="index in line.length * 2 - 1"
               :style="{'height': typeLineHeight + 'px'}"
          >
            <router-link v-if="index % 2 === 1" :to="`/list/${line[(index - 1) / 2].typeName}/default`">
              <div class="type-img" ref="typeImages"></div>
              <h4>{{line[(index - 1) / 2].typeName}}</h4>
            </router-link>
            <div class="divider" v-else></div>
          </div>
        </div>
      </div>
    </div>
    <div class="hot-shops">
      <h2>
        <span></span>
        热门商家
        <span></span>
      </h2>
      <ul>
        <li v-for="hotShop in hotShops">
          <router-link :to="`/detail/${hotShop.shopName}`" class="shop" >{{hotShop.shopName}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getIndex, waitImageToLoad } from '../../service'
export default {
  data () {
    return {
      slogan: '品质校园生活从 Upick 开始！',
      hotShops: [],
      shopTypes: [],
      typeLineHeight: 0
    }
  },
  async mounted () {
    try {
      // 加载信息
      let { slogan, shopTypes, popularShops } = await getIndex()
      // 生成图片加载的 Promise
      const images = Array.from(document.querySelectorAll('.img-to-load > img'))
      const imagesLoadPromise = images.map((image) => {
        return waitImageToLoad(image)
      })
      // 等待图片加载的 Promise resolve
      await Promise.all(imagesLoadPromise)
      window.closeLoading()
      document.title = 'Upick | 校内店铺评价'
      this.slogan = slogan
      this.hotShops = popularShops
      let i = 0
      let n = shopTypes.length
      while (i < n) {
        this.shopTypes.push(shopTypes.slice(i, i += 3))
      }
    } catch (error) {
      this.$tip.open('加载失败！请刷新')
      throw error
    }
    const resizeTypeImages = () => {
      this.typeLineHeight = this.$refs.line[0].clientHeight
      this.$nextTick(() => {
        this.$refs.typeImages.forEach((typeImage, i) => {
          // 计算整个背景的折算宽度
          let bgWidth = typeImage.clientHeight / 138 * 630
          // n 为种类数，可能会变
          let n = this.$refs.typeImages.length
          typeImage.style.marginLeft =
            typeImage.style.marginRight = (typeImage.clientWidth - bgWidth / n) / 2 + 'px'
          typeImage.style.backgroundSize = [
            bgWidth + 'px',
            typeImage.clientHeight + 'px'
          ].join(' ')
          typeImage.style.backgroundPositionX = -i * bgWidth / n + 'px'
        })
      })
    }
    // window.addEventListener('resize', resizeTypeImages)
    this.$nextTick(resizeTypeImages)
  }
}
</script>
<style scoped lang="stylus">
h2, h3, h4 {
  text-align center
  margin 0
}
.img-to-load {
  display none
}
.entry {
  display flex
  flex-direction column
  height 100%
  h3 {
    margin-bottom 1rem
    font-size 0.6rem
    font-weight 300
    color: #535353
    span {
      display inline-block
      width 1rem
      height 1rem
      background-image url('./quote.png')
      background-size 100%
      margin 0 0.5rem
      transform scale(0.65)
    }
    span:first-child {
      transform rotateY(180deg)scale(0.65)
    }
  }
  h2 {
    font-size 0.9rem
    font-weight 300
    span {
      margin 0 0.2rem
    }
    span:first-child::before, span:last-child::after {
      content ''
      display inline-block
      width 0.21rem
      height 0.21rem
      background-color #38363F
      border-radius 50%
      vertical-align middle
      margin 0 0.1rem
    }
    span:first-child::after, span:last-child::before {
      content ''
      display inline-block
      margin 0.08rem 0.1rem
      height (h = 0.06)rem
      border-radius (h / 2)rem
      width 0.8rem
      background-color #38363f
      vertical-align middle
      transform scale(0.6)
    }
  }
  .header-title {
    position relative
    flex-shrink 0
    h1.title {
      position absolute
      left 0
      right 0
      top -1rem
      bottom 0
      margin auto
      height 2.4rem
      width (2.4 * 205 / 94)rem
      font-size 0
      background-image url('./logo.png');
      background-size 100%
      background-repeat no-repeat
    }
    img {
      width 100%
    }
    .search-icon {
      position absolute
      top -0.8rem
      right 2rem
      bottom 0
      margin auto
      height 1rem
      width 1rem
      .icon {
        display inline-block
        width 100%
        height 100%
        background-image url('./search.png')
        background-size 100%
      }
    }
  }
  .classify {
    flex-grow 1
    display flex
    flex-direction column
    h3, h2 {
      flex-shrink 0
    }
    .shop-types {
      flex-grow 1
      padding 1rem 0.5rem 2rem
      display flex
      flex-direction column
      .shop-types-line {
        position relative
        flex-grow 1
        display flex
        flex-direction row
        justify-content center
        margin-bottom 1rem
        .wrapper {
          display flex
        }
        .divider {
          margin auto 0.5rem
          width 1px
          height 35%
          background-color #bbbbbb
        }
        a {
          width 5rem
          text-decoration none
          font-size 0.75rem
          color #38363F
          display flex
          flex-direction column
          .type-img {
            margin-top 0.6rem
            flex-grow 1
            background-image url('./types.png')
            background-clip content-box
          }
          h4 {
            padding-top 0.3rem
            flex-shrink 0
          }
        }
      }
      .shop-types-line:last-child {
        margin-bottom 0
      }
    }
  }
  .hot-shops {
    flex-shrink 0
    ul {
      list-style none
      margin 0
      padding 1rem
      text-align center
      li {
        display inline-block
        font-size 0
        margin-bottom 0.5rem
        .shop {
          display inline-block
          padding 0 0.7rem
          margin 0 0.5rem
          height (h = 1.3)rem
          font-size 0.65rem
          line-height h rem
          color #555351
          background-color #fed73b
          border-radius (h / 2)rem
          text-decoration none
        }
      }
    }
  }
}
</style>
