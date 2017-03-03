<template>
  <div class="new-store-root" v-bind:class="{'show':loaded}">
    <div class="new-store-header">
      <div class="new-store-alert"></div>
      <img src="../assets/newStore/header.png" v-on:load="n++;checkLoad()"/>
      <h1><span></span><span>添加新店</span></h1>
    </div>
    <div class="new-store-input">
      <div class="input-item" v-for="item in items" v-bind:class="item.inputType" v-bind:data-necessary="item.necessary">
        <template v-if="item.inputType==='select'">
          <h2><span>{{item.title}}</span></h2>
          <div class="mask" v-bind:class="{'show':inSelection}" v-on:click="inSelection = false;"></div>
          <div class="select-list" v-bind:class="{'show':inSelection}">
            <button class="select-option" v-for="option in item.ops" v-bind:data-id="option.id" v-on:click="select">{{option.name}}</button>
          </div>
          <span class="input" v-bind:placeholder="item.placeholder" v-on:click="selectClick" v-bind:style="{'color':selectValue === ''?'#A9A9A9':'#000'}">{{selectValue===""?item.placeholder:selectValue}}</span>
        </template>
        <template v-else-if="item.inputType==='shortText'">
          <h2><span>{{item.title}}</span></h2>
          <input v-bind:placeholder="item.placeholder" v-bind:id="item.name" type="text"/>
        </template>
        <template v-else-if="item.inputType==='longText'">
          <h2><span>{{item.title}}</span></h2>
          <textarea v-bind:placeholder="item.placeholder" v-bind:id="item.name" type="text"></textarea>
        </template>

      </div>
    </div>
    <button class="submit" v-on:click="submit">提交</button>
  </div>
</template>
<style scoped>
div.new-store-root{
  background-color: #EEF1FA;min-height:100%;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.5s;
  padding-bottom: 1.5rem;
}
div.new-store-root.show{
  opacity: 1;
}
img{
  width:100%;
  height:auto;
}
h1>span:first-child{
  background: url("../assets/newStore/laugh.png");
  background-size: 100% 100%;
  width:1.1rem;
  height:1.1rem;
  display: inline-block;
  vertical-align: middle;
  line-height: 1.1rem;
  margin-right:1.1rem;
}
h1{
  font-size: 1.1rem;
  line-height: 1.1rem;
  color:#FFF;
  display: block;
  position: absolute;
  top:0;
  margin:0.94rem 1.56REM;
}
div.new-store-input>div.input-item:nth-child(2n-1)>h2::before{
  content:"";
  width: 0.16rem;
  height: 1rem;
  background: #8A98F7;
  display: inline-block;
  border-radius:0.0625rem;
  vertical-align: middle;
  margin-right: 0.3125rem;
  font-weight: 400;
}
div.new-store-input>div.input-item:nth-child(2n)>h2::before{
  content:"";
  width: 0.16rem;
  height: 1rem;
  background: #F58AC9;
  display: inline-block;
  border-radius:0.0625rem;
  vertical-align: middle;
  margin-right: 0.3125rem;
  font-weight: 400;
}
h2{
  font-size: 0.94rem;
  width:5rem;
  display: inline-block;
  font-weight: 400;
}
h2>span{
  text-align: justify;
  text-align-last: justify;
  text-align-all: justify;
  width:4.06rem;
  display: inline-block;
  line-height: 1rem;
  vertical-align: middle;
  -moz-text-align-last:justify;
}
h2::after{
  content: ":";
  margin: 0 0.03rem;
  vertical-align: middle;
}
input,span.input{
  border: 0;
  background-color: transparent;
  border-bottom:1px solid #B6b6b6;
  display: inline-block;
  height:1.25rem;
  box-sizing: border-box;
  font-size: 0.78rem;
  margin-left: 0.3125rem;
  padding:0 0.3125rem;
  width:calc(100% - 5.625rem);
}
div.new-store-input{
  width:calc(100% - 2.5rem);
  margin:0 auto;
  border-radius:0.625rem;
  background-color: #FFF;
  box-shadow: 0 0 1.25rem 0.625rem rgba(84,101,157,0.2);
  margin-top: 2.5rem;
}
div.new-store-input>div.input-item.longText>textarea{
  width:calc(100% - 5.625rem);
  vertical-align: top;
  margin:0.94rem 0 0.625rem 0.3125rem;
  border:0;
  background-color: transparent;
  resize: none;
  height:1.25rem;
  border-bottom: 1px solid #B6b6b6;
  font-size: 0.78rem;
  padding:0 0.3125rem;
  box-sizing: border-box;
}
div.new-store-input>div.input-item.select>div.select-list{
  width:calc(100% - 5rem);
  vertical-align: top;
  height:50%;
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color: #EBEDF8;
  border-radius: 0.5rem;
  margin:auto auto;
  overflow: auto;
  padding: 0.5rem;
}
button.select-option{
  border:none;
  width:100%;
  height:1.43rem;
  background-color: transparent;
  color: #6C77C9;
  font-size: 0.78rem;
  display: block;
}
button.select-option.active{
  background-color: #6C77C9;
  color:#FFF;
}
div.new-store-input>div.input-item{
  padding:0 0.94rem;
  font-size: 0;
}
button.submit{
  border:0;
  width:10.625rem;
  height:2.5rem;
  border-radius: 1.5625rem;
  background: url("../assets/newStore/new_button.png");
  background-size: 100% 100%;
  font-size: 1.1rem;
  color:#fff;
  margin:1.5625rem auto 0 auto;
  display: block;
  -webkit-transition: all 1s;
  transition: all 1s;
  box-shadow: 0 0 0.3rem 0.2rem rgba(179,192,227,0.65);
  outline: none;
}
button.submit:focus{
  box-shadow: 0 0 0.3rem 0.2rem rgba(179,192,227,0.65);
}
div.new-store-header{
  position: relative;
}

