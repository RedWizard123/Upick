<template>
  <div class="mark-root" v-bind:class="{'show':loaded}">
    <div class="alert" v-bind:class="{'show':alertShow}"><p>{{alertValue}}</p></div>
    <div class="mark-header">
      <!--<router-link to="/"><span></span></router-link>-->
      <span>{{$route.params.title}}</span>
    </div>
    <div class="mark-body">
      <div class="img">
        <img class="bad load" src="../assets/mark/bad.png" v-bind:style="{display : score < 5 ? 'block' : 'none'}">
        <img class="normal load" src="../assets/mark/normal.png" v-bind:style="{display : score >= 5 && score<7 ? 'block' : 'none'}">
        <img class="good load" src="../assets/mark/good.png" v-bind:style="{display: score >= 7 ? 'block' : 'none'}">
      </div>
      <div class="switcher">
        <h2>{{score}}分</h2>
        <div v-on:touchstart="touchstart" v-on:touchmove="touchmove" v-on:touchend="touchend">
          <span>0 </span>
          <div class="bar">
            <div>
              <div class="button" v-bind:style="{'transform':'translateX('+offset+'px)'}"></div>
            </div>
          </div>

          <span>10</span>
        </div>
      </div>
    </div>
    <div class="mark-footer">
      <div class="buttons">
        <button v-on:click="submitWithoutMark">暂不评分</button>
        <button v-on:click="submit">完成</button>
      </div>
    </div>
  </div>
</template>
<style>
div.mark-root{
  opacity:0;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}
div.mark-root.show{
  opacity: 1;
}
div.mark-header>span{
  vertical-align:top;
  line-height: 1rem;
  margin:1rem 0;
  display: inline-block;
  height:1rem;
  color:#555792;
  margin-left: 2rem;
}
div.mark-header{
  height:3rem;
}
div.mark-header>a{
  display: inline-block;
  width:0.55rem;
  height:1rem;

  margin:1rem;
}
div.mark-header>a>span{
  background: url("../assets/storeList/return_blue.png");
  background-size: 100% 100%;
  display: inline-block;
  width:100%;
  height:100%;
}
div.mark-body{
  width:100%;
  padding:1rem;
  box-sizing: border-box;
  position: relative;
}
div.mark-body>div.img{
  width:100%;
  padding:70% 0 0 0;
  box-sizing: border-box;
  height:10rem;
  position: relative;

}
div.mark-body>div.img>img{
  width:100%;
  height:auto;
  position: absolute;
  bottom:0;
  margin:0 auto;
}
div.mark-footer>{
  height:5rem;
  padding:1rem 0;
  box-sizing: border-box;
}
div.switcher{
  width:100%;
  margin-top: 2rem;
}
div.switcher h2{
  text-align: center;
  margin: 0;
  font-size: 1.2rem;
  color:#564BA3;
}
div.switcher div{
  width:100%;
}
div.switcher span{
  display: inline-block;
  width:1rem;
  height:1rem;

}
div.switcher>div{
  font-size: 0;
}
div.switcher>div>span:last-child{
  text-align: end;
}
div.switcher>div>span:first-child{
  text-align: left;
}
div.switcher>div>span{
  display: inline-block;
  font-size: 0.9rem;
  color: #AAAAAA;
  width: 1.5rem;
  text-align: center;
  vertical-align: middle;
  line-height: 0.9rem;
}
div.switcher>div>div>div{
  width:1px;
  height:0.15rem;

}
div.switcher div.button{
  background: url("../assets/mark/button_mark.png") no-repeat center center;
  width:1rem;
  height:1rem;
  border-radius: 0.5rem;
  position: absolute;
  top:-0.4rem;
  background-size:200% 200%;
  left: -0.5rem;
}
div.switcher>div>div{
  width:calc(100% - 3rem);
  height:0.15rem;
  border-radius:0.7rem;
  padding:0 0.5rem;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  background: none repeat scroll 0 0 #574DA3;
  background-clip: content-box;
  margin:0 0;
  position: relative;
}
div.mark-footer{
  bottom:0;
  padding: 2rem 0 3rem 0;
  box-sizing: border-box;
  width: 100%;
}
div.buttons{
  text-align: center;
  height: 2rem;
  margin:0 auto;
  width:100%;
}

