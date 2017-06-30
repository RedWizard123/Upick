<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-right'
    }
  },
  mounted () {},
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').filter(t => t !== '').length
      const fromDepth = from.path.split('/').filter(t => t !== '').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style lang="stylus">
.slide-right-enter {
  transform translateX(-100%)
}
.slide-right-enter-active, .slide-left-enter-active {
  transition transform 0.15s
}
.slide-left-enter {
  transform translateX(100%)
}
</style>
