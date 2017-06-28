<template>
  <div class="entry">
    <div class="header-title">
      <img class="bg-wave" src="./wave.png"/>
      <h1 class="title"> Upick </h1>
      <div class="search-icon">
        <span class="icon"></span>
      </div>
    </div>
    <div class="classify">
      <h3 class="slogan">这是slogan</h3>
      <h2>分类</h2>
    </div>
    <div class="hot-shops">
      <h2>热门商家</h2>
    </div>
  </div>
</template>
<script>

</script>
<style scoped lang="stylus">
.entry {
  display flex
  flex-direction column
  height 100%
  h2, h3 {
    text-align center
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
  }
  .hot-shops {
    flex-shrink 0

  }
}
</style>
