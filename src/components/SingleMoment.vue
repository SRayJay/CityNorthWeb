/*
这个动态用在个人主页

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
  </div>
</template>

<script>
export default {
  name: 'SingleMoment',
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
      content_haveMore: false,
      userLable: this.momentInfo.userSelfLable
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
    }
  }
}
</script>

<style scoped>
.l_wrap{
  position: relative;
  width: 950px;
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
  width: 900px;
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
  width: 900px;
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
  width: 900px;
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
width: 950px;
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
</style>