div.buttons>button:first-child{
  background: url("../assets/mark/wait_mark.png") no-repeat;
  background-size: 100% 100%;
  margin-right:1rem;
}
div.buttons>button:last-child{
  background: url("../assets/mark/finished_mark.png") no-repeat;
  background-size: 100% 100%;
}
div.buttons>button{

  border: 0;
  border-radius: 1rem;
  height:2rem;
  width:7.46rem;
  display: inline-block;
  color:#FFF;
  font-size: 0.8rem;
  box-shadow: 0 0 0.8rem 0.2rem rgba(84,101,157,0.2);
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
var axios = require('axios');
module.exports = {
  data: function () {
    return ({
      loaded: false,
      title: 'aaa',
      score: 5,
      touched: false,
      offset: 0,
      rem: 0,
      startX: 0,
      offset_bak: 0,
      alertShow: '',
      alertValue: '',
      alertTimeout: 0,
      hasMarked: false,
      n: 0
    });
  },
  methods: {
    touchstart: function (touches) {
      this.hasMarked = true;
      this.touched = true;
      if (touches.touches.length === 1) {
        var touch = touches.touches[0];
        this.startX = touch.clientX;
        this.offset = touch.clientX - this.rem * 2.5;
        this.offset_bak = touch.clientX - this.rem * 2.5;
        this.score = (this.offset / document.querySelector('div.bar').clientWidth * 10).toFixed(0);
      }
    },
    touchmove: function (touches) {
      if (touches.touches.length === 1) {
        var touch = touches.touches[0];
        if (this.touched) {
          this.offset = this.offset_bak + (touch.clientX) - this.startX;
          if (this.offset >= document.querySelector('div.bar').clientWidth) {
            this.offset = document.querySelector('div.bar').clientWidth;
          } else if (this.offset <= 0) {
            this.offset = 0;
          }
          this.score = (this.offset / document.querySelector('div.bar').clientWidth * 10).toFixed(0);
        }
      }
    },
    touchend: function (touches) {
      if (this.touched) {
        this.touched = false;
      }
    },
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
    submit: function () {
      var vueThis = this;
      var datas = {
        id: this.$route.params.id,
        title: this.$route.params.title,
        tags: this.$route.params.tags === 'empty' ? [] : this.$route.params.tags.split('&'),
        text: this.$route.params.comment === 'empty' ? '' : decodeURIComponent(this.$route.params.comment),
        img: decodeURIComponent(this.$route.params.images),
        score: this.score
      };
      datas = encodeURIComponent(JSON.stringify(datas));
      axios.post('comment', {
        data: datas
      })
        .then(function (response) {
          response = response.data;
          if (!response.error) {
            vueThis.$router.replace('/comment/success/' + vueThis.$route.params.id);
          } else {
            if (response.error.indexOf('commented')) {
              vueThis.$router.replace('/comment/failed/' + vueThis.$route.params.id);
            } else {
              vueThis.alert_('提交失败：服务器拒绝您的数据！');
            }
          }
        })
        .catch(function (error) {
          if (error) {
            vueThis.alert_('网络出错！');
          }
        });
    },
    submitWithoutMark: function () {
      var vueThis = this;
      var datas = {
        id: this.$route.params.id,
        title: this.$route.params.title,
        tags: this.$route.params.tags.split('&'),
        text: decodeURIComponent(this.$route.params.comment),
        score: -1
      };
      datas = encodeURIComponent(JSON.stringify(datas));
      axios.post('comment', {
        data: datas
      })
        .then(function (response) {
          response = response.data;
          if (!response.error) {
            vueThis.$router.replace('/comment/success/' + vueThis.$route.params.id);
          } else {
            if (response.error.indexOf('commented')) {
              vueThis.$router.replace('/comment/failed/' + vueThis.$route.params.id);
            } else {
              vueThis.alert_('提交失败：服务器拒绝您的数据！');
            }
          }
        })
        .catch(function (error) {
          if (error) {
            vueThis.alert_('网络出错！');
          }
        });
    },
    alert_: function (value) {
      clearTimeout(this.alertTimeout);
      this.alertValue = value;
      this.alertShow = true;
      var vueThis = this;
      this.alertTimeout = setTimeout(function () {
        vueThis.alertShow = false;
      }, 2500);
    }
  },
  mounted: function () {
    var vueThis = this;
    var imgList = [new Image(), new Image(), new Image()];
    imgList[0].src = 'static/img/bad.png';
    imgList[1].src = 'static/img/normal.png';
    imgList[2].src = 'static/img/good.png';
    for (var i = 0; i < imgList.length; i++) {
      imgList[i].onload = function () {
        vueThis.n++;
        if (vueThis.n >= imgList.length) {
          vueThis.loaded = true;
          vueThis.offset = document.querySelector('div.bar').clientWidth / 2;
          vueThis.rem = document.querySelector('div.switcher span').clientWidth / 1.5;
        }
      }
    }
  }
}
</script>
