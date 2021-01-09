<template>
  <div class="l_wrap">
    <img :src="this.$host+avatar" class="userAvatar" alt="">
    <div class="userInfoBar">
      <div class="userName">{{ userName }}</div>
      <div class="momentTime">{{ userLable }}</div>
    </div>
    <div
      v-if="momentContent.trim()!==''"
      ref="content_text"
      :class="{momentContent_all:!content_haveMore,momentContent:content_haveMore}"
      v-html=" momentContent "
    />
    <div v-if="momentContent.trim()!==''&& content_haveMore" class="more" @click="getMore">--展开--</div>
    <div v-if="momentPhoto.length>0" class="momentPhotos">
      <img v-for="photo in momentPhoto" :key="photo.photoId" class="momentPhoto" :src="$host+photo.photoSrc" alt="">
    </div>
    <div class="momentTime" style="text-align:left;margin-left:70px">{{ momentTime }}</div>
    <div class="actionBar">
      <div class="act" @click="like">
        <div class="actContainer">
          <img :src="isPoint?likedPic:likePic" class="act_icon my_icon" alt="">
          <div class="like_num">{{ momentLikeNum }}</div></div>
      </div>
      <div class="act" @click="showCommentBar">
        <div class="actContainer">
          <img src="@assets/icon/comment.png" class="act_icon my_icon" alt="">
          <div class="like_num">{{ momentCommentNum }}</div>
        </div>
      </div>

      <div class="act">
        <i class="el-icon-share act_icon" />
      </div>
      <div class="act">
        <i class="el-icon-star-off act_icon" />
      </div>
    </div>
    <div>
      <el-collapse-transition>
        <div v-show="showComment" class="commentBar">
          <div v-if="this.$store.state.user.token" class="commentUserBar">
            <img :src="$host+this.$store.state.user.userInfo.userPhoto" class="commentAvatar" alt="">
            <input v-model="mycomment" type="text" class="commentInput">
            <button class="commentBtn" @click="submitComment">评论</button>
          </div>
          <div class="commentAll">
            <community-single-comment v-for="comment in commentList" :key="comment.recommendId" :comment-info="comment" />
          </div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommunityMoment',
  props: {
    'momentInfo': {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    return {
      avatar: this.momentInfo.userPhoto,
      userName: this.momentInfo.userName,
      momentTime: this.momentInfo.momentTime,
      momentContent: this.momentInfo.momentContent,
      momentPhoto: this.momentInfo.momentPhoto,
      userLable: this.momentInfo.userSelfLable,
      momentLikeNum: this.momentInfo.pointNum,
      momentCommentNum: this.momentInfo.commitNum,
      content_haveMore: false,
      likePic: require('@assets/icon/like.png'),
      likedPic: require('@assets/icon/liked.png'),
      isPoint: (this.momentInfo.ispoint === 1),
      showComment: false,
      mycomment: '',
      commentList: this.momentInfo.recommend
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      if (this.momentContent.trim() !== '') {
        setTimeout(() => {
          this.change_content_haveMore()
        }, 100)
      }
    })
  },
  methods: {
    halfrate: function(rate) {
      return rate / 2
    },
    change_content_haveMore: function() {
      // console.log(this.$refs.content_text.offsetHeight)
      if (this.$refs.content_text.offsetHeight > 125) {
        this.content_haveMore = true
        return true
      } else {
        this.content_haveMore = false
        return true
      }
    },
    showCommentBar: function() {
      this.showComment = !this.showComment
      // axios.post('/')
    },
    getMore: function() {
      this.content_haveMore = !this.content_haveMore
      // console.log(this.$refs.content_text.offsetHeight)
    },
    submitComment: function() {
      if (this.mycomment.trim() === '') {
        this.$message({
          type: 'warning',
          message: '请输入评论内容'
        })
      } else {
        const fd = new FormData()
        const that = this
        fd.append('userId', this.$store.state.user.userInfo.userId)
        fd.append('momentId', this.momentInfo.momentId)
        fd.append('recommendTime', this.getNowTime())
        fd.append('recommendContent', this.mycomment)
        axios.post('/api/social/commit', fd, { headers: {
          'token': that.$store.state.user.token
        }}).then(res => {
          console.log(res)
          this.momentCommentNum += 1
          this.mycomment = ''
        })
      }
    },
    like: function() {
      console.log(this.$store.state.user.userInfo.userId)
      console.log(this.momentInfo.userId)
      if (!this.$store.state.user.token) {
        this.$message.error({
          message: '请登录后操作'
        })
      } else if (this.$store.state.user.userInfo.userId === this.momentInfo.userId) {
        this.$message({
          type: 'warning',
          message: '不能给自己的动态点赞'
        })
      } else {
        this.isPoint = !this.isPoint
        const fd = new FormData()
        const that = this
        fd.append('userId', this.$store.state.user.userInfo.userId)
        fd.append('momentId', this.momentInfo.momentId)
        /* global axios */
        axios.post('/api/social/pointmoment', fd, { headers: {
          'token': that.$store.state.user.token
        }}).then((res) => {
          console.log(res)
          if (that.isPoint) {
            that.momentLikeNum += 1
          } else {
            that.momentLikeNum -= 1
          }
        })
      }
    }

  }
}
</script>

