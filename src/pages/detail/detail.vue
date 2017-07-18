<template>
  <div class="detail">
    <div class="images-to-load">
      <img src="./button.png" />
      <img src="./icons.png" />
    </div>
    <div class="title">
      <h1>
        <span>{{$route.params.name}}</span>
        <span class="mark">{{shopScore.toFixed(1) + '分'}}</span>
      </h1>
    </div>
    <div class="time-location">
      <div class="time">
        <span class="icon clock"></span>
        <span class="name">营业时间</span>
        <span class="colon">:</span>
        <ul class="value">
          <li v-for="time in openTime.split(' ')">{{time}}</li>
        </ul>
      </div>
      <div class="location">
        <span class="icon loc"></span>
        <span class="name">地址</span>
        <span class="colon">:</span>
        <p class="value">{{shopAddress}}</p>
      </div>
    </div>
    <div class="images" :style="{'height': shrink ? 0 : ''}">
      <img :src="img.src" v-for="img in imgURLs">
    </div>
    <div class="tags" :style="{'height': shrink ? 0 : ''}">
      <ul v-if="tags && tags.length > 0">
        <li class="tag"
            v-for="tag in tags"
            :class="{ 'negative': !tag.positive }"
        >{{tag.tagName ? tag.tagName : tag}}</li>
      </ul>
    </div>
    <div class="comments">
      <div class="top-bar">
        <span class="icon comment"></span>
        <span class="text"
              @click="currentType = 0"
              :class="{ 'active': currentType === 0 }"
        >最新评论</span>
        <span class="text"
              @click="currentType = 1"
              :class="{ 'active': currentType === 1 }"
        >最热评论</span>
      </div>
      <ul class="comments-list" @scroll="checkScroll">
        <li v-for="comment in comments">
          <img :src="comment.authorHeadimg">
          <div class="comment-value">
            <div class="name">
              <div class="name-date">
                <span class="span-name">{{comment.authorNickname}}</span>
                <span class="span-date">
                  {{(new Date(comment.issueTime * 1000)).toLocaleDateString()}}
                </span>
              </div>
              <div class="like" @click="updateOperation(comment, 0)"
              >
                <span class="icon like" :class="{ 'liked': getOperationValue(comment, 0) === 1 }"></span>
                <span class="value">{{comment.likeNumber + getOperationValue(comment, 0)}}</span>
              </div>
              <div class="dislike" @click="updateOperation(comment, 1)">
                <span class="icon dislike" :class="{ 'disliked': getOperationValue(comment, 1) === 1 }"></span>
                <span class="value">{{comment.dislikeNumber + getOperationValue(comment, 1)}}</span>
              </div>
            </div>
            <div class="text">
              <p>{{comment.text}}</p>
              <ul>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <button class="float-button"
            @click="$router.push(`/comment/${$route.params.name}`)"
    ></button>
  </div>
