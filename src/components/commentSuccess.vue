<template>
  <div class="add-success-root" v-bind:class="{'show':loaded}">
    <img src="../assets/addSuccess/avatar.png" v-on:load="loadPlus"/>
    <h1>感谢您的评价</h1>
    <p>现在大家已经可以看到你的评价了</p>
    <button v-on:click="back">返回</button>
  </div>
</template>
<style scoped>
div.add-success-root{
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
div.add-success-root h1{
  font-size: 1.2rem;
  color:#3395b8;
  font-weight: 400;
}
div.add-success-root p{
  font-size: 0.8rem;
  font-weight: 600;
  color:#B6b6b6;
}
div.add-success-root img,
div.add-success-root h1,
div.add-success-root p{
  display: block;
  text-align: center;
  margin:0 auto;
}
div.add-success-root img{
  width:14.3rem;
  height:10rem;
}
div.add-success-root button{
  background: url("../assets/addSuccess/back.png");
  background-size: 100% 100% ;
  width:11rem;
  height:3rem;
  display: block;
  border:0;
  font-size: 0;
  margin:0 auto;
  box-shadow: 0 0 1rem 0.2rem rgba(164,221,238,0.78);
  border-radius: 1.5rem;
}
div.add-success-root.show{
  opacity: 1;
}
</style>
<script>
export default{
  data:function(){
    return({
      loaded:false,
      n:0
    });
  },
  methods:{
    back:function(){
      this.$router.go(-1);
    },
    loadPlus:function(){
        this.n++;
        if(this.n===2){
          this.loaded = true;
        }
    }
  },
  mounted:function(){
    this.n++;
  }
}


</script>
