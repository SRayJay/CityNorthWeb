<template>
  <div class="ls_wrap">
    <div class="userInfoBar">
      <div class="review_userName">
        @{{ userName }}
      </div>：{{}}
    </div>
    <!-- <img :src="$host+reviewInfo.bookPhoto" class="bookPhoto" alt="">
    <div class="reviewTitle">{{ reviewInfo.reviewTitle }}</div>
    <div class="bookName">{{ '《'+reviewInfo.bookName +'》' }}</div>
    <div class="reviewContent">{{ reviewInfo.reviewText }}</div> -->
  </div>
</template>

<script>
export default {
  name: 'SimpleMoment',
  props: {
    reviewInfo: {
      type: Object,
      default: function() {
        return {}
      }
    },
    userName: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {

    }
  }
}
</script>

<style scoped>
.ls_wrap{
    display: inline-block;
    width: 480px;
    height: 180px;
    background: #fff;
    /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); */
    padding: 14px 0 0;
    /* border: 1px solid red; */
}
.userInfoBar{
    width: 100%;
    display: inline-block;
    text-align: left;
}
.review_userName{
    float: left;
    font-size: 16px;
    margin-left: 5px;
    color: #409eff;
}
.bookPhoto{
    width: 100px;
    height: 137px;
    float: left;
    margin-top: 10px;
}
.reviewTitle{
    margin-top: 10px;
    font-size: 18px;
    width: 365px;
    text-align: left;
    color: #3379cc;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 15px;
}
.bookName{
    float: left;
    width: 365px;
    margin-top: 10px;
    text-align: left;
    margin-left: 15px;
}
.reviewContent{
    width: 360px;
    text-align: left;
    margin-left: 15px;
    margin-top: 35px;
    font-size: 14px;
    float: left;
    text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
</style>
