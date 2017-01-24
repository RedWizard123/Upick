<template>
  <div class="mainpage-root" v-bind:class="{'show':loaded}">
    <div class="mainpage-header">
      <canvas v-bind:width="canvasWidth" v-bind:height="canvasHeight"></canvas>
      <h1>Upick</h1>
      <div class="search">
        <input class="search-input" placeholder="输入搜索内容"/>
        <button class="search-button" v-on:click="searchClick"><span class="search-button-icon">搜索</span></button>
      </div>
      <div class="topic">
        <p>{{data.topic}}</p>
      </div>
    </div>
    <div class="mainpage-body">
      <div class="classify">
        <h2>- 分类 -</h2>
        <div class="column">
          <div class="column-block" v-for="(item1,index) in data.list1">
              <div class="img-div" v-bind:style="{transform:'scale('+5*rem/181+')',backgroundPosition:'-'+index*181 +'px 0'}"></div>
              <h3>{{item1.title}}</h3>
          </div>
        </div>
      </div>
      <div class="hot-store">
        <h2>- 热门商家 -</h2>
      </div>
    </div>
  </div>
</template>
<style>
div.mainpage-root{
  min-height: 100%;
  opacity: 0;
  transition: opacity 0.5s;
}
div.mainpage-root.show{
  opacity: 1;
}
div.mainpage-header{
  position: relative;
}
div.mainpage-header>h1{
  display: block;
  position: absolute;
  font-size: 0;
  background: url("../assets/mainpage/title.png") no-repeat center;
  background-size: auto 100%;
  height:3rem;
  width:6.5rem;
  margin:0.75rem auto;
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
  top:1.65rem;
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
}

div.mainpage-body div.img-div{
  background:url("../assets/mainpage/columns.png");
  height:205px;
  width:181px;
  transform-origin: 0 0;
}
div.mainpage-body h3{
  font-size: 0.8rem;
  position:absolute;
  bottom:0.5rem;
  text-align: center;
  width:5rem;
  font-weight: 600;
  color:#FFF;
}
div.mainpage-body div.column{
  width:100%;
  text-align: center;
  font-size: 0;
}
div.mainpage-body div.column-block{
  height:5.663rem;
  width:5rem;
  display: inline-block;
  position: relative;
  padding:0.5rem;
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
div.mainpage-root h2{
  text-align: center;
  margin:0 0 0.6rem 0;
  padding:0;
  font-weight: 300;
  font-size: 1rem;
}


</style>
<script>
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
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();
function loop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#343856";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  step+=2;
  var dd=canvas.width/50;
  for(var j=0;j<stars.length;j++){
    var grd = ctx.createRadialGradient(stars[j].x,stars[j].y, 1, stars[j].x, stars[j].y, dd/2);
    grd.addColorStop(0, "rgba(255,255,255,0.3)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(stars[j].x-dd/4, stars[j].y-dd/4, dd/2, dd/2);
  }
  for(j=0;j<meteor.length;j++){
    if(meteor[j].position.x-meteor[j].length/Math.SQRT2>canvas.width||meteor[j].position.y-meteor[j].length/Math.SQRT2>canvas.height){
        meteor.splice(j,1);
        meteor.push({position:{x:Math.random()*canvas.width*0.75,y:0},color:"",length:Math.random()*2*d_+d_});
      }else{
        meteor[j].position.x+=dd/2;
        meteor[j].position.y+=dd/2;
        grd = ctx.createRadialGradient(meteor[j].position.x,meteor[j].position.y, 1, meteor[j].position.x, meteor[j].position.y, dd);
        grd.addColorStop(0, "rgba(255,255,255,0.3)");
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(meteor[j].position.x-dd/2, meteor[j].position.y-dd/2, dd, dd);
        ctx.moveTo(meteor[j].position.x,meteor[j].position.y);
        ctx.lineTo(meteor[j].position.x-meteor[j].length/Math.SQRT2,meteor[j].position.y-meteor[j].length/Math.SQRT2);
        ctx.strokeStyle="rgba(255,255,255,0.2)";
        ctx.stroke();
      }
    }
    for(j = lines.length - 1; j >= 0; j--) {
      ctx.fillStyle = lines[j];
      var angle = (step+j*90)*Math.PI/180;
      var deltaHeight   = Math.sin(angle) * d_;
      var deltaHeightRight   = Math.cos(angle) * d_;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height/3*2+deltaHeight);
      ctx.bezierCurveTo(canvas.width /2, canvas.height/3*2+deltaHeight-d_, canvas.width / 2, canvas.height/3*2+deltaHeightRight-d_, canvas.width, canvas.height/3*2+deltaHeightRight);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.lineTo(0, canvas.height/3*2+deltaHeight);
      ctx.closePath();
      ctx.fill();
    }


    /*
    j=2;
    ctx.fillStyle = lines[j];
    var angle = (step+j*135)*Math.PI/180;
    var deltaHeight   = Math.sin(angle) * d_;
    var deltaHeightRight   = Math.cos(angle) * d_;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/3*2+deltaHeight);
    ctx.bezierCurveTo(canvas.width /2, canvas.height/3*2+deltaHeight-d_, canvas.width / 2, canvas.height/3*2+deltaHeightRight-d_, canvas.width, canvas.height/3*2+deltaHeightRight);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(0, canvas.height/3*2+deltaHeight);
    ctx.closePath();
    ctx.fill();


    j=1;
    ctx.fillStyle = lines[j];
    angle = (step+j*135)*Math.PI/180;
    deltaHeight   = Math.sin(angle) * d_/0.8;
    deltaHeightRight   = Math.cos(angle) * d_/0.8;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/3*2+deltaHeight);
    ctx.bezierCurveTo(canvas.width /2, canvas.height/3*2+deltaHeight-d_/0.8, canvas.width / 2, canvas.height/3*2+deltaHeightRight-d_/0.8, canvas.width, canvas.height/3*2+deltaHeightRight);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(0, canvas.height/3*2+deltaHeight);
    ctx.closePath();
    ctx.fill();


    j=0;
    ctx.fillStyle = lines[j];
    angle = (step+j*135)*Math.PI/180;
    deltaHeight   = Math.sin(angle) * d_*0.8;
    deltaHeightRight   = Math.cos(angle) * d_*0.8;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/3*2+deltaHeight);
    ctx.bezierCurveTo(canvas.width /2, canvas.height/3*2+deltaHeight-d_*0.8, canvas.width / 2, canvas.height/3*2+deltaHeightRight-d_*0.8, canvas.width, canvas.height/3*2+deltaHeightRight);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(0, canvas.height/3*2+deltaHeight);
    ctx.closePath();
    ctx.fill();
*/

    requestAnimFrame(loop);
  }
