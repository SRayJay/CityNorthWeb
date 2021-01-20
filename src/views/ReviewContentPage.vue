<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="title">{{ review.reviewTitle }}</div>
      <div class="userInfoBar">
        <img :src="this.$host+user.userPhoto" alt="" class="userAvatar" @click="toUser(user.userId)">
        <div class="userName" @click="toUser(user.userId)">{{ user.userName }}</div>
        <div class="userLabel">{{ user.userSelfLable }}</div>
        <div class="bookName" @click="toBook(book.bookId)">{{ book.bookName }}</div>
        <div class="reviewTime">{{ review.reviewTime }}</div>
      </div>
      <div class="bookInfoContainer">
        <div ref="bookInfoBar" class="bookInfoBar" :class="bookInfoBarFixed == true ? 'isFixed' :''">
          <book-thumb
            :book-title="book.bookName"
            :book-pic="book.bookPhotoUrl"
            :book-author="book.authorName"
            :book-intro="book.bookIntroduce"
            :book-id="book.bookId"
          />
        </div>
      </div>
      <div class="reviewContent">
        <div class="content_shown" v-html="review.reviewContent" />
      </div>
      <div class="actionBar">
        <button class="likeBtn" @click="addPoint"><img :src="isPoint?likedPic:likePic" class="likePic" alt="">{{ review.pointNum }}</button>
        <div class="comment">
          <img src="@assets/icon/comment.png" class="likePic" alt="">{{ review.commitNum }}条评论
        </div>
        <div class="share" @click="shareVisible=true"><i class="el-icon-share" style="margin-right:3px;" />转发</div>
        <el-dialog title="转发书评" width="540px" :before-close="handleClose" :visible.sync="shareVisible" :close-on-click-modal="false" :close-on-press-escape="false">
          <el-input
            v-model="shareArea"
            resize="none"
            style="outline:none;padding:12px"
            type="textarea"
            placeholder="说点什么吧"
            :autosize="{ minRows: 3, maxRows: 5}"
          />
          <simple-review style="margin-top:10px;" :review-info="review" :user-name="user.userName" />
          <div slot="footer" class="dialog-footer">
            <button class="submitBtn" @click="share"> 转 发</button>
          </div>
        </el-dialog>
        <div class="report" @click="report"> <img src="@assets/icon/report.svg" style="margin-top:8px;float:left;margin-right:5px;" alt=""> <div class="report_txt">举报</div> </div>
      </div>
      <div class="submitBar">
        <div v-if="$store.state.user.token">
          <img :src="$host+$store.state.user.userInfo.userPhoto" class="userPhoto" alt="">
          <input v-model="commentInput" type="text" class="commentInput">
          <button class="commnetBtn" @click="submitComment">发表</button>
        </div>
        <div v-else>
          请登录后发表评论
        </div>
      </div>
      <div class="commentBar">
        <div v-if="review.commitNum===0" style="margin-top:50px;">
          暂无评论
        </div>
        <div v-else>
          <review-single-comment v-for="comment in comments" :key="comment.recommendId" style="margin-top:20px;" :comment-info="comment" />
        </div>
        <!-- <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="评论" name="comment" style="min-height:100px;">
            <div v-if="review.commitNum===0" style="margin-top:50px;">
              暂无评论
            </div>
            <div v-else>
              <review-single-comment v-for="comment in comments" :key="comment.recommendId" style="margin-top:20px;" :comment-info="comment" />
            </div>
          </el-tab-pane>
        </el-tabs> -->
      </div>
    </div>
    <footer-line class="footer" />
  </div>
</template>

