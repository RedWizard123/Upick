<template>
  <div class="comment-root" v-bind:class="{'show':loaded}">
    <div class="comment-header">
      <router-link class="comment-back" to="/"></router-link>
      <img src="../assets/comment/comment_top.png"/>
      <div class="comment-float"></div>
      <h1>{{data.name}}</h1>
    </div>
    <div class="comment-body">
      <div class="choose-tags">
        <div class="width-ruler"></div>
        <div class="tags-pre" style="display:block;opacity: 0;position:absolute;z-index:-1;">
          <button v-for="item in data.tags" v-on:click="select">{{item.title}}</button>
        </div>
        <swipe :auto="0" :continous="false" v-if="loaded">
          <swipe-item class="tags swiper-slide" v-for="(item,index) in pages" v-bind:style="{width: width_ +'px'}">
            <div class="button-viewport">
              <div class="button-wrap" v-bind:style="{top:'-' + 3.2*index + 'rem'}">
                <button v-for="item in data.tags" v-on:click="select">{{item.title}}</button>
              </div>
            </div>
          </swipe-item>
        </swipe>
        <div class="dots">

        </div>
      </div>
      <div class="comment-write">
        <textarea placeholder="可选(限200字以内)"></textarea>
      </div>
    </div>
    <div class="comment-footer">
      <a v-on:click="$router.replace('/comment/success');"><span></span> 下一步 </a>
    </div>
  </div>
