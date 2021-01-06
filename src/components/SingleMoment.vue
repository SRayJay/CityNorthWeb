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
    <!-- <div class="reviewTitle">{{ reviewTitle }}</div> -->
    <!-- <div class="lBar">
      <div class="bookName">《{{ bookName }}》</div>
      <el-rate
        :value="halfrate(bookRate)"
        class="rate"
        disabled
        :max="5"
        text-color="#ff9900"
      />
    </div>
    <div class="reviewText">{{ reviewText }}</div> -->
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
      momentPhoto: this.momentInfo.momentPhoto
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
  width: 950px;
  min-height: 170px;
  /* margin-left: 20px; */
  /* border: 1px solid red; */
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
  width: 900px;
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
