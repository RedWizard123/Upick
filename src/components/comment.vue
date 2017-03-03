<template>
  <div class="comment-root" v-bind:class="{'show':loaded}">
    <div class="alert" v-bind:class="{'show':alertShow}"><p>{{alertValue}}</p></div>
    <div class="comment-header">
      <router-link class="comment-back" to="/"></router-link>
      <img src="../assets/comment/comment_top.png" v-on:load="n++;n>=3?loaded=true:0;"/>
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
              <div class="button-wrap" v-bind:class="{'last':index===pages.length-1}" v-bind:style="{top:'-' + 3.2*index + 'rem'}">
                <button v-for="item in data.tags" v-on:click="select" v-bind:data-id="item.id">{{item.title}}</button>
              </div>
            </div>
          </swipe-item>
        </swipe>
        <div class="dots">

        </div>
      </div>
      <textarea placeholder="可选(限200字以内)" v-model="text"></textarea>
    </div>
    <div class="comment-footer">
      <a v-on:click="next"><span></span>下一步 </a>
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
  position: relative;
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

textarea{
  border:0;
  resize: none;
  width:calc(100% - 3rem);
  font-size: 0.7rem;
  background-color:#EEEFFA;
  box-sizing: border-box;
  box-shadow: 0.1rem 0.08rem 0.08rem #DCD4F8 inset;
  height:calc(100% - 5.3rem);
  padding:0.5rem 0.5rem 1rem 0.5rem;
  border-radius: 0.3rem;
  margin:0.5rem 1.5rem 0.5rem 1.5rem;
  position: absolute;
  bottom:0;
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
div.button-wrap.last{
  justify-content: flex-start;
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
div.tags-pre>button{
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
div.tags-pre{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;

}
div.alert.show{
  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -ms-transform: translateY(0);
  -o-transform: translateY(0);
  transform: translateY(0);
  background-color: red;
  opacity: 1;
}
div.alert>p{
  text-align: center;
  line-height: 3rem;
  font-size: 0.8rem;
  margin:0;
  color: #FFF;

}
div.alert{
  height: 3rem;
  width:100%;
  position: fixed;
  top:0;
  -webkit-transform: translateY(-100%);
  -moz-transform: translateY(-100%);
  -ms-transform: translateY(-100%);
  -o-transform: translateY(-100%);
  transform: translateY(-100%);
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  z-index: 100;
  opacity: 0;
}
</style>
<script>
require('vue-swipe/dist/vue-swipe.css');
var axios = require("axios");
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
      loaded:false,
      text:"",
      n:0,
      alertShow:"",
      alertValue:"",
      alertTimeout:0
    });
  },
  methods:{
    select:function(a){
      var ele=a.target;
      ele.classList.contains('active')?ele.classList.remove('active'):ele.classList.add('active');
    },
    next:function(){
      if(document.querySelectorAll(".choose-tags button.active").length === 0){
        this.alert_("未选择标签！");
        return;
      }
      if(this.text === ""){
        this.alert_("未填写详情！");
        return;
      }
      this.$router.replace('/comment/mark/'+this.$route.params.id+'/'+this.data.name+'/'+this.getChosenTags()+'/'+this.text);
    },
    getChosenTags:function(){
      var list = document.querySelectorAll(".choose-tags button.active");
      var t = [];
      for(var i = 0;i<list.length;i++){
        t.push(list[i].dataset.id);
      }
      return(t.join("&"));
    },
    alert_:function(value){
      clearTimeout(this.alertTimeout);
      this.alertValue = value;
      this.alertShow = true;
      var vue_this = this;
      this.alertTimeout = setTimeout(function(){
        vue_this.alertShow = false;
      },2500);
    }
  },
  watch:{
    pages:function(){

    }
  },
  mounted:function(){
    var vue_this = this;
    axios.get('comment_data?id='+vue_this.$route.params["id"])
      .then(function (response) {
        response=response.data;
        vue_this.data=response.data;
        vue_this.n++;
        vue_this.width_ = document.querySelector("div.width-ruler").clientWidth;
        vue_this.$forceUpdate();
        setTimeout(function(){
          var p = parseInt(document.querySelector("div.tags-pre").clientHeight/(document.querySelector("div.choose-tags").clientHeight*32/47));
          document.querySelector("div.tags-pre").style.display = "none";
          var array = [];
          for(var i=0; i< p+1;i++){
            array.push("");
          }
          vue_this.pages = array;
          vue_this.n++;
          vue_this.n>=3?vue_this.loaded=true:0;
        },200);
      })
      .catch(function (error) {
        console.log(error);
        if(error)alert("加载失败！");
        vue_this.loaded = true;
      });
  }
}
</script>
