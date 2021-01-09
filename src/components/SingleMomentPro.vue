/*
这个动态用在个人动态页
*/
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
      <img src="@assets/icon/like.png" class="l_icon" alt="">
      <span class="pointNum">{{ pointNum }}</span>
      <img src="@assets/icon/comment.png" class="l_icon" style="margin-left:10px;" alt="评论">
      <span class="commentNum">{{ commentNum }}条评论</span>
      <div class="lcontainer" style="margin-left:10px;"><i class="el-icon-delete-solid" alt="删除" @click="showDeleteDialog" /></div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="deleteVisible"
      width="13%"
      :before-close="handleClose"
    >
      <span>确定要删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="deleteVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="deleteMoment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SingleMomentPro',
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
      pointNum: this.momentInfo.pointNum,
      commentNum: this.momentInfo.commitNum,
      content_haveMore: false,
      userLable: this.momentInfo.userSelfLable,
      deleteVisible: false
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
      if (this.$refs.content_text.offsetHeight > 125) {
        this.content_haveMore = true
        return true
      } else {
        this.content_haveMore = false
        return true
      }
    },
    getMore: function() {
      this.content_haveMore = !this.content_haveMore
    },
    showDeleteDialog: function() {
      this.deleteVisible = true
    },
    deleteMoment: function() {
      /*global axios */
      const fd = new FormData()
      const that = this
      fd.append('momentId', this.momentInfo.momentId)
      axios.post('/api/user/delete/moment', fd, { headers: { 'token': that.$store.state.user.token }}).then(res => {
        console.log(res)
        that.deleteVisible = false
        that.$emit('delete', that.momentInfo.momentId)
      })
    }
  }
}
</script>

<style scoped>
.l_wrap{
  position: relative;
  width: 676px;
  min-height: 170px;
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
.l_icon{
    width: 20px;
    height: 20px;
    text-align: left;
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
  text-align: left;
}
.momentTime{
  display: block;
  margin-top: 17px;
  font-size: 14px;
  color: #7f7f7f;
}
/* .momentContent{
  float: left;
  margin-top: 20px;
  text-align: left;
  width: 620px;
  min-height: 20px;
  text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
} */
.momentContent{
  padding-top: 15px;
  margin-left: 70px;
  font-size: 15px;
  text-align: left;
  width: 620px;
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
  width: 620px;
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
height: 160px;
width: 900px;
margin-top: 20px;
display: inline-block;
margin-left: 70px;

}
.momentPhoto{
  object-fit: cover;
  width: 160px;
  height: 160px;
  margin-right: 20px;
}
.actionBar{
    margin-top: 10px;
    text-align: left;
    position: relative;
    height: 20px;
    display: flex;
    margin-left: 70px;
    margin-top: 20px;
}
.lcontainer{
  color: #7f7f7f;
    font-size: 20px;
    cursor: pointer;
}
.pointNum{
    line-height: 20px;
    display: inline-block;
    margin: auto 5px;
}
.commentNum{
    /* position: absolute; */
    line-height: 15px;
    /* display: inline; */
    margin: auto 5px;
}
</style>
