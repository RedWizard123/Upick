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
        <div class="tags-viewport">
          <div>
            <div class="tags">
              <button v-for="item in data.tags" v-on:click="select">{{item.title}}</button>
            </div>
          </div>
        </div>
        <div class="dots">
          <span></span>
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
}
div.comment-body>div.choose-tags div.tags{
  height:3.2rem;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding:0 0.8rem ;
  overflow: hidden;
}
div.comment-body>div.choose-tags>div.dots{
  height:1rem;
  margin-bottom: 0.5rem;
}
div.comment-body>div.choose-tags div.tags>button.active{
  background-color: #6C77C9;
  color:#fFFFFF;
}
div.comment-body>div.choose-tags div.tags>button{
  height:1.4rem;
  min-width:2rem;
  display: inline-block;
  padding:0;
  margin:0 0.25rem 0.3rem 0.25rem;
  border-radius: 0.3rem;
  background: #FFFFFF;
  border:1px solid #6C77C9;
  font-size: 0.7rem;
}
div.comment-write{
  flex:1;
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
  box-shadow: -0.1rem -0.08rem 0.08rem #DCD4F8;
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
</style>
<script>
export default {
  data:function(){
    return({
      data:{
        name:"",
        iconURL:"",
        tags:[]
      },
      loaded:false
    });
  },
  methods:{
    select:function(a){
      var ele=a.target;
      ele.classList.contains('active')?ele.classList.remove('active'):ele.classList.add('active');
    }
  },
  mounted:function(){
    var vue_this = this;
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
          {"title":"好喝sc","id":545},
          {"title":"好喝cd","id":545}//前面提到过，这里不需要提供数量
        ]
      };

      vue_this.loaded = true;
    },100);
  }
}
</script>
