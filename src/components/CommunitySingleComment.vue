<template>
  <div class="l_comment">
    <img :src="$host+commentInfo.userPhoto" class="userAvatar" alt="">
    <div class="nameAndContent">
      <div class="userName">{{ commentInfo.userName }}:</div>
      <div class="commentContent">{{ commentInfo.recommendContent }}</div>
      <div class="actionBar">
        <div class="like">
          <img src="@assets/icon/like.png" class="like_icon" alt="">{{ commentInfo.pointNum }}
        </div>
        <div class="replyBtn">回复</div>
      </div>
    </div>
    <div class="nextBar">
      <div class="timeline">{{ commentInfo.recommendTime }}</div>
      <div class="checkMore">共{{ commentInfo.secondRecommand.length }}条回复</div>
    </div>
    <el-divider />
  </div>
</template>

<script>
export default {
  name: 'CommunitySingleComment',
  props: {
    'commentInfo': {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    return {

    }
  },
  created: function() {

  }
}
</script>

<style scoped>
.l_comment{
    margin-left: 50px;
    width: 575px;
    position: relative;
    margin-top:10px;
    margin-bottom: 10px;
}
.userAvatar{
    width: 32px;
    height: 32px;
    float: left;

}
.nameAndContent{
    /* width: 500px; */
    padding-right: 50px;
    display: flex;
    position: relative;
}
.userName{
    /* float: left; */
    font-size: 14px;
    height: 32px;
    color: #3379cc;
    margin-left: 5px;
    white-space: nowrap;
}
.commentContent{
    /* float: left; */
    font-size: 14px;
    margin-left: 15px;
    text-align: left;
}

.actionBar{
    width: 50px;
    position: absolute;
    right: 0px;
    /* float: right; */
}
.replyBtn{
    font-size: 14px;
    color: #3379cc;
}
.like{
    font-size: 14px;
    height: 16px;
    line-height: 16px;
    margin-bottom: 5px;
}
.like_icon{
    vertical-align: top;
    margin-right: 3px;
    width: 16px;
    height: 16px;
}
::v-deep .el-divider--horizontal{
    margin: 6px 0 12px;
}
.nextBar{
margin-top: 10px;
    margin-left: 36px;
}
.timeline{
    font-size: 13px;
    color: #7f7f7f;
    text-align: left;
    float: left;
    /* display: inline; */
}
.checkMore{
    /* text-align: right; */
    font-size: 13px;
    /* float: left; */
    /* display: inline; */
    text-align: left;
    /* float: left; */
    margin-left: 150px;
    color: #3379cc;
}
</style>
