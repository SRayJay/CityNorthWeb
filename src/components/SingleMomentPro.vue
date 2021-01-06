<template>
  <div class="l_wrap">
    <img :src="this.$host+avatar" class="userAvatar" alt="">
    <div class="userInfoBar">
      <div class="userName">{{ userName }}</div>
      <div class="momentTime">{{ momentTime }}</div>
    </div>
    <div v-if="momentContent.trim()!==''" class="momentContent">
      {{ momentContent }}
    </div>
    <div class="momentPhotos">
      <img v-for="photo in momentPhoto" :key="photo.photoId" class="momentPhoto" :src="$host+photo.photoSrc" alt="">
    </div>
    <div class="actionBar">
      <img src="@assets/icon/like.png" class="l_icon" alt="">
      <span class="pointNum">{{ pointNum }}</span>
      <img src="@assets/icon/comment.png" class="l_icon" style="margin-left:10px;" alt="">
      <span class="commentNum">{{ commentNum }}条评论</span>
    </div>
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
      commentNum: this.momentInfo.commitNum
    }
  },
  methods: {
    halfrate: function(rate) {
      return rate / 2
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
.momentContent{
  /* display: block; */
  float: left;
  margin-top: 20px;
  text-align: left;
  /* margin-left: ; */
  width: 620px;
  min-height: 20px;
  text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
.momentPhotos{
text-align: left;
height: 160px;
width: 676px;
margin-top: 20px;
display: inline-block;
}
.momentPhoto{
  max-height: 100%;
  max-width: 100%;
  /* max-height: 160px; */
  width: auto;
  height: auto;
  margin-right: 20px;
}
.actionBar{
    margin-top: 10px;
    text-align: left;
    position: relative;
    height: 20px;
    vertical-align: middle;
    /* display: inline-block; */
    /* line-height: 20px; */
    /* float: left; */
}
.pointNum{
    /* float: left; */

    line-height: 20px;
    display: inline-block;
    /* vertical-align: middle; */
    /* display: inline; */
    margin: auto 5px;
}
.commentNum{
    /* position: absolute; */
    line-height: 15px;
    /* display: inline; */
    margin: auto 5px;
}
</style>