</template>
<style scoped>
div.comment-root{
  opacity: 0;
  min-height: 100%;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  -webkit-flex-direction: column;
}
div.comment-root.show{
  opacity: 1;
}
div.comment-header{
  position: relative;
}
div.comment-header>a.comment-back{
  display: block;
  margin:0 1rem;
  width: 0.55rem;
  height: 1rem;
  background: url("../assets/storeList/return_blue.png");
  background-size: auto 1rem;
  position: absolute;
  top:1rem;
}
div.comment-header>h1{
  font-size: 0.8rem;
  font-weight: 400;
  position: absolute;
  bottom:0;
  text-align: center;
  margin:0.5rem auto;
  left:0;
  right:0;
  top:4.3rem;


}
div.comment-header>div.comment-float{
  position: absolute;
  margin:0.5rem auto;
  left:0;
  right:0;
  width:3.8rem;
  height:3.8rem;
  border-radius: 50%;
  background-color: #2c3e50;
  top:0;
}
div.comment-header>img{
  width:100%;
  height:auto;
}
div.comment-body{
  flex: 1;
  /*padding:0 1.5rem;*/
  display: flex;
  flex-direction: column;
}
div.comment-body>div.choose-tags{
  padding:0 1.5rem;
  position: relative;
  height:4.7rem;
}
div.comment-body>div.choose-tags div.tags-viewport>div{
}
div.comment-body>div.choose-tags div.tags-viewport{
  height:3.2rem;
  overflow: hidden;
  position: relative;
}
div.comment-body>div.choose-tags div.tags{

}
div.comment-body>div.choose-tags>div.dots{
  height:1rem;
  margin-bottom: 0.5rem;
}
div.comment-body>div.choose-tags div.tags button.active{
  background-color: #6C77C9;
  color:#fFFFFF;
}
div.comment-body>div.choose-tags div.tags button{
  height:1.4rem;
  min-width:2rem;
  display: inline-block;
  padding:0;
  margin:0 0.25rem 0.2rem 0.25rem;
  border-radius: 0.3rem;
  background: #FFFFFF;
  border:1px solid #6C77C9;
  font-size: 0.7rem;
}
div.comment-write{
  height:calc(100% - 4.7rem);
  padding:0.5rem 0 1rem 0;
  border-radius: 0.3rem;
  margin:0 1.5rem;
}
div.comment-write>textarea{
  border:0;
  resize: none;
  width:100%;
  padding:0.5rem;
  font-size: 0.7rem;
  background-color:#EEEFFA;
  box-sizing: border-box;
  height:100%;
  border-radius: 0.2rem;
  box-shadow: 0.1rem 0.08rem 0.08rem #DCD4F8 inset;
}
div.comment-footer{
  height: 3.2rem;
  width:100%;
  background: linear-gradient(90deg,#343856,#4F5E93);
  /*position: absolute;*/
  bottom:0;
  position: relative;
}
div.comment-footer>a{
  line-height: 100%;
  height:1rem;
  width: 10rem;
  background: transparent;
  border: 0;
  color:#FFF;
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin:auto auto;
  text-decoration: none;
  text-align: center;
}
div.comment-footer>a>span {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: url("../assets/comment/comment_submit.png") no-repeat;
  background-size: 1rem auto;
  vertical-align:middle;
  margin:0 0.5rem
}
div.button-wrap{
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding:0 0.8rem ;
  overflow: hidden;
  box-sizing: border-box;
}
div.button-viewport{
  position: relative;
  height:3.2rem;
  overflow: hidden;
}
div.mint-swipe-indicators>div.is-active{
  background-color: #5D77B9;
}
div.mint-swipe-indicators{
  bottom:0;
}
</style>
<script>
var touched = false;
var origin = 0;
var p = {x:0,y:0};
require('vue-swipe/dist/vue-swipe.css');
import { Swipe, SwipeItem } from 'vue-swipe';
export default {
  components:{
    "swipe":Swipe,
    "swipe-item":SwipeItem
  },
  data:function(){
    return({
      data:{
        name:"",
        iconURL:"",
        tags:[]
      },
      width_:0,
      pages:[""],
      loaded:false
    });
  },
  methods:{
    select:function(a){
      var ele=a.target;
      ele.classList.contains('active')?ele.classList.remove('active'):ele.classList.add('active');
    }
  },
  watch:{
    pages:function(){
      console.log("aaa");
    }
  },
  mounted:function(){
    var vue_this = this;
    /*var div = document.querySelector("div.tags-viewport>div");
    div.addEventListener("touchstart",function (t) {
      if(t.touches.length === 1){
        touched = true;
        p = {x:t.touches[0].clientX,y:t.touches[0].clientY};
      }
    });
    div.addEventListener("touchmove",function (t) {
      if(t.touches.length === 1 && touched === true){
        div.style.transform = "translateX("+(t.touches[0].clientX - p.x + origin)+"px)";
      }
    });
    div.addEventListener("touchend",function (t) {
      if(t.changedTouches.length === 1){
        touched = false;
        origin += t.changedTouches[0].clientX - p.x;

      }
    });*/
    setTimeout(function(){
      vue_this.data = {
        "name":"老在咖啡",
        "iconURL":"path/to/icon",//学长给绝对路径哦，否则目前我还真不知道怎么搞
        "tags":[
          {"title":"好喝12","id":545},
          {"title":"好喝23","id":545},
          {"title":"好喝4","id":545},
          {"title":"好喝AA","id":545},
          {"title":"好喝AA","id":545},
          {"title":"好喝asf","id":545},
          {"title":"好喝sc","id":545},
          {"title":"好喝afgtr","id":545},
          {"title":"好喝asc","id":545},
          {"title":"好喝afgr","id":545},
          {"title":"好喝tg","id":545},
          {"title":"好喝ADSF","id":545},
          {"title":"好喝dsf","id":545},
          {"title":"好喝adsfs","id":545},
          {"title":"好喝ssa","id":545},
          {"title":"好喝sf","id":545},
          {"title":"好喝sfcs","id":545},
          {"title":"好喝sdc","id":545},
          {"title":"好喝sd","id":545},
          {"title":"好喝sdc","id":545},
          {"title":"好喝sc","id":545},
          {"title":"好喝xsdc","id":545},
          {"title":"好喝wdc","id":545},
          {"title":"好喝scsd","id":545},
          {"title":"好喝scsd","id":545},
          {"title":"好喝scads","id":545},
          {"title":"好喝scs","id":545},
          {"title":"好喝sc","id":545},
          {"title":"好喝sdc","id":545},
          {"title":"好喝sdc","id":545},
          {"title":"好喝sdsc","id":545},
          {"title":"好喝cd","id":545}//前面提到过，这里不需要提供数量
        ]
      };
      vue_this.width_ = document.querySelector("div.width-ruler").clientWidth;
      vue_this.$forceUpdate();
      setTimeout(function(){
        var p = parseInt(document.querySelector("div.tags-pre").clientHeight/(document.querySelector("div.choose-tags").clientHeight*32/47));


        var array = [];
        for(var i=1; i< p+1;i++){
          array.push("");
        }
        vue_this.pages = array;
        vue_this.loaded = true;
        console.log(vue_this.pages);
      },200);
    },100);
  }
}
</script>
