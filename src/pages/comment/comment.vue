<template>
  <div class="comment">
    <div class="top-bar">
      <h1>{{$route.params.name}}</h1>
      <button class="submit" @click="submit">发表</button>
    </div>
    <div class="mark">
      <h2>
        <span class="mark-display">{{ currentMark.toFixed(1) }}</span>
      </h2>
      <div class="mark-selector">
        <span class="start">{{start}}</span>
        <div class="line"
             ref="line"
             v-on:touchstart="touchstart"
             v-on:touchmove="touchmove"
             v-on:touchend="touchend"
        >
          <i class="dot"></i>
          <div class="block" ref="block" v-bind:style="{'transform':'translateX('+offset+'px)'}"></div>
          <i class="dot"></i>
        </div>
        <span class="end">{{end}}</span>
      </div>
    </div>
    <div class="tags">
      <swipe :auto="0" :continous="false">
        <swipe-item v-for="i in tagsPagesCount" :key="i">
          <div class="scope" ref="scope">
            <ul ref="allTags"
                class="all-tags-ul"
                :style="{'transform': `translateY(-${(i - 1) * scopeHeight}px)`}"
            >
              <li class="tag"
                  :class="{ 'active': isActive(index) }"
                  @click="updateActive(index)"
                  v-for="(tag, index) in allTags"
              >{{tag.tagName}}</li>
              <li class="tag last" v-if="i === tagsPagesCount"></li>
            </ul>
          </div>
        </swipe-item>
      </swipe>
    </div>
    <div class="desc">
      <textarea v-model="text" placeholder="亲，店家服务、环境怎么样？发布图文点评吧！(不超过 200 字)"></textarea>
      <image-upload :count="4" ref="upload"></image-upload>
    </div>
  </div>