div.new-store-alert{
  z-index: 10;
  background-color: transparent;
  opacity: 0.5;
  width:100%;
  height:3.75rem;
  position: fixed;
  top:0;
  transform: translateY(-100%);
  -webkit-transform: translateY(-100%);
  overflow: hidden;
  text-align: center;
  color:#FFF;
  -webkit-transition: 0.5s ease-in-out;
  transition:0.5s ease-in-out;
  font-size: 0.94rem;
}
div.new-store-alert.show{
  -webkit-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
}
div.select-list{
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  -ms-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
  z-index: -1;
  opacity:0;
}
div.select-list.show{

  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
  display: block;
  z-index: 9999;
  opacity:1;
}
div.mask{
  width:100%;
  height:100%;
  position: fixed;
  bottom: 0;
  left:0;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  background-color: rgba(0,0,0,0);
  z-index: -1;
}
div.mask.show{
  background-color: rgba(0,0,0,0.8);
  display: block;
  z-index: 9998;
}
</style>
<script>
  var time_left=0;
  var timer;
  function alert_(s,time,background,callback){
    if(typeof time ==="undefined"){
      time=2100;
    }
    if(typeof background === "undefined"){
      background="crimson";
    }
    if(typeof callback === "undefined"){
      callback=function(){};
    }
    clearInterval(timer);
    time_left=time;
    var alert_div = document.querySelector("div.new-store-alert");
    alert_div.classList.add("show");
    alert_div.style.background=background;
    alert_div.innerHTML="<p>"+s+"</p>";
    timer = setInterval(function(){
      time_left-=30;
      if(time_left<=0){
        alert_div.classList.remove("show");
        alert_div.style.background="transparent";
        clearInterval(timer);
        return(callback());
      }
    },30);
  }
  var axios = require("axios");
  var form;
  /*var form=[
    {
      title:"类型",
      placeholder:"",
      inputType:"select",
      necessary:true,
      ops:[
        {name:"aygfy",id:1},
        {name:"bsd",id:2},
        {name:"b",id:54},
        {name:"bsfd",id:545}
      ]},
    {
      title:"商家名称",
      placeholder:"必填",
      inputType:"shortText",
      necessary:true
    },
    {
      title:"地址",
      placeholder:"请描述具体位置",
      inputType:"shortText",
      necessary:true
    },
    {
      title:"营业时间",
      placeholder:"选填",
      inputType:"shortText",
      necessary:false
    },
    {
      title:"描述",
      placeholder:"选填",
      inputType:"longText",
      necessary:false
    }
  ];*/

  export default {
    data:()=>{
      return({
        items:form,
        loaded:false,
        n:0,
        inSelection:false,
        selectValue:""
      })
    },
    methods:{
      submit:function(){
        if(0){
          alert("请完整填写！");
        }else{
          var vue_this=this;
          var datas=[];
          var list_item = document.querySelectorAll("div.input-item");
          for(var i=0;i<list_item.length;i++){
            if(list_item[i].classList.contains("select")){
              var name = list_item[i].querySelector("h2>span").innerHTML;
              var ops=[];
              var list = document.querySelectorAll("button.select-option.active");
              if(list.length===0 && list_item[i].dataset.necessary=="true"){
                alert_("没有选择" + name);
                return;
              }
              for(var n=0;n<list.length;n++){
                ops.push({id:list[n].dataset.id,name:list[n].innerHTML});
              }
              datas.push({
                name:name,
                type:"select",
                ops:ops
              });
            }else if(list_item[i].classList.contains("shortText")){
              var value=list_item[i].querySelector("input").value;
              var name=list_item[i].querySelector("h2>span").innerHTML;
              if(value==="" && list_item[i].dataset.necessary=="true"){
                alert_("没有填写"+name);
                return;
              }
              datas.push({
                name:name,
                type:"shortText",
                value:value
              });
            }else if(list_item[i].classList.contains("longText")){
              var value=list_item[i].querySelector("textarea").value;
              var name=list_item[i].querySelector("h2>span").innerHTML;
              if(value==="" && list_item[i].dataset.necessary=="true"){
                alert_("没有填写"+name);
                return;
              }
              datas.push({
                name:name,
                type:"longText",
                value:value
              });
            }
          }
          datas=encodeURIComponent(JSON.stringify(datas));
          axios.post('add_store', {
            data: datas
          })
            .then(function (response) {
              response=response.data;
              if(!response.error){
                vue_this.$router.push("/newStore/addSuccess");
              }else{
                alert_("提交失败：服务器拒绝您的数据！");
              }
            })
            .catch(function (error) {
              if(error){
                alert_("网络出错！");
              }
            });
        }
      },
      select:function(a){
        var ele=a.target;
        if(document.querySelectorAll("button.select-option.active").length>=1){
          document.querySelector("button.select-option.active").classList.remove('active')
        }
        ele.classList.add('active');
        this.selectValue = ele.innerHTML;
        this.inSelection = false;
      },
      init:function(){
        var vue_this = this;
        axios.get('store_form_data')
          .then(function (response) {
            response=response.data;
            vue_this.items=response.data;
            vue_this.n++;
            vue_this.checkLoad();
          })
          .catch(function (error) {
            console.log(error);
            if(error)alert_("加载表单失败！");
          });
      },
      checkLoad:function(){
        if(this.n===2){
          this.loaded = true;
        }
      },
      selectClick:function(){
        this.inSelection = true;
      }
    },
    mounted:function(){
        this.init();
    }
  }
</script>
