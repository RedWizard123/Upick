<template>
  <div
    class="tip"
    :class="{ 'show': show }"
    :style="{ 'backgroundColor': color }"
    @click="close()"
  >
    <p>{{msg}}</p>
  </div>
</template>
<script>
function wait (time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
export default {
  data () {
    return {
      msg: '',
      color: '',
      show: false,
      timeoutHwd: 0
    }
  },
  methods: {
    async open (msg, color = '#FF305D', timeToStay = 1500) {
      this.msg = msg
      this.color = color
      this.show = true
      await Promise.race([
        wait(timeToStay),
        new Promise((resolve) => {
          this.close = () => {
            resolve()
          }
        })
      ])
      this.show = false
      // will then when tips close
    },
    close () {}
  }
}
</script>
<style scoped>
.tip {
  height: 3rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transform: translateY(-100%);
  transition: opacity 0.5s, transform 0.5s
}
.tip.show {
  opacity: 1;
  transform: translateY(0);
}
p {
  color: #FFFFFF;
  font-size: 1rem;
  text-align: center;
  margin: 0;
  line-height: 3rem;
}
</style>