</template>
<script>
import { getAllTags, addComment, wait } from '../../service'
import { Swipe, SwipeItem } from 'vue-swipe'
import ImageUpload from '../../components/image-upload.vue'
export default {
  components: {
    Swipe,
    SwipeItem,
    ImageUpload
  },
  data () {
    return {
      currentMark: 0,
      start: 0,
      end: 10,
      offset: 0,
      startX: 0,
      offsetBackup: 0,
      touched: false,
      rem: 20,
      lineWidth: 0,
      tagsPagesCount: 1,
      allTags: [],
      text: '',
      activeTags: []
    }
  },
  computed: {
    scopeHeight () {
      return 3.4 * this.rem
    }
  },
  async mounted () {
    window.closeLoading()
    document.title = this.$route.params.name
    this.$nextTick(() => {
      this.rem = this.$refs.line.clientHeight
      this.lineWidth = this.$refs.line.clientWidth - this.$refs.block.clientWidth
    })
    this.allTags = (await getAllTags(this.$route.params.name)).shopTags
    this.$nextTick(() => {
      // todo
      let n = this.$refs.allTags[0].clientHeight / this.scopeHeight
      this.tagsPagesCount = Number(n.toString().split('.')[0]) + 1
      this.$nextTick(() => {
        this.scopeHeight = this.$refs.scope.clientHeight
      })
    })
  },
  methods: {
    touchstart (touches) {
      this.touched = true
      if (touches.touches.length === 1) {
        const touch = touches.touches[0]
        this.startX = touch.clientX
        this.offset = touch.clientX - this.rem * 2.5
        this.offsetBackup = touch.clientX - this.rem * 2.5
        this.currentMark = (this.offset / this.lineWidth * 10)
      }
    },
    touchmove (touches) {
      if (touches.touches.length === 1) {
        const touch = touches.touches[0]
        if (this.touched) {
          this.offset = this.offsetBackup + (touch.clientX) - this.startX
          if (this.offset >= this.lineWidth) {
            this.offset = this.lineWidth
          } else if (this.offset <= 0) {
            this.offset = 0
          }
          this.currentMark = (this.offset / this.lineWidth * 10)
        }
      }
    },
    touchend () {
      if (this.touched) {
        this.touched = false
      }
    },
    async submit () {
      let images = []
      if (this.$refs.upload.getImagesCount() !== 0) {
        this.$tip.open('正在上传图片，请等待...', '#50d467', 0)
        images = await this.$refs.upload.getUploadResult()
      }
      this.$tip.open('正在提交评论...', '#50d467', 0)
      await Promise.race([wait(500), addComment(
        this.$route.params.name,
        this.currentMark,
        this.text,
        this.activeTags.map(i => this.allTags[i].tagName),
        images.map(resp => resp.url)
      )])
      await this.$tip.open('提交成功！', '#50d467', 1000)
      this.$router.push(`/result/comment-success/${this.$route.params.name}`)
    },
    isActive (index) {
      return this.activeTags.find(active => active === index) !== undefined
    },
    updateActive (index) {
      if (!this.isActive(index)) {
        this.activeTags.push(index)
      } else {
        let i = this.activeTags.findIndex(active => active === index)
        this.activeTags.splice(i, 1)
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.comment {
  height 100%
  display flex
  flex-direction column
  background-color #f2f2f2
  padding-bottom 5rem
  box-sizing border-box
}
.top-bar {
  height (h = 2.8)rem
  display flex
  border-bottom 1px #f2f2f2 solid
  background-color #FFF
  h1 {
    margin auto 1.5rem
    flex-grow 1
    font-size 0.9rem
    line-height 1rem
    height 1rem
  }
  h1:before {
    content ''
    display inline-block
    margin-right 0.6rem
    width 1rem
    height @width
    background-image url('./round.png')
    background-size auto 70%
    background-position center
    background-repeat no-repeat
    vertical-align top
  }
  button {
    border none
    width 2.8rem
    background-color #FFAC00
    height (bh = 1.4)rem
    margin ((h - bh) / 2)rem
    border-radius (bh / 2)rem
    font-size 0.7rem
    color #FFFFFF
  }
}
.mark {
  padding-top 0.8rem
  background-color #FFF
  h2 {
    text-align center
    margin 0
    font-size 1rem
    vertical-align bottom
    span {
      display inline-block
      color #FFAC00
    }
    span:after {
      margin-left 0.3rem
      content '分'
      font-size 0.7rem
      color #717171
    }
  }
}
.mark-selector {
  padding 0.7rem 1.5rem
  display flex
  flex-direction row
  position relative
  span {
    color #717171
    text-align center
    width 1rem
    height @width
    line-height 1rem
    font-size 0.8rem
    flex-shrink 0
    vertical-align middle
  }
  .start {
    margin-right 0.3rem
  }
  .end {
    margin-left 0.3rem
  }
  w = 0.7
  .line {
    flex-grow 1
    height 0.1rem
    padding 0.45rem (w / 2)rem
    background-color #FFAC00
    background-clip content-box
    position relative
    .block {
      left 0
      width w rem
      top ((1 - w) / 2)rem
      height w rem
      border-radius (w / 2)rem
      position absolute
      transform-origin 50% 50%
      background-color #FFFFFF
      background-image linear-gradient(180deg, #FFcb56, #FFAC00)
    }
  }
  w = 0.28
  i.dot {
    position absolute
    display inline-block
    width w rem
    height w rem
    border-radius (w / 2)rem
    background-color #FFAc00
    top ((1 - w)/2)rem
  }
  i.dot:first-child {
    left (w / 2)rem
  }
  i.dot:last-child {
    right (w / 2)rem
  }
}
.tags {
  height 5rem
  padding 0 1.5rem
  border-bottom 0.2rem solid #F2f2f2
  background-color #FFF
  .scope {
    height 3.4rem
    overflow hidden
  }
  .all-tags-ul {
    margin 0
    list-style none
    padding 0 0.8rem
    h = 1.1
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content space-between
    font-size 0
    .tag {
      font-size 0.6rem
      color #717171
      display inline-block
      height h rem
      line-height h rem
      border-radius (h / 2)rem
      background-color #e8e8e8
      padding 0 0.5rem
      margin 0.3rem
    }
    .tag.active {
      background-color #FFD273
    }
    .tag.last {
      background-color transparent
      color transparent
      font-size 0
      flex-grow 1
    }
  }
}

.desc {
  flex-grow 1
  padding 1.5rem
  padding-bottom 0.8rem
  display flex
  flex-direction column
  background-color #FFF
  textarea {
    flex-grow 1
    padding 0
    border 0
    width 100%
    resize none
    font-size 0.6rem
    color #717171
    margin-bottom 0.5rem
  }
}
/** *** **/
</style>
