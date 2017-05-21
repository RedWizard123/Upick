<template>
  <div class="comment-root" v-bind:class="{'show':loaded}">
    <div class="alert" v-bind:class="{'show':alertShow}"><p>{{alertValue}}</p></div>
    <div class="comment-header">
      <!--<router-link class="comment-back" to="/"></router-link>-->
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
          <swipe-item class="tags swiper-slide" v-for="(item ,index) in pages" v-bind:style="{width: width_ +'px'}">
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
      <div class="input-area">
        <textarea placeholder="请说出你的故事(限200字以内)" v-model="text"></textarea>
        <ul class="input-area-upload">
          <li v-for="(image, i) in imagesToUpload" class="images-to-upload">
            <img :src="image.src" class=""/>
            <a @click="imagesToUpload.splice(i, 1); imagesURLToUpload.splice(i, 1); $refs.imageSelector.value = ''" class="image-upload-delete">+</a>
          </li>
          <li v-show="imagesToUpload.length < 3">
            <img
              class="choose-image" 
              src="../assets/comment/upload.png"
              v-on:click="selectImg"
            />
            <input type="file" ref="imageSelector" multiple/>
            <canvas ref="imageCanvas"></canvas>
          </li>
        </ul>        
      </div>
    </div>
    <div class="comment-footer">
      <a v-if="imagesUploading"> 稍等，正在上传图片~ </a>
      <a v-if="!imagesUploading" v-on:click="next"><span></span>下一步 </a>
    </div>
  </div>
</template>
<style>
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
  width: 7rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
div.comment-header>div.comment-float{
  position: absolute;
  margin:0.5rem auto;
  left:0;
  right:0;
  width:3.8rem;
  height:3.8rem;
  border-radius: 50%;
  background:no-repeat 100% 100%;
  background-size: 100% 100%;

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
  min-height: 9rem;
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
  padding:0 0.3rem;

  margin:0 0.25rem 0.2rem 0.25rem;
  border-radius: 0.3rem;
  background: #FFFFFF;
  border:1px solid #6C77C9;
  font-size: 0.7rem;
}

