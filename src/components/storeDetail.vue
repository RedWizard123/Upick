<template>
  <div class="store-detail-root" v-bind:class="{'show':loaded}">
    <div class="store-detail-header">
      <!--<a v-on:click="$router.go(-1);"><span class="back"></span></a>-->
      <h1>{{detail.name}}</h1>
      <div class="tip"></div>
    </div>
    <div class="store-detail-body">
      <div class="body-top"  v-bind:class="{ 'low' : low && detail.comments.length >= 5}">
        <div class="addr-time">
          <h2 class="time"><span class="icon"></span><span class="icon-time">营业时间:</span>{{detail.openTime}}</h2>
          <h2 class="addr"><span class="icon"></span><span class="icon-addr">地址:</span>{{detail.address}}</h2>
          <span class="score">{{convertToFloat(detail.score)}}分</span>
        </div>
        <div class="container">
          <div class="tags">
            <span v-for="item in detail.tags">{{item[0]}}</span>
          </div>
          <div class="pics">
            <div class="img-con">
              <img class="preview-img" v-for="(item2,index) in detail.picURLs.slice(0,3)" v-bind:src="item2.msrc" v-on:click="$preview.open(index,detail.picURLs)"/>
            </div>
            <div class="mask" v-if="detail.picURLs.length>3">+{{detail.picURLs.length-detail.picURLs_.length}}</div>
          </div>
        </div>
      </div>
      <div class="body-bottom">
        <div class="tabs">
          <span v-bind:class="{'chosen':firstChosen}" v-on:click="firstChosen!=true?firstChosen=!firstChosen:0;">最热评论</span>
          <span v-bind:class="{'chosen':!firstChosen}" v-on:click="firstChosen==true?firstChosen=!firstChosen:0;">最新评论</span>
        </div>
        <ul class="comments-list" id="comments-list">
          <li v-for="item2 in detail.comments">
            <div>
              <span class="date">{{(new Date(item2.date*1000)).toLocaleDateString()}}</span>
              <span
                v-bind:data-id="item2.id"
                class="dislike"
                v-bind:class="{'black':item2.disliked}"
                v-on:click="dislikeOnClick(item2);"
              >
                <span>{{item2.dislike}}</span>
              </span>
              <span
                v-bind:data-id="item2.id"
                class="like"
                v-bind:class="{'black':item2.liked}"
                v-on:click="likeOnClick(item2);"
              >
                <span>{{item2.like}}</span>
              </span>
            </div>
            <p>{{item2.value}}</p>
            <ul class="comment-images-ul" v-if="item2.img && item2.img.length > 0">
              <li v-for="src in item2.img" class="comment-images-li">
                <img :src="src" class="comment-image"></img>
              </li>
              <li v-for="fix in Array(3 - item2.img.length)" class="comment-images-li"></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="store-detail-footer" v-if="loaded && !commented">
      <router-link v-bind:to="'/comment/' + $route.params.id"><span></span>我要评价</router-link>
    </div>
    <div class="store-detail-footer commented" v-else-if="loaded && commented">
      <a>您已经评价过了</a>
    </div>
  </div>
