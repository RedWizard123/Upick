<template>
  <div class="store-detail-root" v-bind:class="{'show':loaded}">
    <div class="store-detail-header">
      <a v-on:click="$router.go(-1);"><span class="back"></span></a>
      <h1>{{detail.name}}</h1>
      <div class="tip"></div>
    </div>
    <div class="store-detail-body">
      <div class="body-top">
        <div class="addr-time">
          <h2 class="time"><span class="icon-time">营业时间:</span>{{detail.openTime}}</h2>
          <h2 class="addr"><span class="icon-addr">地址:</span>{{detail.address}}</h2>
          <span class="score">{{convertToFloat(detail.score)}}分</span>
        </div>
        <div class="container">
          <div class="tags">
            <span v-for="item in detail.tags">{{item[0]}}</span>
          </div>
          <div class="pics">
            <div class="img-con">
              <img v-for="(item2,index) in detail.picURLs_" v-bind:src="item2"/>
            </div>
            <div class="mask" v-if="detail.picURLs.length>3">+{{detail.picURLs.length-detail.picURLs_.length}}</div>
          </div>
        </div>
      </div>
      <div class="body-bottom">

      </div>
    </div>
    <div class="store-detail-footer"></div>
  </div>
</template>
<style scoped>
div.store-detail-root.show{
  opacity: 1;
}
div.store-detail-root{
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  opacity: 0;
}
div.store-detail-header{
  background: linear-gradient(90deg,#343856,#4F5E93);
  height: 3.2rem;
  width:100%;
  position: relative;
  z-index: 99;
  /*padding:1.1rem 1.1rem 1.2rem 1rem;*/
  box-sizing: border-box;

}
div.store-detail-header div.tip{
  background: url("../assets/storeList/tip.png");
  height:0.8rem;
  background-size: 100% 100%;
  width:4rem;
  position: absolute;
  bottom: 0;
  left:2rem;
}
div.store-detail-header a>span{
  background: url("../assets/storeList/return.png") center;
  background-size: 100% 100%;
  display: inline-block;
  height:100%;
  width:100%;
}
div.store-detail-header a{
  vertical-align: top;
  display: inline-block;
  height:1rem;
  width:0.55rem;
  margin:1rem;
}
div.store-detail-header>h1{
  font-size: 1rem;
  display: inline-block;
  color:#FFF;
  font-weight: 400;
  margin:1rem 0;
  vertical-align: top;
  line-height: 1rem;
  width:5rem;
  height:1rem;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
div.store-detail-body{
  height:calc(100% - 6.4rem);

}
div.store-detail-footer{
  height: 3.2rem;
  width:100%;
  background: linear-gradient(90deg,#343856,#4F5E93);
  position: absolute;
  bottom:0;
}
div.store-detail-body>div.body-top{
  padding:0 1.5rem;
  width:100%;
  box-sizing: border-box;
}
div.store-detail-body>div.body-top>div.addr-time{
  padding:1.5rem 0 0.5rem 0;
  position: relative;
}
div.store-detail-body>div.body-top>div.addr-time>h2{
  font-size: 0.75rem;
  font-weight: 400;
}
div.store-detail-body>div.body-top>div.addr-time>h2>span{
  margin:0.5rem 0.2rem 0.5rem 0;
  padding:0;
  height:1rem;
  font-size: 0.9rem;
  font-weight: 600;

}
div.store-detail-body>div.body-top>div.addr-time>h2.time>span::before{
  content: "";
  background: url("../assets/storeDetail/icon.png");
  background-size: 2rem 0.9rem;
  width:0.9rem;
  height:0.9rem;
  display: inline-block;
  vertical-align:top;
  margin-right: 0.3rem;

}
div.store-detail-body>div.body-top>div.addr-time>h2.addr>span::before{
  content: "";
  background: url("../assets/storeDetail/icon.png") no-repeat;
  background-position: -1.3rem;
  background-size: 2rem 0.9rem;
  width:0.9rem;
  height:0.9rem;
  display: inline-block;
  vertical-align:top;
  margin-right: 0.3rem;
}
div.store-detail-body>div.body-top span.score{
  display: inline-block;
  position: absolute;
  font-size: 0.9rem;
  font-weight: 400;
  top:2rem;
  right:0;
}
div.store-detail-body div.tags{
  margin-bottom: 0.7rem;
  position: relative;
}
div.store-detail-body div.tags>span{
  display: inline-block;
  font-size: 0.7rem;
  border-radius: 0.3rem;
  color:#FFF;
  padding:0.2rem 0.3rem;
  margin:0 0.2rem;
}
div.store-detail-body div.tags>span:nth-child(4n+1){
  background: #5D77B9;
}
div.store-detail-body div.tags>span:nth-child(4n+2){
  background: #44A3BF;
}
div.store-detail-body div.tags>span:nth-child(4n+3){
  background: #568AD0;
}
div.store-detail-body div.tags>span:nth-child(4n+4){
  background: #38C4AF;
}
div.store-detail-body div.pics{
  position: relative;
}
div.store-detail-body div.pics>div>span{

}
div.store-detail-body div.pics>div.img-con{
  height:3.2rem;
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 2rem;
  position: relative;
  text-align: center;
  color:#FFF;
}
div.store-detail-body div.pics>div.mask{
  position: absolute;
  right:0;
  top:0;
  background: rgba(0,0,0,0.2);
  width:5.2rem;
  height:3.2rem;
  text-align: center;
  line-height: 3rem;
  font-size: 1.5rem;
  color: #FFF;
}
div.store-detail-body div.pics>div>img{
  background: #AAAAAA;
  width:5.2rem;
  height:3.2rem;
  display: inline-block;
  margin:0;
  box-sizing: border-box;
}
div.store-detail-body div.container{
  -webkit-transition: all 0.25s;
  -moz-transition: all 0.25s;
  -ms-transition: all 0.25s;
  -o-transition: all 0.25s;
  transition: all 0.25s;
  opacity: 1;
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
  -webkit-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  -o-transform-origin:0 0;
  transform-origin:0 0;
}
div.store-detail-body div.container.low{
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  -ms-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
  opacity: 0;
}
</style>
<script>
export default{
  data:function(){
    return({
      loaded:false,
      detail:{
        name:"",
        openTime:"",
        address:"",
        picURLs:[],
        picURLs_:[],
        tags:[],
        score:""
      }
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
    this.detail = {
      name:"地址",
      openTime:"9:00 - 21:00",
      address:"地址地址地址地址地址地址",
      picURLs:["","","","","","","","","","","",""],
      tags:[["地址A",5],["地址",5],["A地址",5],["地A址",5]],
      score:"9"
    };
    this.detail.picURLs_ = this.detail.picURLs.slice(0,3);
    this.loaded = true;
  }
}
</script>
