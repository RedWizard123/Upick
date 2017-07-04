<template>
  <div>
    <input type="file" placeholder="Choose A File" ref="image" multiple/>
    <div class="images-display">
      <div v-for="i in imageFiles.length" class="image-wrapper">
        <img ref="images" src=""/>
        <span class="remove" @click="removeImage(i)">+</span>
      </div>
      <img src="./album.png"
           v-if="imageFiles.length !== count"
           @click="loadImage"
      >
      <template v-if="count - 1 - imageFiles.length > 0">
        <div v-for="i in count - 1 - imageFiles.length"
             class="image-wrapper"
        >
        </div>
      </template>
      <template v-if="4 - count > 0">
        <div v-for="i in 4 - count"
             class="image-wrapper"
        >
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { uploadImage } from '../service'
export default {
  data () {
    return {
      imageFiles: [],
      uploadPromises: []
    }
  },
  props: {
    count: Number
  },
  methods: {
    async loadImage () {
      this.$refs.image.click()
      let files = Array.from(await new Promise((resolve) => {
        this.$refs.image.onchange = (e) => {
          resolve(e.target.files)
        }
      })).splice(0, this.count)
      let preCount = this.imageFiles.length
      this.imageFiles.push(...files)
      this.$nextTick(async () => {
        for (let i = 0;
             i < Math.min(this.count - preCount, files.length);
             i++) {
          let b64 = await this.fileToBase64(files[i])
          this.$refs.images[i + preCount].src = b64
          this.uploadPromises.push(uploadImage(b64))
        }
      })
    },
    /**
     * params {File} file
     * @returns {Promise.<String>}
     */
    async fileToBase64 (file) {
      let fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      let base64String = await new Promise((resolve, reject) => {
        fileReader.onload = (e) => {
          resolve(e.target.result)
        }
        fileReader.onerror = (err) => {
          this.$tip.open('加载失败，请刷新！')
          reject(err)
        }
      })
      if (file.size / 1024 > 200) {
        let image = new Image()
        image.src = base64String
        await new Promise((resolve) => {
          if (image.complete) {
            resolve()
          } else {
            image.onload = () => {
              if (image.width > 0 && image.height > 0) {
                resolve()
              }
            }
          }
        })
        let canvas = document.createElement('CANVAS')
        canvas.width = 800
        canvas.height = 800 * image.height / image.width
        let ctx = canvas.getContext('2d')
        ctx.drawImage(
          image,
          0, 0,
          image.width,
          image.height,
          0, 0,
          canvas.width,
          canvas.height
        )
        base64String = canvas.toDataURL()
      }
      return base64String
    },
    /**
     * params {File} file
     * @returns {Array.<Promise.<Object>>}
     */
    async getUploadResult () {
      return await Promise.all(this.uploadPromises)
    },
    getImagesCount () {
      return this.imageFiles.length
    },
    removeImage (index) {
      this.imageFiles.splice(index - 1, 1)
      this.uploadPromises.splice(index - 1, 1)
    }
  }
}
</script>
<style scoped lang="stylus">
input {
  display none
}
.images-display {
  flex-shrink 0
  height (h = 3.8)rem
  display flex
  flex-direction row
  justify-content space-between
  img {
    width h rem
    height h rem
  }
  > .image-wrapper {
    position relative
    width h rem
    height h rem
    .remove {
      display inline-block
      position absolute
      left -0.3rem
      top -0.3rem
      width 0.8rem
      height 0.8rem
      border-radius 0.4rem
      background-color #FF1C30
      color #FFF
      font-size 1rem
      text-align center
      line-height 0.8rem
      transform rotateZ(45deg)
    }
  }
}
</style>