</template>
<script>
var axios = require('axios');
var liked = false;
var disliked = false;
module.exports = {
  data: function () {
    return ({
      loaded: false,
      detail: {
        name: 'A',
        openTime: '',
        address: '',
        picURLs: [],
        picURLs_: [],
        tags: [],
        score: '',
        comments: []
      },
      low: false,
      firstChosen: '',
      list: [],
      commented: false
    });
  },
  methods: {
    convertToFloat: function (a) {
      if (typeof a === 'number') {
        a = a.toString();
      }
      if (a.length === 3) {
        return (a);
      } else {
        return (a + '.0');
      }
    },
    changeLikeStatus: function (liked, disliked, item2) {
      var vueThis = this;
      var temp = [item2.liked, item2.disliked];
      item2.liked = liked;
      item2.disliked = disliked;
      axios.get('changeLikeStatus?id=' + item2.id + '&liked=' + (liked ? 'true' : 'false') + '&disliked=' + (disliked ? 'true' : 'false'))
      .then(function (response) {
        var result = response.data.data.result;
        item2.liked = result.liked;
        item2.disliked = result.disliked;
        item2.like = result.like;
        item2.dislike = result.dislike;
        vueThis.$forceUpdate();
      }).catch(function () {
        item2.liked = temp[0];
        item2.disliked = temp[1];
      });
    },
    likeOnClick: function (item) {
      if (item.liked) {
        liked = false;
      } else {
        disliked = false;
        liked = true;
      }
      this.changeLikeStatus(liked, disliked, item);
    },
    dislikeOnClick: function (item) {
      if (item.disliked) {
        disliked = false;
      } else {
        disliked = true;
        liked = false;
      }
      this.changeLikeStatus(liked, disliked, item);
    }
  },
  watch: {
    'firstChosen': function (from, to) {
      if (to !== false) {
        this.detail.comments.sort(function (a, b) {
          return (b.date - a.date);
        });
      } else {
        this.detail.comments.sort(function (a, b) {
          return (b.like - a.like);
        });
      }
    }
  },
  mounted: function () {
    var vueThis = this;
    document.querySelector('ul#comments-list').addEventListener('scroll', function () {
      vueThis.low = this.scrollTop >= 10;
    });
    axios.get('store_detail?id=' + vueThis.$route.params.id)
    .then(function (response) {
      response = response.data;
      vueThis.detail = response.data;
      vueThis.detail.picURLs_ = vueThis.detail.picURLs.slice(0, 3);
      for (var i = 0; i < vueThis.detail.picURLs.length; i++) {
        vueThis.list.push({src: vueThis.detail.picURLs[i], w: 1200, h: 800});
      }
      vueThis.firstChosen = true;
      vueThis.detail.comments = [];
      axios.get('comments_list?id=' + vueThis.$route.params.id)
      .then(function (response) {
        response = response.data;
        vueThis.detail.comments = response.data;
        // vueThis.detail.comments[0].img = ['/static/img/icon.png', '/static/img/icon.png'];
        axios.get('is_commented?id=' + vueThis.detail.name)
          .then(function (response) {
            response = response.data;
            vueThis.commented = response.result;
            vueThis.loaded = true;
          })
          .catch(function (error) {
            if (error)alert('加载失败！');
            vueThis.loaded = true;
          });
      })
      .catch(function (error) {
        if (error) {
          alert('加载失败！');
        }
        vueThis.loaded = true;
      });
    })
    .catch(function (error) {
      if (error) {
        alert('加载失败！');
      }
      vueThis.loaded = true;
    });
  }
}
</script>
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
  height:100%;
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
  margin:1rem 2rem;
  vertical-align: top;
  line-height: 1rem;
  width: calc(100% - 6rem);
  height:1rem;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
