<template>
  <div class="store-list-root" v-bind:class="{'show': loaded}">
    <div class="store-list-header">
      <router-link class="store-list-return" to="/noAnim"><span></span></router-link>
      <h1>{{title}}</h1>
      <div class="tip"></div>
      <div class="search" v-bind:class="{'active': isSearchActive}" v-on:click="searchActive">
        <button v-on:click="search">搜索</button>
        <input type="text" placeholder="输入搜索内容" v-on:click="inputClick" v-model="keyword" v-on:keyup.enter="search">
      </div>
      <div class="menu" v-bind:class="{'active': isMenuActive}" v-on:click="menuActive">
        <button v-on:blur="menuActive">菜单</button>
        <ul class="menu">
          <li><button v-on:click="sort1">综合排序</button></li>
          <li></li>
          <li><button v-on:click="sort2">高分排序</button></li>
          <li></li>
          <li><button v-on:click="sort3">低分排序</button></li>
        </ul>
      </div>
    </div>
    <div class="store-list-body">
      <ul>
        <li v-for="item in data" >
          <div class="title-container" v-on:click="$router.push('/storeDetail/'+item.id);">
            <h2>{{item.name}}</h2>
            <span>{{convertToFloat(item.score)}}</span>
          </div>
          <ul class="tags" v-on:click="$router.push('/storeDetail/'+item.id);">
            <li v-for="item2 in item.tags">{{item2[0]}}</li>
          </ul>
          <ul class="pic" v-on:click="$router.push('/storeDetail/'+item.id);">
            <li v-for="(item3, index) in item.picURLs.slice(0,3)">
              <img v-bind:src="item3.msrc" class="preview-img" />
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="store-list-footer">
      <router-link to="/newStore"><span></span>添加新店</router-link>
    </div>
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
div.store-list-root div.store-list-header a{
  vertical-align: top;
}
div.store-list-root div.store-list-header{
  height: 3.2rem;
  width:100%;
  background: linear-gradient(90deg,#343856,#4F5E93);
  position: relative;
  z-index: 99;
}
div.store-list-header div.tip{
  background: url("../assets/storeList/tip.png");
  background-size: 100% 100%;
  height:0.8rem;
  width:4rem;
  position: absolute;
  bottom: 0;
  left:2rem;
}
div.store-list-header div.search{
  width:10rem;
  height:1.4rem;
  display: inline-block;
  font-size: 0;
  margin:0.95rem 0;
  position: absolute;
  right:2rem;
}
div.store-list-header div.search>button{
  width:1rem;
  height:1rem;
  display: inline-block;
  border:0;
  background: url("../assets/storeList/search.png") ;
  background-size: 100% 100%;
  font-size: 0;
  padding:0;
  margin:0.1rem 0.2rem;
  vertical-align: top;
  float: right;
}
div.store-list-header div.search.active>input{
  width: 7rem;
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
}
div.store-list-header div.search>input{
  width:1.2rem;
  height:1.2rem;
  border:0;
  border-radius: 0.6rem;
  padding-left: 0.5rem;
  background: #E3E3E5;
  font-size: 0.8rem;
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
  float: right;
}
div.store-list-header div.menu{
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  right:0;
  text-align: right;
  width:1.5rem;
}
div.store-list-header div.menu>ul>li:nth-child(2n-1){
  height: 2rem;
  line-height: 2rem;
  text-align: center;
}
div.store-list-header div.menu>ul>li:nth-child(2n){
  height:1px;
  margin:0 0.5rem;
  background: #bbb;
}
div.store-list-header div.menu>ul>li>button:focus{}
div.store-list-header div.menu>ul>li>button{
  border:0;
  width:100%;
  height:100%;
  background: transparent;
  padding:0;
  outline: none;
}
div.store-list-header div.menu.active>ul{
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
}
div.store-list-header div.menu>ul{
  background: #FFF;
  width:6rem;
  text-align: center;
  box-shadow: 0 0 1rem 0.1rem rgba(160,160,160,0.3);
  z-index: 66;
  border-radius: 0.2rem;
  font-size: 0.8rem;
  position:absolute;
  right:0;
  -webkit-transform-origin:100% 0;
  -moz-transform-origin:100% 0;
  -ms-transform-origin:100% 0;
  -o-transform-origin:100% 0;
  transform-origin:100% 0;
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  -ms-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
  -webkit-transition:all 0.25s;
  -moz-transition: all 0.25s;
  -ms-transition:all 0.25s;
  -o-transition: all 0.25s;
  transition: all 0.25s;
}
div.store-list-header div.menu>button{
  font-size: 0;
  background: url("../assets/storeList/menu.png");
  background-size: 100% 100%;
  width:0.33rem;
  height:1rem;
  border:0;
  display:inline-block;
  padding:0;
  margin:1.1rem 0.8rem 1.1rem 0;
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
  width:5rem;
  height:1rem;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;

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
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0;
  display: inline-block;
  width: calc(100% - 2rem);
}
div.store-list-body>ul div.title-container{
  padding:0.5rem 0 0.2rem 0;
}
div.store-list-body>ul div.title-container>span{
  float: right;
  font-size: 0.8rem;
  font-weight: 300;
  height: 1.2rem;
  line-height: 1.2rem;
  width:2rem;
}
div.store-list-body>ul ul.tags{
  padding:0 0.2rem;
  max-height:1.2rem;
  overflow: hidden;
  margin: 0.2rem 0 0.5rem 0;
  font-size: 0;
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
  font-size: 0.7rem;
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
div.store-list-footer>a{
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
div.store-list-footer{
  font-size: 1rem;
  text-align: center;
  position: relative;
}
div.store-list-footer>a>span {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: url("../assets/storeList/button.png");
  background-size: 6rem 1rem;
  vertical-align:middle;
  margin:0 0.5rem
}
ul.pic>li>img{
  width:100%;
  height:100%;
}
</style>
<script>
var axios = require('axios');
module.exports = {
  data: function () {
    return ({
      loaded: false,
      data: [],
      isMenuActive: false,
      isSearchActive: false,
      title: '',
      keyword: ''
    });
  },
  watch: {
    '$route': function () {
      var vueThis = this;

      if (vueThis.$route.path.includes('storeList') && vueThis.$route.path.includes('search')) {
        vueThis.title = '搜索: ' + vueThis.$route.params.keyword;
        /* vueThis.data=[{"id":1,"name":"\u8001\u518d","openTime":"6:00-24:00","adress":"XXXXXXX","score":9,"overall":9.8,"picURLs":["path\/to\/pic1","\u6700\u597d\u662f\u7edd\u5bf9\u8def\u5f84"],"tags":[["\u73af\u5883\u597d",10],["\u9002\u5408\u81ea\u4e60",20],["\u96be\u559d",7]]},{"id":2,"name":"F2","openTime":"6:00-24:00","adress":"XXXXXXX","score":7,"overall":6.8,"picURLs":["",""],"tags":[["\u73af\u5883\u597d",1],["\u4e0d\u9002\u5408\u81ea\u4e60",5],["\u96be\u559d",7]]}];
        vueThis.loaded=true; */
        axios.get('store_list_search_data?keyword=' + vueThis.$route.params.keyword)
         .then(function (response) {
           response = response.data;
           response.data.sort(function (a, b) {
             return b.overall - a.overall;
           });
           vueThis.data = response.data;
           if (response.data.length === 0) {
             vueThis.$router.replace('noStore');
           }
         // vueThis.$router.push("");
           vueThis.loaded = true;
         })
         .catch(function (error) {
           if (error)alert('加载失败！');
           vueThis.loaded = true;
         });
      } else {
        vueThis.title = vueThis.$route.params.type;
        axios.get('store_list_data?type=' + vueThis.$route.params.type)
         .then(function (response) {
           response = response.data;
           response.data.sort(function (a, b) {
             return b.overall - a.overall;
           });
           vueThis.data = response.data;
           vueThis.loaded = true;
         })
         .catch(function (error) {
           if (error)alert('加载失败！');
           vueThis.loaded = true;
         });
      }
    }
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
    menuActive: function () {
      this.isMenuActive = !this.isMenuActive;
    },
    searchActive: function () {
      this.isSearchActive = !this.isSearchActive;
    },
    sort1: function () {
      this.data.sort(function (a, b) {
        return b.overall - a.overall;
      });
      this.isMenuActive = !this.isMenuActive;
    },
    sort2: function () {
      this.data.sort(function (a, b) {
        return b.score - a.score;
      });
      this.isMenuActive = !this.isMenuActive;
    },
    sort3: function () {
      this.data.sort(function (a, b) {
        return a.score - b.score;
      });
      this.isMenuActive = !this.isMenuActive;
    },
    inputClick: function () {
      this.isSearchActive = !this.isSearchActive;
    },
    addNewStore: function () {

    },
    search: function () {
      if (this.keyword !== '') {
        this.$router.push('/storeList/search/' + this.keyword);
      }
    }
  },
  mounted: function () {
    var vueThis = this;
    if (vueThis.$route.path.includes('storeList') && vueThis.$route.path.includes('search')) {
      vueThis.title = '搜索: ' + vueThis.$route.params.keyword;
      axios.get('store_list_search_data?keyword=' + vueThis.$route.params.keyword)
        .then(function (response) {
          response = response.data;
          response.data.sort(function (a, b) {
            return b.overall - a.overall;
          });
          vueThis.data = response.data;
          vueThis.data = response.data;
          if (response.data.length < 1) {
            vueThis.$router.replace('/storeList/search/noStore');
          }
          vueThis.loaded = true;
        })
        .catch(function (error) {
          if (error)alert('加载失败！');
          vueThis.loaded = true;
        });
    } else {
      vueThis.title = vueThis.$route.params.type;
      axios.get('store_list_data?type=' + vueThis.$route.params.type)
        .then(function (response) {
          response = response.data;

          response.data.sort(function (a, b) {
            return b.overall - a.overall;
          });
          vueThis.data = response.data;
          // vueThis.$router.push("");

          vueThis.loaded = true;
        })
        .catch(function (error) {
          if (error)alert('加载失败！');
          vueThis.loaded = true;
        });

      /* vueThis.data=[{"id":1,"name":"\u8001\u518d","openTime":"6:00-24:00","adress":"XXXXXXX","score":9,"overall":9.8,"picURLs":["path\/to\/pic1","\u6700\u597d\u662f\u7edd\u5bf9\u8def\u5f84"],"tags":[["\u73af\u5883\u597d",10],["\u9002\u5408\u81ea\u4e60",20],["\u96be\u559d",7]]},{"id":2,"name":"F2","openTime":"6:00-24:00","adress":"XXXXXXX","score":7,"overall":6.8,"picURLs":["",""],"tags":[["\u73af\u5883\u597d",1],["\u4e0d\u9002\u5408\u81ea\u4e60",5],["\u96be\u559d",7]]}];
      vueThis.loaded=true; */
    }
  }
}
</script>
