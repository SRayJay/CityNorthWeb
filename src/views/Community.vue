<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="momentBar">
        <el-tabs style="background:#f8f8f8;min-height:800px;" type="border-card">
          <el-tab-pane v-infinite-scroll="load" label="动态" style="overflow: auto;height:auto;" infinite-scroll-immediate="false">
            <!-- 无限加载没完成 -->
            <div v-for="moment in moments" :key="moment.momentId">
              <community-moment :moment-info="moment" class="singleMoment" />
              <el-divider class="b_divider" />
            </div>

            <p v-if="loading">加载中...</p>
          </el-tab-pane>
          <el-tab-pane label="关注" lazy="true">
            <div v-if="!this.$store.state.user.token">当前未登录,请登录后查看</div>
            <div v-else>
              <div v-for="moment in followMoments" :key="moment.momentId">
                <community-moment :moment-info="moment" class="singleMoment" />
                <el-divider class="b_divider" />
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="actionBar">
        <div class="actionBarContainer" :class="actionBarFixed == true ? 'isFixed' :''">
          <div class="iconBar">
            <div class="actSingle" @click="toWriteReview">
              <img :src="iconReview" class="act_icon" alt="">
              <div class="act_text">写书评</div></div>
            <div class="actSingle" @click="showDialog2">
              <img :src="iconMoment" class="act_icon" alt="">
              <div class="act_text">发动态</div></div>
          </div>
          <el-dialog title="发布动态" width="30%" :before-close="handleClose" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-input
              v-model="momentArea"
              resize="none"
              style="outline:none;padding:12px"
              type="textarea"
              placeholder="请输入内容"
              :autosize="{ minRows: 10, maxRows: 60}"
            />
            <el-upload
              ref="upload"
              class="momentUpload"
              action="#"
              list-type="picture-card"
              :before-upload="uploadPic"
              :file-list="pic_list"
            >
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                >
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in" />
                  </span>
                  <span

                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete" />
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog style="z-index:999;" :visible.sync="dialogVisible" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <div slot="footer" class="dialog-footer">
              <button class="momentBtn" @click="publishMoment">发 布</button>
            </div>
          </el-dialog>
          <div class="threeEntry">
            <div class="entrySingle" @click="toMoments">
              <img src="@assets/icon/shoucang.svg">我的动态
            </div>
            <div class="entrySingle" @click="toBookLists">
              <img src="@assets/icon/shudan.svg" alt="">我的书单
            </div>
            <div class="entrySingle" @click="toReviews">
              <img src="@assets/icon/xiaoxi.svg" alt="">我的书评
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-line />
  </div>
</template>

<script>