div.store-detail-body{
  height:calc(100% - 6.4rem);
  display: flex;
  flex-direction: column;
  flex: 1;
}
div.store-detail-footer{
  height: 3.2rem;
  width:100%;
  background: linear-gradient(90deg,#343856,#4F5E93);
}
div.store-detail-body>div.body-top{
  padding:0 1.5rem;
  width:100%;
  box-sizing: border-box;
  /* height: 12.5rem; */
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -ms-transition: all 0.2s;
  -o-transition: all 0.2s;
  transition: all 0.2s;
}
div.store-detail-body > div.body-top > div.addr-time{
  padding:1rem 0 0 0;
  position: relative;
}
div.store-detail-body>div.body-top>div.addr-time>h2{
  font-size: 0.75rem;
  font-weight: 400;
  width: calc(100% - 3rem);
  margin: 0.7rem 0 0.2rem 0;
  position: relative;
}
div.store-detail-body>div.body-top>div.addr-time>h2.addr{
  width: 100%;
  word-break: break-all;
}
div.store-detail-body>div.body-top>div.addr-time>h2>span:not(.icon){
  margin:0.5rem 0.2rem 0.5rem 0;
  padding:0;
  height:1rem;
  font-size: 0.9rem;
  font-weight: 600;
  margin-left: 0.9rem;
}
div.store-detail-body>div.body-top>div.addr-time>h2.time>span.icon{
  content: "";
  background: url("../assets/storeDetail/icon.png") no-repeat;
  background-size: 2rem 0.9rem;
  width:0.9rem;
  height: 1rem;
  display: inline-block;
  vertical-align:middle;
  margin-right: 0.3rem;
  top: 0.1rem;
  position: absolute;
}
div.store-detail-body>div.body-top>div.addr-time>h2.addr>span.icon{
  content: "";
  background: url("../assets/storeDetail/icon.png") no-repeat;
  background-position: -1.3rem;
  background-size: 2rem 0.9rem;
  width:0.9rem;
  height: 1rem;
  display: inline-block;
  vertical-align:middle;
  margin-right: 0.3rem;
  top: 0.1rem;
  position: absolute;
}
div.store-detail-body>div.body-top span.score { 
  display: inline-block;
  position: absolute;
  font-size: 0.9rem;
  font-weight: 400;
  top:1.5rem;
  right:0;
  width:2.5rem;
  margin:0.15rem;
}
div.store-detail-body div.body-top div.tags{
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  position: relative;
  max-height: 3rem;
  overflow: hidden;
  font-size: 0;
}
div.store-detail-body div.body-top div.tags>span{
  display: inline-block;
  font-size: .7rem;
  border-radius: .3rem;
  color: #FFF;
  padding: .2rem .3rem;
  margin:0 .2rem .2rem .2rem;
  height: 1rem;
}
div.store-detail-body div.body-top div.tags>span:nth-child(4n+1){
  background: #5D77B9;
}
div.store-detail-body div.body-top div.tags>span:nth-child(4n+2){
  background: #44A3BF;
}
div.store-detail-body div.body-top div.tags>span:nth-child(4n+3){
  background: #568AD0;
}
div.store-detail-body div.body-top div.tags>span:nth-child(4n+4){
  background: #38C4AF;
}
div.store-detail-body div.body-top div.pics{
  position: relative;
}

div.store-detail-body div.body-top div.pics>div.img-con{
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
div.store-detail-body div.body-top div.pics>div.mask{
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
div.store-detail-body div.body-top div.pics > div > img{
  background: #AAAAAA;
  width:5.2rem;
  height:3.2rem;
  display: inline-block;
  margin:0;
  box-sizing: border-box;
}
div.store-detail-body div.body-top div.container{
  transition: all 0.2s;
  transform: scale(1);
  transform-origin:0 0;
}
div.store-detail-body div.body-top.low {
  height:6rem;
}
div.store-detail-body div.body-top.low div.container {
  transform: scale(0);
  opacity: 0;
}
div.store-detail-body div.body-bottom {
  width:100%;
  flex:1;
  overflow: hidden;
  margin-top: 1rem;
}
div.store-detail-body ul.comments-list > li > div {
  color:#666666;
}
div.store-detail-body ul.comments-list > li > div > span{
  display: inline-block;
  height:1rem;
  line-height: 1rem;
}
/*-----------------begin------------------*/

div.store-detail-body ul.comments-list > li > div > span.dislike::before{
  content:"";
  background: url("../assets/storeDetail/like.png");
  height:1rem;
  width: 1rem;
  display: inline-block;
  background-size: 1rem 1rem;
  margin-right: 0.3rem;
  -webkit-transform: rotateX(180deg);
  -moz-transform: rotateX(180deg);
  -ms-transform: rotateX(180deg);
  -o-transform: rotateX(180deg);
  transform: rotateX(180deg);
}

div.store-detail-body ul.comments-list>li>div>span.dislike.black::before{
  content:"";
  background: url("../assets/storeDetail/liked.png");
  height:1rem;
  width: 1rem;
  display: inline-block;
  background-size: 1rem 1rem;
  -webkit-transform: rotateX(180deg);
  -moz-transform: rotateX(180deg);
  -ms-transform: rotateX(180deg);
  -o-transform: rotateX(180deg);
  transform: rotateX(180deg);
}
/*-----------------end------------------*/

div.store-detail-body ul.comments-list>li>div>span.like::before{
  content:"";
  background: url("../assets/storeDetail/like.png");
  height:1rem;
  width: 1rem;
  display: inline-block;
  background-size: 1rem 1rem;
  margin-right: 0.3rem;
}
div.store-detail-body ul.comments-list>li>div>span.like.black::before{
  content:"";
  background: url("../assets/storeDetail/liked.png");
  height:1rem;
  width: 1rem;
  display: inline-block;
  background-size: 1rem 1rem;
}
div.store-detail-body ul.comments-list>li>div>span>span{
  font-size: 0.6rem;
  vertical-align: top;
}
div.store-detail-body ul.comments-list>li>div>span.dislike,
div.store-detail-body ul.comments-list>li>div>span.like{
  float: right;
  margin:0 0.3rem;
}
div.store-detail-body ul.comments-list>li{
  padding:0.5rem 1.5rem;
  border-bottom: solid 1px #B6b6b6;
}
div.store-detail-body ul.comments-list{
  height:calc(100% - 1rem);
  overflow: auto;
  margin:0;
  padding:0;
  list-style: none;
  font-size: 0.7rem;
}
div.store-detail-body div.tabs>span.chosen{
  color:#5D77B9;
  border-bottom: solid 2px #5D77B9;
}
div.store-detail-body div.tabs>span{
  padding:0 0.2rem;
  box-sizing: border-box;
  display: inline-block;
  margin-right: 1rem;
  height:1.4rem;
}
div.store-detail-body div.tabs{
  border-bottom: 1px solid #B6b6b6;
  height:1.4rem;
  padding:0 1.5rem;
  font-size: 0.8rem;
}
div.store-detail-footer>a{
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
}
div.store-detail-footer{
  font-size: 1rem;
  text-align: center;
  position: relative;
}
div.store-detail-footer.commented > a{
  color: #bbb;
}
div.store-detail-footer>a>span {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: url("../assets/storeDetail/comment.png") no-repeat;
  background-size: 1rem auto;
  vertical-align:middle;
  margin:0 0.5rem
}

.comment-images-ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  width: 80%;
}

.comment-images-li {
  width: 4rem;
  height: 4rem;
  display: inline-block;
}
.comment-image {
  width: 100%;
  height: 100%;
}
</style>
