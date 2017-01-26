<template>
  <div class="store-list-root" v-bind:class="{'show':loaded}">
    <div class="store-list-header">
      <router-link class="store-list-return" to="/noAnim"><span></span></router-link>
      <h1>{{$route.params.type}}</h1>
    </div>
    <div class="store-list-body">
      <ul>
        <li v-for="item in data">
          <div class="title-container">
            <h2>{{item.name}}</h2>
            <span>{{convertToFloat(item.score)}}</span>
          </div>
          <ul class="tags">
            <li v-for="item2 in item.tags">{{item2[0]}}</li>
          </ul>
          <ul class="pic">
            <li v-for="item3 in item.picURLs">
              <img v-bind:src="item3"/>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="store-list-footer"></div>
  </div>
</template>


<style scoped>
div.store-list-root{
  min-height: 100%;
  position: relative;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}
div.store-list-root.show{
  opacity: 1;
  -webkit-opacity: 1;
  -moz-opacity: 1;
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

div.store-list-root ul{
  padding:0;
  margin:0;
  list-style: none;
}

div.store-list-body{
  overflow: auto;
}
div.store-list-body>ul{
  width:100%;

}
div.store-list-body>ul>li{
  display: block;
  margin:0 1rem;
  box-sizing: border-box;
  padding:0 1rem;
  border-bottom: 1px solid #bbb;
}
div.store-list-body>ul h2{
  font-size: 1rem;
  font-weight: 400;
  margin:0.1rem;
  display: inline-block;
}
div.store-list-body>ul div.title-container{
  padding:0.5rem 0 0.2rem 0;
}
div.store-list-body>ul div.title-container>span{
  float: right;
  font-size: 0.8rem;
  font-weight: 300;
}
div.store-list-body>ul ul.pic,
div.store-list-body>ul ul.tags{
  padding:0 0.2rem;
}

div.store-list-body>ul ul.tags>li:nth-child(4n+1){
  background: #5D77B9;
}
div.store-list-body>ul ul.tags>li:nth-child(4n+2){
  background: #44A3BF;
}
div.store-list-body>ul ul.tags>li:nth-child(4n+3){
  background: #568AD0;
}
div.store-list-body>ul ul.tags>li:nth-child(4n+4){
  background: #38C4AF;
}

div.store-list-body>ul ul.tags>li{
  display: inline-block;
  height:1.2rem;
  font-size: 0.6rem;
  line-height: 1.2rem;
  text-align: center;
  padding:0 0.3rem;
  background: #4F5E93;
  color: #FFF;
  border-radius: 0.3rem;
  margin:0 0.3rem 0.6rem 0;

}
div.store-list-body>ul ul.pic>li{
  display: inline-block;
  text-align: left;
  height:3.5rem;
  width:5rem;
  font-size: 0.6rem;
  line-height: 1.2rem;
  margin:0 0.3rem 0.6rem 0;
}
</style>


<script>
var axios = require("axios");

export default{
  data:function(){
    return({
      loaded:false,
      data:[],
    });
  },
  methods:{
    convertToFloat:function(a){
        if(typeof a ==="number"){
            a = a.toString();
        }
        if(a.length===3){
            return(a);
        }else{
            return(a+".0");
        }
    }
  },
  mounted:function(){
    var vue_this = this;
    /*axios.get('storeListData.php?type='+vue_this.$route.params.type)
      .then(function (response) {
        response=response.data;
        vue_this.data=response.data;
        vue_this.loaded = true;
      })
      .catch(function (error) {
        if(error)alert("加载失败！");
        vue_this.loaded = true;
      });*/
    vue_this.data=[{"id":1,"name":"\u8001\u518d","openTime":"6:00-24:00","adress":"XXXXXXX","score":9,"overall":9.8,"picURLs":["path\/to\/pic1","\u6700\u597d\u662f\u7edd\u5bf9\u8def\u5f84"],"tags":[["\u73af\u5883\u597d",10],["\u9002\u5408\u81ea\u4e60",20],["\u96be\u559d",7]]},{"id":2,"name":"F2","openTime":"6:00-24:00","adress":"XXXXXXX","score":7,"overall":6.8,"picURLs":["",""],"tags":[["\u73af\u5883\u597d",1],["\u4e0d\u9002\u5408\u81ea\u4e60",5],["\u96be\u559d",7]]}];
    vue_this.loaded=true;
  }
}


//#4F5E93
  //#343856
</script>
