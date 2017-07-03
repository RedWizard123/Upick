<template>
  <result :succeed="succeed"
          :headText="headText"
          :buttonText="buttonText"
          :linkText="linkText"
          :linkTo="linkTo"
          @buttonClick="$router.go(-1)"
  ></result>
</template>
<script>
import Result from '../../components/result.vue'
export default {
  components: {
    Result
  },
  data () {
    return {
      // todo
      succeed: true,
      headText: '感谢您的评价！',
      buttonText: '返回店铺',
      linkText: '返回首页',
      linkTo: `/detail/${this.$route.params.name}`
    }
  },
  mounted () {
    if (this.$route.params.status === 'comment-success') {
      // do nothing
    } else {
      // todo
    }
  }
}
</script>
<style>

</style>
