<template>
  <div class="l_wrap">
    <img class="userPhoto" :src="$host+commentInfo.userPhoto" alt="">
    <div class="infoBar">
      <div class="userName">{{ commentInfo.userName }}</div>
      <div class="commentTime">{{ commentInfo.recommendTime }}</div>
    </div>
    <div class="commentContent">{{ commentInfo.recommendContent }}</div>
    <div style="clear:both;" />
  </div>
</template>

<script>
export default {
  name: 'ReviewSingleComment',
  props: {
    commentInfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    return {

    }
  }
}
</script>

<style scoped>
.l_wrap{
    width: 730px;
    position: relative;
    min-height: 80px;
}
.userPhoto{
    width: 64px;
    height: 64px;
    float: left;
}
.infoBar{
    width: 635px;
    height:27px;
    float: right;
    background: #f2f2f2;
}
.userName{
    margin-left: 20px;
    float: left;
    color: #3379cc;
    line-height: 27px;
}
.commentTime{
    color: #7f7f7f;
    font-size: 14px;
    line-height: 27px;
    float: left;
    margin-left: 30px;
}
.commentContent{
    float: left;
    margin-top: 10px;
    font-size: 14px;
    text-align: left;
    margin-left: 45px;
    width: 620px;
    line-height: normal;
}
</style>