<script>
/*global axios */
import { getReviewContent } from '@/api/book.js'
export default {
  name: 'ReviewContentPage',
  data: function() {
    return {
      activeName: 'comment',
      book: {},
      user: {},
      isPoint: 0,
      shareArea: '',
      shareContent: '',
      review: {},
      shareVisible: false,
      commentInput: '',
      likedPic: require('@assets/icon/liked.png'),
      likePic: require('@assets/icon/like.png'),
      commentContent: '',
      bookInfoBarFixed: false,
      authorName: '',
      comments: [],
      reviewid: this.$route.params.reviewid,
      default_avatar: require('@assets/default_avatar.jpg')
    }
  },
  created() {
    new Promise((resolve, reject) => {
      getReviewContent(this.reviewid).then((response) => {
        const { data } = response
        console.log(data)
        this.review = data.review
        this.book = data.book
        this.comments = data.review.recommend.reverse()
        this.isPoint = data.review.ispoint
        this.user = data.user
      }).catch(error => {
        reject(error)
      })
    })
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll: function() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var offsetTop = 240
      // console.log(scrollTop)
      if (scrollTop > offsetTop) {
        this.bookInfoBarFixed = true
      } else {
        this.bookInfoBarFixed = false
      }
    },
    share: function() {
      if (this.$store.state.user.token) {
        const fd = new FormData()
        const that = this
        fd.append('userId', this.$store.state.user.userInfo.userId)
        fd.append('reviewId', this.review.reviewId)
        this.shareContent = this.shareArea.replace(/\n|\r\n/g, '<br/>')
        fd.append('momentContent', this.shareContent)
        fd.append('momentTime', this.getNowTime())
        axios.post('/api/social/transmit/review', fd, { headers: { 'token': this.$store.state.user.token }}).then(res => {
          console.log(res)
          that.shareVisible = false
          that.$message({
            type: 'success',
            message: '转发成功'
          })
        })
      } else {
        this.$message.error({
          message: '请登录后操作'
        })
      }
    },
    addPoint: function() {
      if (!this.$store.state.user.token) {
        this.$message.error({
          message: '请登录后操作'
        })
      } else if (this.$store.state.user.userInfo.userId === this.review.userId) {
        this.$message({
          type: 'warning',
          message: '不能给自己的书评点赞'
        })
      } else {
        this.isPoint = !this.isPoint
        const fd = new FormData()
        const that = this
        fd.append('userId', this.$store.state.user.userInfo.userId)
        fd.append('reviewId', this.review.reviewId)
        axios.post('/api/social/pointreview', fd, { headers: {
          'token': that.$store.state.user.token
        }}).then((res) => {
          console.log(res)
          if (that.isPoint) {
            that.review.pointNum += 1
          } else {
            that.review.pointNum -= 1
          }
        })
      }
    },
    toUser: function(userid) {
      this.$router.push({ name: 'Space', params: { userid: userid }})
    },
    toBook: function(bookid) {
      this.$router.push({ name: 'book', params: { bookid: bookid }})
    },
    submitComment: function() {
      if (this.commentInput.trim() === '') {
        this.$message({
          type: 'warning',
          message: '请输入评论内容'
        })
      } else {
        const fd = new FormData()
        const that = this
        fd.append('userId', this.$store.state.user.userInfo.userId)
        fd.append('reviewId', this.review.reviewId)
        fd.append('recommendTime', this.getNowTime())
        this.commentContent = this.commentInput.replace(/\n|\r\n/g, '<br/>')
        fd.append('recommendContent', this.commentContent)
        axios.post('/api/social/commit', fd, { headers: {
          'token': that.$store.state.user.token
        }}).then(res => {
          console.log(res)
          this.review.commitNum += 1
          this.commentInput = ''
          new Promise((resolve, reject) => {
            getReviewContent(this.reviewid).then((response) => {
              const { data } = response
              console.log(data)
              this.review = data.review
              this.book = data.book
              this.comments = data.review.recommend.reverse()
              this.isPoint = data.review.ispoint
              this.user = data.user
            }).catch(error => {
              reject(error)
            })
          })
        })
      }
    },
    report: function() {
      if (this.$store.state.user.token) {
        const that = this
        const fd = new FormData()
        fd.append('userId', this.$store.state.user.userInfo.userId)
        fd.append('reviewId', this.review.reviewId)
        axios.post('/api/social/reportreview', fd, { headers: { 'token': that.$store.state.user.token }}).then(res => {
          console.log(res)
          that.$message({
            type: 'success',
            message: '举报成功'
          })
        })
      } else {
        this.$message.error({ message: '请登录后操作' })
      }
    }

  }
}
</script>

