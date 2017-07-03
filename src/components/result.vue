<template>
  <div class="result">
    <div class="image">
      <img src="./success.png" v-if="succeed" :style="{ 'width': '12rem' }">
      <img src="./bad.png" v-if="!succeed" :style="{ 'width': '9rem' }">
    </div>
    <div class="text">
      <h1 v-if="headText">{{headText}}</h1>
      <p v-if="text">{{text}}</p>
    </div>
    <div class="operation">
      <button v-if="buttonText" @click="$emit('buttonClick')">{{buttonText}}</button>
      <router-link :to="linkTo" v-if="linkTo && linkText">{{linkText}}</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    succeed: Boolean,
    headText: String,
    text: String,
    buttonText: String,
    linkText: String,
    linkTo: String
  }
}
</script>
<style scoped lang="stylus">
.result {
  display flex
  flex-direction column
  justify-content space-around
  flex-grow 1
  height 100%
  background-color white
  padding-top 4rem
  box-sizing border-box
  .image {
    img {
      display block
      width 12rem
      height auto
      margin 2rem auto
    }
  }
  .text {
    flex-grow 2
    text-align center
    h1 {
      margin 0
      font-size 0.85rem
      color #FFAC00
      font-weight 500
    }
    p {
      font-size 0.6rem
      color #717171
    }
  }
  .operation {
    flex-grow 3
    button {
      flex-grow 1
      display block
      width 8rem
      height 2rem
      border-radius 1rem
      border none
      margin auto
      font-size 0.9rem
      color #FFFFFF
      background-color #FFAC00
      box-shadow rgba(215, 142, 37, 0.40) 0 0 0.5rem 0.05rem
    }
    a {
      font-size 0.8rem
      color #717171
      text-align center
      width 5rem
      display block
      margin 1rem auto
    }
  }
}
</style>
