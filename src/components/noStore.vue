<template>
  <div class="add-failed-root" v-bind:class="{'show':loaded}">
    <img src="../assets/noStore/no.png" v-on:load="loadPlus"/>
    <h1>没有找到相应的店铺信息哦～</h1>
    <p>到添加新店里提醒我们吧！</p>
    <button v-on:click="newStore">添加新店</button>
  </div>
</template>
<style scoped>
  div.add-failed-root{
    padding:3rem 0;
    box-sizing: border-box;
    min-height:100%;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
  div.add-failed-root h1{
    font-size: 1.2rem;
    color:#3395b8;
    font-weight: 400;
  }
  div.add-failed-root p{
    font-size: 0.8rem;
    font-weight: 600;
    color:#B6b6b6;
  }
  div.add-failed-root img,
  div.add-failed-root h1,
  div.add-failed-root p{
    display: block;
    text-align: center;
    margin:0 auto;
  }
  div.add-failed-root img{
    width:14.3rem;
    height:13.5rem;
  }
  div.add-failed-root button{
    background: url("../assets/noStore/blank_button.png");
    background-size: 100% 100% ;
    width:11rem;
    height:3rem;
    display: block;
    border:0;
    margin:0 auto;
    font-size: 1rem;
    color:#FFF;
    box-shadow: 0 0 1rem 0.2rem rgba(164,221,238,0.78);
    border-radius: 1.5rem;
  }
  div.add-failed-root.show{
    opacity: 1;
  }
</style>
<script>
module.exports = {
  data: function () {
    return ({
      loaded: false,
      n: 0
    });
  },
  methods: {
    newStore: function () {
      this.$router.push('/newStore');
    },
    loadPlus: function () {
      this.n++;
      if (this.n === 2) {
        this.loaded = true;
      }
    }
  },
  mounted: function () {
    this.n++;
  }
}

</script>
