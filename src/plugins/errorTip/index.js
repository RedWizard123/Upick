/**
 * Created by faraway on 17-6-10.
 */
import errorTip from './errorTip.vue'
let $vm
export default {
  install (Vue) {
    const Tip = Vue.extend(errorTip)
    if (!$vm) {
      $vm = new Tip({ el: document.createElement('div') })
      document.body.appendChild($vm.$el)
    }
    Vue.prototype.$tip = {
      open (string, ...params) {
        $vm.open(string, ...params)
      },
      close () {
        $vm.close()
      }
    }
  }
}
