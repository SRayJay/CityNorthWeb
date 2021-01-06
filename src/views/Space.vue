<template>
  <div class="space">
    <Header />
    <div class="wrap">
      <div class="background_pic">
        <img :src="userBackground" class="background_pic_image" alt="">
      </div>
      <div class="userInfoContainer">
        <div class="userAvatar">
          <img :src="userAvatar" class="userAvatar_pic" alt="">
        </div>
        <div class="userName">{{ userInfo.userName }}</div>
        <div class="userLabel">{{ userInfo.userSelfLable }}</div>
        <div class="followAndFan">
          <span class="num">{{ userInfo.followNum||0 }}</span>关注 <span class="num">{{ userInfo.fanNum||0 }}</span>被关注</div>
        <div v-if="this.$route.params.userid!==this.$store.state.user.userInfo.userId.toString()" class="followBtnBar">
          <img src="@assets/icon/follow.png" class="followBtn" alt="">
          <img src="@assets/icon/sixin.svg" class="sixinBtn" alt="">
        </div>
      </div>
      <div class="momentBar">
        <div class="mtitle">我的动态({{ moments.length }})</div>
        <btn-more class="moreBtn" @toMore="toMoments($route.params.userid)" />
        <single-moment v-if="moments.length>0" :moment-info="moments[moments.length-1]" class="singleReview" />
        <single-moment v-if="moments.length>1" :moment-info="moments[moments.length-2]" class="singleReview" />
      </div>
      <div class="excerptsBar">
        <div class="mtitle">我的书摘</div>
        <btn-more class="moreBtn" />
      </div>
      <div class="reviewBar">
        <div class="mtitle">我的书评({{ reviews.length }})</div>
        <btn-more class="moreBtn" />
        <single-review v-if="reviews.length>0" :review-info="reviews[reviews.length-1]" class="singleReview" />
        <single-review v-if="reviews.length>1" :review-info="reviews[reviews.length-2]" class="singleReview" />
      </div>
      <div class="bookListBar">
        <div class="mtitle">我的书单</div>
        <btn-more class="moreBtn" />
      </div>
    </div>
    <footer-line />
  </div>

</template>

<script>
export default {
  name: 'Space',
  // props: {
  //   userid: {
  //     type: Number,
  //     default: 0
  //   }
  // },
  data: function() {
    return {
      userInfo: this.$store.state.user.userInfo,
      reviews: {},
      moments: {}
    }
  },
  computed: {
    userBackground: function() {
      return this.$host + this.userInfo.userBackGround
    },
    userAvatar: function() {
      return this.$host + this.userInfo.userPhoto
    }
  },
  created: function() {
    /*global axios */
    axios.post('/api/user/space/' + this.$route.params.userid).then((res) => {
      this.userInfo = res.data.user
      this.reviews = res.data.reviews
      this.moments = res.data.moments
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  },
  mounted: function() {
    // console.log(this.userInfo)
  },
  methods: {
    toMoments(userid) {
      console.log(11)
      this.$router.push({ name: 'SpaceMoments', params: { userid: userid }, query: { userName: this.userInfo.userName }})
    }
  }
}
</script>

<style scoped>
  .wrap{
    width: 1024px;
    position: relative;
    margin: 0 auto;
    padding-bottom: 30px;
  }
  .background_pic{

    width: 1024px;
    height: 465px;
    /* height: 450px; */
  }
  .background_pic_image{
    width: 1024px;
    height: 465px;
    /* height: 100%; */
  }
  .userInfoContainer{
    position: relative;
    height: 240px;
    /* border: 1px solid red; */
    margin-top: 40px;
  }
  .userAvatar{
    width: 180px;
    height: 180px;
    position: absolute;
    left: 0;
    top: 0;
    /* margin-top: 40px; */
  }
  .userAvatar_pic{
    width: 180px;
    height: 180px;
  }
  .userName{
    font-size: 22px;
    position: absolute;
    left: 210px;
    top: 0;
  }
  .userLabel{
    font-size: 14px;
    color: #7f7f7f;
    left:210px;
    top: 60px;
    position: absolute;
  }
  .followAndFan{
    position: absolute;
    left: 210px;
    font-size: 14px;
    top: 160px;
  }
  .followBtnBar{
    position: absolute;
    top: 200px;
    left: 42px;
    /* height: 24px;
    line-height: 24px; */
  }
  .followBtn{
    position: absolute;
    left: 0;
    top: 0;
  }
  .sixinBtn{
    /* height: 24px; */
    position: absolute;
    left: 64px;
    top: 3px;
    line-height: 24px;
  }
  .num{
    color: #D81E06;
    font-size: 18px;
    margin-left: 5px;
    margin-right: 5px;
  }
  .momentBar{
    position: relative;
    margin-top: 40px;
    width: 1024px;
    /* border: 1px solid red; */
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  .excerptsBar{
    position: relative;
    margin-top: 40px;
    width: 1024px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  .reviewBar{
    position: relative;
    margin-top: 40px;
    width: 1024px;
    /* border: 1px solid red; */
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  .bookListBar{
    position: relative;
    margin-top: 40px;
    width: 1024px;
    /* border: 1px solid red; */
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  .mtitle{
    font-size: 18px;
    position: relative;
    text-align: left;
    margin-left: 0px;
    margin-top: 0px;
    /* color: #03B615; */
    color: #0a7101;
  }
  .moreBtn{
    position: absolute;
    right: 20px;
    top: 15px;
  }
  .singleReview{
    margin-top: 30px;
  }
</style>