<style scoped>
.l_wrap{
  position: relative;
  width: 644px;
  /* min-height: 170px; */
  /* margin-left: 20px; */
  /* border: 1px solid red; */
}
.more{
    cursor: pointer;
    color: #3379c6;
    font-size: 14px;
    z-index: 999;
    margin-top: 10px;
}
.userAvatar{
  height: 50px;
  width: 50px;
  float: left;
}
.userInfoBar{
  float: left;
  /* display: inline-block; */
  margin-left: 20px;
}
.userName{
  display: block;
  color: #3379cc;
  text-align: left;
}
.momentTime{
  display: block;
  margin-top: 17px;
  font-size: 14px;
  color: #7f7f7f;
}
.momentContent{
  padding-top: 15px;
  margin-left: 70px;
  font-size: 15px;
  text-align: left;
  width: 546px;
  line-height: 1.5;
  min-height: 20px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.momentContent_all{
  width: 546px;
  padding-top: 15px;
  margin-left: 70px;
  height: auto;
  font-size: 15px;
  text-align: left;
  line-height: 1.5;
  display: -webkit-box;
}
.momentPhotos{
text-align: left;
/* height: 160px; */
width: 546px;
margin-top: 20px;
margin-left: 40px;
/* float:left; */
display: inline-block;
}
.momentPhoto{
  width: 160px;
  height: 160px;
  object-fit: cover;
  margin-top: 5px;
  margin-right: 20px;
}

.actionBar{
    height: 40px;
    background:#fff;
    margin-top: 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.act{
    float: left;
    width: 161px;
    height: 40px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 20px;
    color: #7f7f7f;
    cursor: pointer;
}
.actContainer{
    height: 40px;
    line-height: 40px;
    /* display: flex; */
}
.act_icon{
    line-height: 40px;
    position: relative;
}
.my_icon{
    height: 20px;
    width: 20px;
    /* line-height: 40px; */
    display: inline-block;
    position: relative;
    top: 30%;
    transform:translateY(-50%);
    /* line-height: 20px; */
}
.like_num{
    font-size: 18px;
    color: #7f7f7f;
    display: inline-block;
    position: relative;
    top: 50%;
    transform:translateY(-50%);
    margin-left: 5px;

}
.commentBar{
  background: #fff;
  min-height: 32px;
}
.commentUserBar{
  position: relative;
  height: 32px;
  line-height: 32px;
  width: 625px;
  margin:10px;
  display: inline-block;
}
.commentAvatar{
  width: 32px;
  height: 32px;
 position: absolute;
 left: 0px;
}
.commentInput{
  /* vertical-align: middle; */
  width: 500px;
  height: 32px;
  padding: 2px;
  font-size: 13px;
  text-align: left;
  display: inline-block;
  position: absolute;
  left: 50px;
  text-indent: 0.5em;
  /* border-radius: 5px; */
  /* border: none; */
}
.commentBtn{
  color: #fff;
  background: rgba(64, 158, 255, 1);
  height: 32px;
  width: 66px;
  position: absolute;
  right: 0px;
  border: none;
  border-radius: 5px;
  font-size:14px;
}
</style>