export default {
  name: 'Community',
  data: function() {
    return {
      actionBarFixed: false,
      iconReview: require('@assets/icon/review.png'),
      iconMoment: require('@assets/icon/moment.png'),
      dialogFormVisible: false,
      dialogVisible: false,
      pic_list: [],
      imageUrl: '',
      momentArea: '',
      now_date: '',
      now_time: '',
      moments: [],
      followMoments: [],
      momentsList: [],
      index: 1,
      loading: false
    }
  },
  created: function() {
    const that = this
    const fd = new FormData()

    if (this.$store.state.user.token) {
      fd.append('userId', this.$store.state.user.userInfo.userId)
      axios.post('/api/moment', fd, { headers: { 'token': this.$store.state.user.token }}).then(function(res) {
        console.log(res)
        that.moments = res.data.moments
      })
      axios.post('/api/followmoment', fd, { headers: { 'token': this.$store.state.user.token }}).then(res => {
        console.log(res)
        that.followMoments = res.data.moments
      })
    } else {
      axios.post('/api/moment').then(function(res) {
        console.log(res)
        that.moments = res.data.moments
      })
      // this.momentsList = this.moments.slice(0, this.index * 10)
      // console.log(this.momentsList)
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    // console.log(typeof (this.pic_list))
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    toWriteReview: function() {
      if (this.$store.state.user.token) {
        this.$router.push({ name: 'ReviewEditPage' })
      } else {
        this.$message.error({
          message: '请登录后操作'
        })
      }
    },
    toBookLists() {
      if (this.$store.state.user.token) {
        this.$router.push({ name: 'SpaceBookLists', params: { userid: this.$store.state.user.userInfo.userId }, query: { userName: this.$store.state.user.userInfo.userName }})
      } else {
        this.$message.error({
          message: '请登录后操作'
        })
      }
    },
    toMoments() {
      if (this.$store.state.user.token) {
        this.$router.push({ name: 'SpaceMoments', params: { userid: this.$store.state.user.userInfo.userId }, query: { userName: this.$store.state.user.userInfo.userName }})
      } else {
        this.$message.error({
          message: '请登录后操作'
        })
      }
    },
    toReviews() {
      if (this.$store.state.user.token) {
        this.$router.push({ name: 'SpaceReviews', params: { userid: this.$store.state.user.userInfo.userId }, query: { userName: this.$store.state.user.userInfo.userName }})
      } else {
        this.$message.error({
          message: '请登录后操作'
        })
      }
    },
    publishMoment: function() {
      const that = this
      if (this.momentArea.trim() === '' && this.pic_list.length === 0) {
        this.$message.error({
          message: '请输入动态内容'
        })
      } else {
        this.dialogFormVisible = false
        this.getNowTime()
        this.momentContent = this.momentArea.replace(/\n|\r\n/g, '<br/>')
        const fd = new FormData()
        fd.append('userId', this.$store.state.user.userInfo.userId)
        console.log(this.pic_list)
        console.log(typeof (this.pic_list))
        for (var i = 0; i < this.pic_list.length; i++) {
          fd.append('momentPhoto', this.pic_list[i])
        }
        fd.append('momentPhoto', this.pic_list.length)
        fd.append('momentContent', this.momentContent)
        fd.append('momentTime', this.now_date + this.now_time)
        /*global axios*/
        axios.post('/api/write/moment', fd, { headers: {
          'token': that.$store.state.user.token
        }}).then(function(res) {
          that.$message({
            type: 'success',
            message: '发布成功'
          })
        })
      }
      const nfd = new FormData()
      nfd.append('userId', this.$store.state.user.userInfo.userId)
      axios.post('/api/moment', nfd, { headers: { 'token': this.$store.state.user.token }}).then(function(res) {
        console.log(res)
        that.moments = res.data.moments
      })
    },
    showDialog2: function() {
      if (!this.$store.state.user.token) {
        this.$message.error({
          message: '请登录后再发表动态'
        })
      } else {
        this.dialogFormVisible = true
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    load: function() {
      this.loading = true
      console.log(this.index)
      this.momentsList = this.moments.slice(0, this.index * 10)
      setTimeout(() => {
        // this.count += 2
        this.index += 1
        // console.log(this.index)
        this.loading = false
      }, 2000)
    },
    uploadPic: function(file) {
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpg'
      const isPng = file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPEG && !isPng && !isJPG) {
        this.$message.error('上传图片只能是 JPEG、png、jpg 格式!')
      } else if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      } else {
        console.log(file)
        file.url = window.URL.createObjectURL(file)
        this.pic_list.push(file)
        console.log(this.pic_list)
      }

      return false
    },
    emptyUpload() {
      const mainImg = this.$refs.upload
      if (mainImg) {
        if (mainImg.length) {
          mainImg.forEach(item => {
            item.clearFiles()
          })
        } else {
          this.$refs.upload.clearFiles()
        }
      }
    },
    getNowTime() {
      const date_ = new Date()
      const Y = date_.getFullYear()
      const M = date_.getMonth() + 1
      const D = date_.getDate()
      let H = date_.getHours()
      let Min = date_.getMinutes()
      let S = date_.getSeconds()
      H = H < 10 ? '0' + H : H
      Min = Min < 10 ? '0' + Min : Min
      S = S < 10 ? '0' + S : S
      this.now_date = Y + '年' + M + '月' + D + '日 '
      this.now_time = H + ':' + Min + ':' + S
    },
    handleScroll: function() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var offsetTop = 20
      // console.log(scrollTop)
      if (scrollTop > offsetTop) {
        this.actionBarFixed = true
      } else {
        this.actionBarFixed = false
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    writeMoment: function() {

    },
    handleRemove(file) {
      for (var i = 0; i < this.pic_list.length; i++) {
        if (this.pic_list[i] === file) {
          this.pic_list.splice(i, 1)
        }
      }
    }
  }
}
</script>

<style scoped>
.wrap{
    position: relative;
    width: 1024px;
    margin: 0 auto;
    margin-bottom: 30px;
    overflow: hidden;
}
.momentBar{
    width:676px;
    /* height: 1000px; */
    margin-top: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.actionBar{
  position: absolute;
  left: 740px;
  top: 20px;
box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
::v-deep .b_divider.el-divider--horizontal{
    margin: 0 0 24px;
}
.actionBarContainer{
    padding-top: 30px;
    width: 280px;
    height: 254px;
}
.isFixed{
    position:fixed;
    /* background-color:#Fff; */
    top:0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index:999;
}
.iconBar{
    /* margin-top: 30px; */
    overflow: hidden;
    margin-bottom: 30px;
    /* margin-right: 66px; */
}
.actSingle{
     float: left;
     margin-left: 66px;
     cursor: pointer;
}
.act_icon{
    width: 32px;
    height: 32px;

}
.act_text{
    font-size: 14px;
    margin-top: 20px;
}
.threeEntry{
    margin-left: 66px;
}
.entrySingle{
    /* margin: 10px 0; */
    text-align: left;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
}
.entrySingle img{
    margin-right: 10px;
}
.momentUpload{
  /* float: left; */
  text-align: left;
  margin-left: 15px;
  margin-top:10px;
  /* width: 50px; */
  /* height: 50px; */
}
::v-deep .el-upload--picture-card{
  width: 80px;
  height: 80px;
    object-fit: cover;
  line-height: 86px;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item{
  width: 80px;
  height: 80px;
  object-fit: cover;
  line-height: 86px;
}
::v-deep .el-textarea__inner{
  padding: 12px;
}
::v-deep .el-dialog__body{
  padding: 10px 20px 5px;
}
::v-deep .el-dialog__footer{
  text-align: center;
}

.momentBtn{
  width: 80px;
  height: 30px;
  background: #3379cc;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;

}
/* .singleMoment{

} */
</style>