<style scoped>
.wrap{
  width:1024px;
  margin:0 auto;
  position:relative;
  min-height: 600px;
  /* min-height: 2000px; */
  padding-bottom: 30px;
}
.title{
  margin-top: 60px;
  text-align: left;
  font-size: 32px;
  font-weight: 700;
}
.userInfoBar{
  margin-top: 25px;
  position: relative;
  height: 45px;
}
.userAvatar{
  width: 45px;
  height: 45px;
  border-radius: 100%;
  position: absolute;
  left: 0px;
  cursor: pointer;
}
.userName{
  position:absolute;
  left: 60px;
  top:5px;
  font-size: 14px;
  cursor: pointer;
}
.userLabel{
  color:#7f7f7f;
  font-size: 13px;
  position: absolute;
  left:60px;
  top: 30px;
}
.bookName{
  position:absolute;
  left: 250px;
  top: 5px;
  font-size: 14px;
  color: #3379c6;
  cursor: pointer;
}
.reviewTime{
  position:absolute;
  left: 250px;
  top:30px;
  font-size: 14px;
  color: #7f7f7f;
}
.reviewContent{
  margin-top: 30px;
  width: 730px;
  font-family: 'PingFang SC', sans-serif;
  font-size: 15px;
}
.bookInfoContainer{
  position: absolute;
  /* top: 200px; */
  left: 850px;
}
.bookInfoBar{
  height: 328px;
  width: 131px;
}
.bookPhoto{
  width: 110px;
  height: 150px;
}
.isFixed{
    position:fixed;
    background-color:#Fff;
    top:0;
    z-index:999;
}
.actionBar{
  margin-top: 50px;
  width: 730px;
  height: 32px;
  float: left;
  /* display: inline-block; */
  position: relative;
  /* float: left; */
}
.likeBtn{
  width: 80px;
  height: 32px;
  background: #fff;
  /* background: #f2f2f2; */
  border-radius: 5px;
  border: none;
  line-height: 32px;
  font-size: 16px;
  color: #7f7f7f;
  cursor: pointer;
  /* position: absolute; */
  float: left;
  /* left: 0; */
  /* vertical-align: middle; */
}
.likePic{
  vertical-align: middle;
  /* line-height: 32px; */
  width: 20px;
  height: 20px;
  margin-right: 3px;
}
.comment{
  float: left;
   height: 32px;
   line-height: 32px;
   color: #7f7f7f;
  margin-left: 10px;
  font-size: 14px;
}
.report{
  float: right;
  font-size: 15px;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  color: #7f7f7f;
}
.report_txt{
  line-height: 32px;
  float: left;
}
.footer{
  display: inline-block;
  margin-top: 40px;
}
.content_shown{
  line-height: 25px;
  /* letter-spacing: px; */
}
.commentBar{
  width: 730px;

  /* border: 1px solid red; */
  margin-top: 40px;
  margin-bottom: 40px;
  float: left;
}
.submitBar{
  float: left;
  margin-top: 40px;
  width: 730px;
  height: 50px;
}
.userPhoto{
  width: 50px;
  float: left;
  height: 50px;
}
.commentInput{
  margin-left: 20px;
  float: left;
  width: 560px;
  margin-top: 5px;
  line-height: 32px;
  height: 40px;
  text-indent: 1em;
}
.commnetBtn{
  float: right;
  /* margin-left: 10px; */
  height: 32px;
  margin-top: 9px;
  background: #3379cc;
  border: none;
  border-radius: 5px;
  color: #fff;
  width: 80px;
}
.share{
  float: left;
  width: 60px;
  /* border: 1px solid #000;
  border-radius: 5px; */
   height: 32px;
   cursor: pointer;
   line-height: 32px;
   /* color: #7f7f7f; */
   color: #7f7f7f;
  margin-left: 10px;
  font-size: 14px;
  background: #fff;
}
 .submitBtn{
  width: 80px;
  height: 30px;
  background: #3379cc;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;

}
</style>
