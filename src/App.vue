<template>
  <div id="app" ref="root">
    <transition :name="transitionName">
        <router-view></router-view>
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
  mounted () {
    this.$nextTick(() => {
      this.$refs.root.style.height = window.innerHeight + 'px'
    })
  },
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
  transition transform 0.3s
}
.slide-left-enter {
  transform translateX(100%)
}
</style>