export default{
  data:function(){
    return({
      canvasWidth:document.body.clientWidth,
      canvasHeight:document.body.clientWidth*0.5,
      data:{topic:"这是头条推文这是头条推文",list1:[],list2:[]},
      loaded:false,
      rem:18
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
          window.location.href="main.html";
        }
      }
    },
  mounted:function(){
    canvas = document.querySelector("canvas");
    ctx = document.querySelector("canvas").getContext("2d");
    d_=canvas.width*0.08;
    for(var i=0;i<2;i++){
      meteor.push({position:{x:-10*d_+Math.random()*30*d_,y:-5*d_-Math.random()*d_},color:"",length:d_/2});
    }
    for(i = 0;i<10;i++){
      stars.push({x:d_+Math.random()*10*d_,y:d_+Math.random()*5*d_});
    }
    loop();
    var vue_this = this;
    /*axios.get('mainPageData.php')
      .then(function (response) {
        console.log(response);
        response=response.data;
        vue_this.data=response;
        vue_this.loaded = true;
      })
      .catch(function (error) {
        console.log(error);
        if(error)alert("主页加载失败！");
        vue_this.loaded = true;
      });*/
    vue_this.rem =parseInt( window.getComputedStyle(document.documentElement)["fontSize"]);
    console.log(vue_this.rem);
    vue_this.data={
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
        {"title":"\u559d\u7684","subTitle":["\u64e6\u8d39","asfs","assaf","safef","asdd","frevc"]},{"title":"\u73a9\u7684","subTitle":["\u64e6\u8d39","asfs","assaf","safef","asdd","frevc"]},{"title":"\u5065\u8eab","subTitle":["\u64e6\u8d39","asfs","assaf","safef","asdd","frevc"]}],"list2":["\u6c27\u6c14\u5382","\u6c27\u6c14\u5382","\u6c27\u6c14\u5382","\u6c27\u6c14\u5382","SB\u9a7e\u6821","\u7ec5\u5b9d"]};
    vue_this.loaded = true;
    for(var i=0;i<vue_this.data.list1;i++){
      vue_this.data.list1[i].n=i;
    }
    console.log(vue_this.data.list1);
  }
}
</script>
