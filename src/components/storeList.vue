<template>
  <div class="store-list-root" v-bind:class="{'show':loaded}">
    <div class="store-list-header">
      <router-link class="store-list-return" to="/noAnim"><span></span></router-link>
      <h1>{{$route.params.type}}</h1>
    </div>
    <div class="store-list-body">
      <ul></ul>
    </div>
    <div class="store-list-footer"></div>
  </div>
</template>


<style>

div.store-list-root{
  min-height: 100%;
  position: relative;
}
div.store-list-root div.store-list-header{
  height: 3.2rem;
  width:100%;
  background: linear-gradient(90deg,#343856,#4F5E93);
}
div.store-list-root div.store-list-body{
  height:calc(100% - 6.4rem);
  width:100%;
  position: absolute;
  top: 3.2rem;
  bottom:3.2rem;
  left:0;
  right:0;
}
div.store-list-root div.store-list-footer{
  height: 3.2rem;
  width:100%;
  background: linear-gradient(90deg,#343856,#4F5E93);
  position: absolute;
  bottom:0;
}
div.store-list-root h1{
  font-size: 1rem;
  display: inline-block;
  color:#FFF;
  font-weight: 400;
  margin:1rem 0;
  vertical-align: top;
  line-height: 1rem;
}
div.store-list-root a.store-list-return{
  display: inline-block;
  height:1rem;
  width:0.55rem;
  margin:1rem;
}
div.store-list-root a.store-list-return>span{
  background: url("../assets/storeList/return.png") center;
  background-size: 100% 100%;
  display: inline-block;
  height:100%;
  width:100%;

}

</style>


<script>


export default{
  data:function(){
    return({
      loaded:false,
      list:[],
    });
  }
}


//#4F5E93
  //#343856
</script>