</template>
<script>
import {
  getShopByName,
  getComments,
  likeComment,
  dislikeComment,
  cancelDislikeComment,
  cancelLikeComment,
  waitImageToLoad
} from '../../service'
export default {
  data () {
    return {
      shopScore: 0,
      openTime: '9:00-23:00 7:00-21:00',
      shopAddress: '址噶哈哈就是房间开放世界级手机看就看你',
      imgURLs: [],
      tags: [],
      comments: [],
      currentType: 0,
      shrink: false
    }
  },
  async mounted () {
    const images = Array.from(document.querySelectorAll('.img-to-load > img'))
    const imagesLoadPromise = images.map((image) => {
      return waitImageToLoad(image)
    })
    // 等待图片加载的 Promise resolve
    await Promise.all(imagesLoadPromise)
    window.closeLoading()
    document.title = '商家详情'
    let detail = await getShopByName(this.$route.params.name)
    this.shopScore = detail.shopScore
    this.openTime = detail.openTime
    this.shopAddress = detail.shopAddress
    this.imgURLs = detail.imgs
    this.tags = detail.shopTags
    this.comments = (await getComments(this.$route.params.name)).commentList
    console.log(this.comments)
    this.sortByDate(this.comments)
  },
  methods: {
    sortByDate (array) {
      array = array.sort((a, b) => {
        return a.issueTime < b.issueTime
      })
    },
    sortByHot (array) {
      array = array.sort((a, b) => {
        return a.likeNumber < b.likeNumber
      })
    },
    checkScroll (e) {
      const wrapper = e.target
      this.shrink =
        wrapper.scrollTop > wrapper.firstElementChild.clientHeight * 3
    },
    updateOperation (comment, operation) {
      if (comment.operation === operation) {
        comment.operation = -1
        if (operation === 0) {
          cancelLikeComment(comment.authorOpenid, comment.issueTime)
        } else {
          cancelDislikeComment(comment.authorOpenid, comment.issueTime)
        }
        // cancel
      } else {
        comment.operation = operation
        if (operation === 0) {
          likeComment(comment.authorOpenid, comment.issueTime)
        } else {
          dislikeComment(comment.authorOpenid, comment.issueTime)
        }
        // submit
      }
      this.$forceUpdate()
    },
    getOperationValue (comment, type) {
      if (comment.operation === type) {
        return 1
      } else {
        return 0
      }
    }
  },
  watch: {
    currentType (to) {
      if (to === 0) {
        this.sortByDate(this.comments)
      } else {
        this.sortByHot(this.comments)
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.images-to-load {
  display none
}
.detail {
  height 100%
  display flex
  flex-direction column
  background-color #ffffff
}
.title {
  flex-shrink 0
  padding 1rem 1.5rem
  h1 {
    margin 0
    font-size 1rem
    .mark {
      font-size 0.9rem
      margin-left 0.8rem
      color #ffac00
    }
  }
}
.time-location {
  padding 0 1.5rem
  font-size 0.75rem
  flex-shrink 0
  > div {
    display flex
    flex-direction row
  }
  span {
    height 1.2rem
    line-height 1.2rem
    display inline-block
    vertical-align top
    flex-shrink 0
  }
  .icon {
    height 1.2rem
    width 1.1rem
    margin-right 0.6rem
    &.clock {
      background-image url('./icons.png')
      background-size auto 100%
    }
    &.loc {
      background-image url('./icons.png')
      background-position -1.09rem
      background-size auto 100%
    }
  }
  .name {
    text-align justify
    text-align-last justify
    width 3.6rem
  }
  .time, .location {
    margin 0 0 0.3rem 0
  }
  .value {
    font-size 0.7rem
    color #717171
  }
  .colon {
    margin-right 0.5rem
  }
  .time {
    ul {
      display inline-block
      list-style none
      margin 0
      padding 0
      li {
        vertical-align middle
        line-height 1.2rem
        height 1.2rem
      }
    }
  }
  .location {
    vertical-align middle
    p {
      margin 0
      line-height 1.2rem
    }
  }
}
.images {
  flex-shrink 0
  padding 0 1.5rem
  height 5rem
  box-sizing border-box
  overflow hidden
  img {
    margin-right 0.4rem
    height 4rem
    width 4rem
    background-color #e8e8e8
    border-radius 0.3rem
  }
}
.tags {
  flex-shrink 0
  padding 0 1.5rem
  margin-bottom 0.7rem
  overflow hidden
  ul {
    list-style none
    padding 0
    margin 0
    height (h = 1.1)rem
    font-size 0.6rem
    overflow hidden
    li {
      color #717171
      display inline-block
      height h rem
      line-height h rem
      border-radius (h / 2)rem
      background-color #FFD273
      padding 0 0.5rem
      margin-right 0.5rem
    }
    li.negative {
      background-color #e8e8e8
    }
  }
}
.comments {
  flex-grow 1
  display flex
  flex-direction column
  .top-bar {
    flex-shrink 0
    padding 0 1.5rem 8px
    height 1.2rem
    border-bottom 1px #f2f2f2 solid
    span {
      vertical-align top
    }
    .icon.comment {
      margin-right 0.6rem
      display inline-block
      height 1.2rem
      width 1.1rem
      background-size auto 100%
      background-position -2.15rem
      background-image url('./icons.png')
    }
    .text {
      display inline-block
      height 1.2rem
      width 3.6rem
      font-size 0.74rem
      line-height 1.2rem
      text-align center
      padding-bottom 6px
      &.active {
        border-bottom #FFAC00 solid 2px
      }
    }
  }
  .comments-list {
    flex-grow 1
    list-style none
    padding 0
    margin 0
    overflow auto
    li {
      position relative
      padding 1rem 1.5rem
      display flex
      border-bottom 1px solid #f2f2f2
      > img {
        width 3rem
        height @width
        margin-right 1rem
        flex-shrink 0
      }
      &:last-child {
        margin-bottom 4rem
      }
    }
  }
}
.comment-value {
  flex-grow 1
  .name {
    display flex
    height 2rem
    flex-direction row
    .name-date {
      flex-grow 1
      height 2rem
      span {
        display block
      }
      .span-date {
        font-size 0.7rem
        color #717171
      }
      .span-name {
        font-size 0.75rem
      }
    }
    .like, .dislike {
      width 3rem
      font-size 0.7rem
      color #717171
    }
    .icon {
      display inline-block
      height 1.2rem
      width 1.08rem
      background-size auto 100%
      background-image url('./icons.png')
      background-repeat no-repeat
      &.like {
        background-position ((-4) * 1.0948 + 0.05)rem
      }
      &.dislike {
        background-position ((-6) * 1.0948 + 0.05)rem
      }
      &.liked {
        background-position ((-3) * 1.0948)rem
      }
      &.disliked {
        background-position ((-5) * 1.0948 + 0.05)rem
      }
    }
    .value {
      vertical-align top
      height 1.2rem
      line-height 1.2rem
    }
  }
  .text {
    p {
      margin 0
      margin-top 0.5rem
      color #717171
      font-size 0.7rem
    }
  }
}
.float-button {
  position fixed
  bottom 2rem
  right 1rem
  display block
  border none
  width (w = 5)rem
  height w rem
  // border-radius (w / 2) rem
  // background-color #ffac00
  transition all 0.5s
  background-color transparent
  background-image url('./button.png')
  background-size 100% auto
}
.float-button:active {
  opacity 0.8
}
</style>