div.comment-body .input-area{
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
  top: 4.2rem;
  min-height: 5rem;
}
.input-area textarea{
  width: 100%;
  background: rgba(0,0,0,0);
  border: none;
  resize: none;
  height: calc(100% - 5rem);
  padding: 0 0.3rem;
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

.comment-footer-uploading {
  color: #bbb;
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
.mint-swipe,.mint-swipe-items-wrap{
  overflow:hidden;position:relative;height:100%
}
.mint-swipe-items-wrap>div{
  position:absolute;-webkit-transform:translateX(-100%);transform:translateX(-100%);width:100%;height:100%;display:none
}
.mint-swipe-items-wrap>div.is-active{
  display:block;-webkit-transform:none;transform:none
}
.mint-swipe-indicators{
  position:absolute;bottom:0.3rem;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)
}
.mint-swipe-indicator{
  width:0.3rem;height:0.3rem;display:inline-block;border-radius:100%;background:#AAA;opacity:.8;margin:0 3px
}
.mint-swipe-indicator.is-active{
  background:#2c3e50;
}
.input-area-upload {
  padding: 0;
  margin: 0.5rem 0.5rem 0.7rem;
  list-style: none;
  /* text-align: center; */
}
.input-area-upload > li {
  width: 4.3rem;
  height: 4.3rem;
  display: inline-block;
  margin-right: 0.6rem;
  position: relative;
}
.input-area-upload .choose-image {
  width: 100%;
  height: 100%;
}
.input-area-upload input {
  display: none;
}
.input-area-upload canvas {
  display: none;  
}
.images-to-upload img {
  width: 100%;
  height: 100%;
}
.image-upload-delete {
  display: block;
  position: absolute;
  left: -0.4rem;
  top: -0.4rem;
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  line-height: 1rem;
  text-align: center;
  background: #FF0000;
  border-radius: 50%;
  color: #FFFFFF;
  transform: rotate(45deg);
}
</style>
<script>
var axios = require('axios');
// import { Swipe, SwipeItem } from 'vue-swipe';
var Swipe = require('vue-swipe').Swipe;
var SwipeItem = require('vue-swipe').SwipeItem;
module.exports = {
  data () {
    return ({
      data: {
        name: '',
        iconURL: '',
        tags: []
      },
      width_: 0,
      pages: [''],
      loaded: false,
      text: '',
      n: 0,
      alertShow: '',
      alertValue: '',
      alertTimeout: 0,
      imagesToUpload: [],
      imagesURLToUpload: [],
      uploadPromises: [],
      imagesUploading: false
    });
  },
  methods: {
    select (a) {
      var ele = a.target;
      ele.classList.contains('active') ? ele.classList.remove('active') : ele.classList.add('active');
    },
    next: function () {
      var vueThis = this;
      vueThis.imagesUploading = true;
      Promise.all(vueThis.uploadPromises)
      .then(function () {
        vueThis.imagesUploading = false;
      })
      .then(function () {
        // 按照讨论，标签内容可以二选一
        if (document.querySelectorAll('.choose-tags button.active').length === 0 && vueThis.text === '' && vueThis.imagesURLToUpload.length === 0) {
          vueThis.alert_('你什么都没有填！');
          return;
        }
        if (vueThis.text === '') {
          vueThis.text = 'empty';
        }
        vueThis.$router.replace('/comment/mark/' + vueThis.$route.params.id + '/' + vueThis.data.name + '/' + vueThis.getChosenTags() + '/' + encodeURIComponent(vueThis.text) + '/' + encodeURIComponent(JSON.stringify(vueThis.imagesURLToUpload)));
      }).catch(function (err) {
        console.log(err);
      });
    },
    getChosenTags: function () {
      var list = document.querySelectorAll('.choose-tags button.active');
      var t = [];
      for (var i = 0; i < list.length; i++) {
        t.push(list[i].dataset.id);
      }
      if (t.length > 0) {
        return t.join('&');
      } else {
        return 'empty'
      }
    },
    alert_: function (value) {
      clearTimeout(this.alertTimeout);
      this.alertValue = value;
      this.alertShow = true;
      var vueThis = this;
      this.alertTimeout = setTimeout(function () {
        vueThis.alertShow = false;
      }, 2500);
    },
    selectImg: function () {
      this.$refs.imageSelector.click();
    }
  },
  watch: {
    pages: function () {

    }
  },
  mounted: function () {
    var vueThis = this;
    axios.get('comment_data?id=' + vueThis.$route.params['id'])
      .then(function (response) {
        response = response.data;
        vueThis.data = response.data;
        vueThis.n++;
        vueThis.width_ = document.querySelector('div.width-ruler').clientWidth;
        vueThis.$forceUpdate();
        setTimeout(function () {
          var p = parseInt(document.querySelector('div.tags-pre').clientHeight / (document.querySelector('div.choose-tags').clientHeight * 32 / 47));
          document.querySelector('div.tags-pre').style.display = 'none';
          var array = [];
          for (var i = 0; i < p + 1; i++) {
            array.push('');
          }
          var imgIcon = new Image();
          imgIcon.src = vueThis.data.iconURL;
          if (imgIcon.complete) {
            document.querySelector('div.comment-float').style.backgroundImage = "url('" + vueThis.data.iconURL + "')";
          } else {
            imgIcon.onload = function () {
              document.querySelector('div.comment-float').style.backgroundImage = "url('" + vueThis.data.iconURL + "')";
            }
          }
          vueThis.pages = array;
          vueThis.n++;
          if (vueThis.n >= 3) {
            vueThis.loaded = true;
          }
        }, 200);
      })
      .catch(function (error) {
        console.log(error);
        if (error)alert('加载失败！');
        vueThis.loaded = true;
      });
    this.$refs.imageSelector.addEventListener('change', function (ele) {
      console.log('change!');
      for (var i = 0; i < Math.min(ele.target.files.length, 3); i++) {
        vueThis.uploadPromises.push((function (i) {
          return new Promise(function (resolve, reject) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(ele.target.files[i]);
            fileReader.onload = function (e) {
              var img = new Image();
              var result = e.target.result;
              img.src = result;
              img.onload = function () {
                // compress img when it is too big (> 1000x1000)
                if (img.width > 1000 || img.height > 1000) {
                  vueThis.$refs.imageCanvas.width = 1000;
                  vueThis.$refs.imageCanvas.height = Math.round(1000 / img.width * img.height);
                  var ctx = vueThis.$refs.imageCanvas.getContext('2d');
                  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 1000, Math.round(1000 / img.width * img.height));
                  result = vueThis.$refs.imageCanvas.toDataURL();
                }
                var data = {
                  'id': Math.round(1 + Math.random() * 1000000),
                  'src': result
                }
                vueThis.imagesToUpload.push(data);
                resolve(data);
              }
            };
          });
        })(i).then(function (data) {
          return axios.post('comments/images', {
            image: data.src
          }).then(function (response) {
            if (vueThis.imagesToUpload.find(function (image) { return (image.id === data.id) })) {
              vueThis.imagesURLToUpload.push(response.data.url);
            }
          });
        }));
      }
    });
  },
  components: {
    'swipe': Swipe,
    'swipe-item': SwipeItem
  }
}
</script>
