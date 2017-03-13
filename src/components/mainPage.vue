<template>
  <div class="mainpage-root" v-bind:class="{'show':loaded}">
    <div class="mainpage-header">
      <img  src="../assets/mainpage/xingxing.png" style="display: none;" id="xingxing"/>
      <canvas v-bind:width="canvasWidth" v-bind:height="canvasHeight"></canvas>
      <h1>Upick</h1>
      <div class="search">
        <input class="search-input" placeholder="输入搜索内容" v-model="keyword"/>
        <button class="search-button" v-on:click="searchClick"><span class="search-button-icon">搜索</span></button>
      </div>
      <div class="topic">
        <p>{{data.topic}}</p>
      </div>
    </div>
    <div class="mainpage-body">
      <div class="classify">
        <h2>分类</h2>
        <div class="column">
          <div class="column-block" v-for="(item1,index) in data.list1" v-on:click="buttonClick">
            <div class="back">
              <ul>
                <li v-for="item2 in item1.subTitle"><router-link v-bind:to="'storeList/' + item2">{{item2}}</router-link></li>
              </ul>
              <div class="img-div-a" v-bind:style="{transform:'scale('+5*rem/181+')',backgroundPosition:'-'+index*181 +'px -205px'}"></div>
            </div>
            <div class="img-div" v-bind:style="{transform:'scale('+5*rem/181+')',backgroundPosition:'-'+index*181 +'px 0'}"></div>
            <h3>{{item1.title}}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="hot-store">
      <h2>热门商家</h2>
      <div>
        <div class="back"></div>
        <div class="mainpage-bottom">
          <router-link v-for="item3 in data.list2" v-bind:to="'storeDetail/' + item3">{{item3}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
div.mainpage-root{
  min-height: 100%;
  opacity: 0;
  -webkit-opacity: 0;
  -moz-opacity: 0;
  transition: opacity 0.5s;
  display: flex;
  flex-direction: column;
}
div.mainpage-root.show{
  -webkit-opacity: 1;
  -moz-opacity: 1;
  opacity: 1;
}
div.mainpage-header{
  position: relative;
  /*height:10rem;*/
}
div.mainpage-header>h1{
  display: block;
  position: absolute;
  font-size: 0;
  background: url("../assets/mainpage/title.png") no-repeat center;
  background-size: auto 100%;
  height:3rem;
  width:6.5rem;
  margin:1.2rem auto;
  left:0;
  right:0;
  top:0;
  transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
}
div.mainpage-header>div.search{
  display: block;
  position: absolute;
  height:1.5rem;
  top:2rem;
  right:0;
  padding-right:0.5rem;
}
div.mainpage-header.active>h1{
  transform: translateX(calc(1rem - 100%))scale(0.9);
  -moz-transform: translateX(calc(1rem - 100%))scale(0.9);
  -webkit-transform: translateX(calc(1rem - 100%))scale(0.9);
}
div.mainpage-header>div>button{
  display: inline-block;
  height:1rem;
  width: 1rem;
  border:0;
  font-size: 0;
  background: transparent url("../assets/mainpage/search.png");
  background-size:auto 100%;
  padding:0;
  line-height: 1.5rem;
}
div.mainpage-header>div>input{
  border:0;
  height:1.5rem;
  border-radius: 0.75rem;
  box-sizing: border-box;
  vertical-align: middle;
  background-color: rgb(227,227,229);
  transform: scale(0);
  -moz-transform: scale(0);
  -webkit-transform: scale(0);
  width:1.5rem;
  transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
  margin:0 0.25rem 0 0;
  padding:0 0.5rem;
}
div.mainpage-header.active>div>input{
  width:9rem;
  transform: scale(1);
  -moz-transform: scale(1);
  -webkit-transform: scale(1);
}
div.mainpage-body{
  width:100%;
  flex-grow: 1;
}
div.mainpage-body div.img-div{
  background:url("../assets/mainpage/columns.png");
  height:205px;
  width:181px;
  transform-origin: 0 0;
  z-index: 11;
  position: relative;
}
div.mainpage-body h3{
  font-size: 0.8rem;
  position:absolute;
  bottom:0.5rem;
  text-align: center;
  width:5rem;
  color:#FFF;
  z-index: 11;
  font-weight: 400;
}
div.mainpage-body div.column{
  width:100%;
  text-align: center;
  font-size: 0;
  margin-bottom: 0.5rem;
}
div.mainpage-body div.column-block{
  height:5.663rem;
  width:5rem;
  display: inline-block;
  position: relative;
  padding:0.5rem;
  border:none;
}
div.topic>p::after{
  content: "";
  background: url("../assets/mainpage/topic_right.png");
  height:0.7rem;
  display: inline-block;
  width:0.7rem;
  background-size: 100% 100%;
  margin:0 0 0.2rem 0.2rem;
}
div.topic>p::before{
  content: "";
  background: url("../assets/mainpage/topic_left.png");
  height:0.7rem;
  display: inline-block;
  width:0.7rem;
  background-size: 100% 100%;
  margin:0  0.2rem 0.2rem 0;
}
div.topic>p{
  font-size:0.7rem;
  text-align: center;
  padding:0;
  margin:0 auto;
}
div.topic{
  margin:0 auto;
  position: absolute;
  bottom:1rem;
  width:100%;

}
div.mainpage-root h2::before{
  content: "";
  width: 1rem;
  height: 0.2rem;
  margin:0.25rem;
  background: url("../assets/mainpage/left.png") no-repeat;
  background-size: 100%;
  display: inline-block;
}
div.mainpage-root h2::after{
  content: "";
  width: 1rem;
  height: 0.2rem;
  margin:0.25rem;
  background: url("../assets/mainpage/left.png") no-repeat;
  background-size: 100%;
  display: inline-block;
  transform: rotate(180deg);
}
div.mainpage-root h2{
  text-align: center;
  margin:0 0 0.6rem 0;
  padding:0;
  font-weight: 300;
  font-size: 1rem;
}
div.mainpage-body div.column-block>*{
  transition: all 0.5s ease-in-out;
  opacity: 1;
  -moz-opacity: 1;
  -webkit-opacity: 1;
}
div.mainpage-body div.column-block{
  border-radius:0.5rem;
}
div.mainpage-body div.column-block.active{

}
div.mainpage-body div.column-block.active>div.img-div{
  opacity: 0;
  -webkit-opacity: 0;
  -moz-opacity: 0;
  z-index: 7;
}
div.mainpage-body div.column-block.active>h3{
  opacity: 0;
  -webkit-opacity: 0;
  -moz-opacity: 0;
  z-index: 7;
}
div.mainpage-body div.column-block.active>div.back{
  transform-origin: 50% 50%;
  transform: scale(1.2);
}
div.column-block div.back{
  width:5rem;
  height:5.663rem;
  position: absolute;
  bottom: 0.5rem;
  z-index: 8;
}
div.column-block div.back a{
  text-decoration: none;
  color: #FFF;

}
div.column-block div.back>div.img-div-a{
  background:url("../assets/mainpage/columns.png");
  height:205px;
  width:181px;
  transform-origin: 0 0;
  position: absolute;
  top:0;
}
div.column-block.active div.back ul{
  display: flex;
  box-sizing: border-box;
  font-size: 0.6rem;

}
div.column-block div.back ul{
  list-style: none;
  padding:0.5rem;
  margin: 0;
  width:100%;
  height:100%;
  flex-direction: column;
  flex-wrap: wrap;
  display: none;
}
div.column-block div.back li{
  font-size: 0.6rem;
  color:#FFF;
  position: relative;
  z-index: 10;
  width:2rem;
  margin:0.35rem 0;
  text-align: left;
}
div.column-block div.back li:nth-child(4),
div.column-block div.back li:nth-child(5),
div.column-block div.back li:nth-child(6){
  text-align: right;
}
div.hot-store img{
  width:100%;
  height:auto;
}
div.hot-store>div{
  overflow: hidden;
  position: relative;
}
div.hot-store{
  /*position: absolute;
  bottom:0;*/
  width:100%;
  position: relative;
}
div.hot-store div.back{
  width:100%;
  padding:24% 0 0 0;
  background: url("../assets/mainpage/bottom.png");
  background-size: 100% 100%;
}
div.hot-store div.mainpage-bottom{
  width:100%;
  height:100% ;
  position: absolute;
  top:0;
  padding:0.5rem;
  margin:0;
  box-sizing: border-box;
  text-align: center;
  font-size: 0;
  line-height: 0;
}
div.hot-store div.mainpage-bottom>a:focus{
  background: #FFFFFF;
  color:#6c77c9;
  border:transparent 1px solid;
}
div.hot-store div.mainpage-bottom>a{
  display:inline-block;
  border: solid 1px #FFF;
  border-radius: 0.5rem;
  min-width:3rem;
  max-width:8rem;
  height:1.35rem;
  font-size: 0.7rem;
  color:#FFF;
  text-align: center;
  line-height: 1.35rem;
  margin: 0.35rem 0.5rem;
  text-decoration: none;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  white-space: nowrap;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  padding: 0 0.5rem;
  box-sizing: border-box;

}
</style>
<script>
var handle;
var axios = require("axios");
var ctx;
var canvas;
var step=0;
var d_=0;
var lines = ["rgba(255,255,255,1)",
  "rgba(96,119,186, 0.7)",
  "rgba(142,211,227, 0.5)"
];
var meteor = [];
var stars = [];
var n= 0;
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();
window.cancelAnimFrame = (function(){
  return  window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame    ||
    window.oCancelAnimationFrame      ||
    window.msCancelAnimationFrame     ||
    function(n){
      window.clearTimeout(n);
    };
})();
export default{
  data:function(){
    return({
      canvasWidth:document.body.clientWidth,
      canvasHeight:document.body.clientWidth*0.45,
      data:{topic:"这是头条推文这是头条推文",list1:[],list2:[]},
      loaded:false,
      rem:18,
      keyword:""
    });
  },
  methods:{
      searchClick:function(a){
        var input = a.target.parentNode.querySelector("input");
        var parentDiv = a.target.parentNode.parentNode;
        if(input.value==="" && parentDiv.classList.contains("active")){
          parentDiv.classList.remove("active");
        }else if(!parentDiv.classList.contains("active")){
          parentDiv.classList.add("active");
        }else{
          this.$router.push("/storeList/search/"+this.keyword);
        }
      },
      buttonClick:function(a){
        if(document.querySelectorAll(".active").length != 0){
          document.querySelector(".active").classList.remove("active");
        }
        a.target.parentNode.classList.add("active");
      },
      loop:function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="#343856";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        var img = document.getElementById("xingxing");
        ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.width * img.height / img.width);

        step+=2;

        //canvas.getContext("2d").drawImage();

        var dd=canvas.width/50;
        /*for(var j=0;j<stars.length;j++){
          var grd = ctx.createRadialGradient(stars[j].x,stars[j].y, 1, stars[j].x, stars[j].y, dd/5+Math.random()*dd);
          grd.addColorStop(0, "rgba(255,255,255,0.3)");
          grd.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grd;
          ctx.fillRect(stars[j].x-dd/4, stars[j].y-dd/4, dd/2, dd/2);
        }*/
        for(var j=0;j<meteor.length;j++){
          if(meteor[j].position.x-meteor[j].length/Math.SQRT2>canvas.width||meteor[j].position.y-meteor[j].length/Math.SQRT2>canvas.height){
            meteor.splice(j,1);
            meteor.push({position:{x:Math.random()*canvas.width*0.75,y:0},color:"",length:Math.random()*0.5*d_+2*d_});
          }else{
            meteor[j].position.x+=dd/2;
            meteor[j].position.y+=dd/2;

            var grd = ctx.createRadialGradient(meteor[j].position.x,meteor[j].position.y, 1, meteor[j].position.x, meteor[j].position.y, dd*1.5);
            grd.addColorStop(0, "rgba(255,255,255,0.6)");
            grd.addColorStop(0.2, "rgba(255,223,0,0.18)");
            grd.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = grd;
            ctx.fillRect(meteor[j].position.x-dd/2, meteor[j].position.y-dd/2, dd, dd);
            ctx.moveTo(meteor[j].position.x,meteor[j].position.y);
            ctx.lineTo(meteor[j].position.x-meteor[j].length/Math.SQRT2,meteor[j].position.y-meteor[j].length/Math.SQRT2);
            ctx.strokeStyle="rgba(255,255,255,0.2)";
            ctx.lineWidth = "20px";
            //
            ctx.stroke();
          }
        }
        for(j = lines.length - 1; j >= 0; j--) {
          ctx.fillStyle = lines[j];
          var angle = (step+j*90)*Math.PI/180;
          var deltaHeight = Math.sin(angle) * d_*0.7;
          var deltaHeightRight = Math.cos(angle) * d_*0.7;
          ctx.beginPath();
          ctx.moveTo(0, canvas.height/3*2+deltaHeight);
          ctx.bezierCurveTo(canvas.width /2, canvas.height/3*2+deltaHeight-d_, canvas.width / 2, canvas.height/3*2+deltaHeightRight-d_, canvas.width, canvas.height/3*2+deltaHeightRight);
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.lineTo(0, canvas.height/3*2+deltaHeight);
          ctx.closePath();
          ctx.fill();
        }
        handle = requestAnimFrame(this.loop);
      }
  },
  created:function(){
    /*var img =new Image();
    //img.src = "../assets/mainpage/columns.png";
    img.onload = function(){
      alert("loaded");
    }*/
  },
  mounted:function(){

    canvas = document.querySelector("canvas");
    ctx = document.querySelector("canvas").getContext("2d");
    d_=canvas.width*0.08;
    meteor=[];
    stars=[];
    for(var i=0;i<2;i++){
      meteor.push({position:{x:-10*d_+Math.random()*30*d_,y:-5*d_-Math.random()*d_},color:"",length:d_/2});
    }
    for(i = 0;i<10;i++){
      stars.push({x:d_+Math.random()*10*d_,y:d_+Math.random()*5*d_});
    }
    window.cancelAnimFrame(handle);
    //if(this.$route.params.type!="noAnim"){
    var vue_this = this;


    document.getElementById("xingxing").onload = function(){
      vue_this.loop();
    };


    //}
    vue_this.rem =parseInt( window.getComputedStyle(document.documentElement)["fontSize"]);
    var img1 = (new Image);
    var img2 = (new Image);
    var img3 = (new Image);
    img1.src = "static/img/bottom.png";
    img1.onload = function(){n++;if(n>=4){vue_this.loaded = true;}};
    img2.src = "static/img/title.png";
    img2.onload = function(){n++;if(n>=4){vue_this.loaded = true;}};
    img3.src = "static/img/columns.png";
    img3.onload = function(){n++;if(n>=4){vue_this.loaded = true;}};
    img1 = img2 = img3 =null;
    axios.get('index')
      .then(function (response) {
        response=response.data;
        vue_this.data=response;
        n++;
        if(n>=4){vue_this.loaded = true;}
      })
      .catch(function (error) {
        console.log(error);
        if(error)alert("主页加载失败！");
        vue_this.loaded = true;
      });
    /*vue_this.data={
      "topic":"这是头条推文这是头条推文",
      "list1":[
        {
          "title":"\u7f8e\u98df",
          "subTitle":["\u64e6\u8d39","asfs","assaf","safef","asdd","frevc"]
        },
        {
          "title":"\u751f\u6d3b\u670d\u52a1",
          "subTitle":["\u64e6\u8d39","asfs","assaf","safef","asdd","frevc"]
        },
        {"title":"\u559d\u7684","subTitle":["\u64e6\u8d39","asfs","assaf","safef","asdd","frevc"]},{"title":"\u73a9\u7684","subTitle":["\u64e6\u8d39","asfs","assaf","safef","asdd","frevc"]},{"title":"\u5065\u8eab","subTitle":["\u64e6\u8d39","asfs","assaf","safef","asdd","frevc"]}],
      "list2":[
        "\u6c27\u6c14\u5382",
        "\u6c27\u6c14\u5382",
        "\u6c27\u6c14\u5382",
        "\u6c27\u6c14\u5382",
        "SB\u9a7e\u6821",
        "\u7ec5\u5b9d"]
    };
    n++;
    if(n>=4){vue_this.loaded = true;}*/
  }
}
</script>
