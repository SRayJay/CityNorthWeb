<template>
  <div class="space">
    <Header />
    <div class="wrap">
      <div class="background_pic">
        <img v-loading="loading" :src="userBackground" class="background_pic_image" alt="">
      </div>
      <div class="userInfoContainer">
        <div class="userAvatar">
          <img :src="userAvatar" class="userAvatar_pic" alt="">
        </div>
        <div class="userName">{{ userInfo.userName }}</div>
        <div class="userLabel">{{ userInfo.userSelfLable }}</div>
        <div class="followAndFan">
          <span class="num" @click="checkFollow">{{ userInfo.userFollowNum||0 }}</span>关注 <span class="num" @click="checkFan">{{ userInfo.userFanNum||0 }}</span>被关注</div>
        <div v-if="parseInt(this.$route.params.userid)!==nowUserId" class="followBtnBar">
          <img :src="followPic" class="followBtn" alt="" @click="follow">
          <!-- <img src="@assets/icon/sixin.svg" class="sixinBtn" alt=""> -->
        </div>
      </div>
      <el-dialog
        :title="followTitle"
        :visible.sync="followDialogVisible"
        width="20%"
      >
        <el-table
          v-loading="followDialogLoading"
          max-height="300"
          :data="follows"
          stripe
          border
          :show-header="false"
          style="width: 100%;margin-bottom:30px;min-height:240px;"
          highlight-current-row
          @row-click="toHisSpace"
          @current-change="handleCurrentChange"
        >
          <el-table-column>
            <template slot-scope="scope">
              <img :src="$host+scope.row.userPhoto" class="userMiniAvatar" alt="">
              <div class="userMiniName">{{ scope.row.userName }}</div>
              <div class="cancelFollowBtn">已关注</div>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog
        :title="fanTitle"
        :visible.sync="fanDialogVisible"
        width="20%"
      >
        <el-table
          v-loading="fanDialogLoading"
          max-height="300"
          :data="fans"
          stripe
          border
          :show-header="false"
          style="width: 100%;margin-bottom:30px;min-height:240px;"
          highlight-current-row
          @row-click="toHisSpace"
          @current-change="handleCurrentChange"
        >
          <el-table-column>
            <template slot-scope="scope">
              <img :src="$host+scope.row.userPhoto" class="userMiniAvatar" alt="">
              <div class="userMiniName">{{ scope.row.userName }}</div>
              <!-- <div class="FollowBtn">关注</div> -->
            </template>
          </el-table-column>

        </el-table>
      </el-dialog>
      <div v-loading="loading" class="momentBar">
        <div class="mtitle">{{ rencheng }}的动态({{ moments.length }})</div>
        <btn-more class="moreBtn" @toMore="toMoments($route.params.userid)" />
        <single-moment v-if="moments.length>0" :moment-info="moments[moments.length-1]" class="singleReview" />
        <el-divider v-if="moments.length>1" />
        <single-moment v-if="moments.length>1" :moment-info="moments[moments.length-2]" class="singleReview" />
      </div>
      <div v-loading="loading" class="excerptsBar">
        <div class="mtitle">{{ rencheng }}的书摘</div>
        <btn-more class="moreBtn" @toMore="toExcerpts" />
        <single-excerpt v-if="excerpts.length>0" :excerpt-info="excerpts[excerpts.length-1]" class="singleReview" />
        <single-excerpt v-if="excerpts.length>1" :excerpt-info="excerpts[excerpts.length-2]" class="singleReview" />
      </div>
      <div v-loading="loading" class="reviewBar">
        <div class="mtitle">{{ rencheng }}的书评({{ reviews.length }})</div>
        <btn-more class="moreBtn" @toMore="toReviews" />
        <single-review v-if="reviews.length>0" :review-info="reviews[reviews.length-1]" class="singleReview" />
        <single-review v-if="reviews.length>1" :review-info="reviews[reviews.length-2]" class="singleReview" />
      </div>
      <div v-loading="loading" class="bookListBar">
        <div class="mtitle">{{ rencheng }}的书单</div>
        <btn-more class="moreBtn" @toMore="toBookLists" />
        <single-book-list v-if="wantBook.length>0" title="想读" :book-list="wantBook" />
        <single-book-list v-if="readingBook.length>0" title="在读" :book-list="readingBook" />
        <single-book-list v-if="haveReadBook.length>0" title="已读" :book-list="haveReadBook" />
      </div>
    </div>
    <footer-line />
  </div>

</template>

<script>
/*global axios */
export default {
  name: 'Space',
  data: function() {
    return {
      userInfo: {},
      reviews: {},
      moments: {},
      excerpts: {},
      wantBook: [],
      loading: false,
      readingBook: [],
      haveReadBook: [],
      follows: [],
      fans: [],
      nowUserId: (this.$store.state.user.token) ? this.$store.state.user.userInfo.userId : 0,
      isFollow: 0,
      followDialogLoading: false,
      followDialogVisible: false,
      fanDialogVisible: false,
      fanDialogLoading: false
    }
  },
  computed: {
    userBackground: function() {
      return this.$host + this.userInfo.userBackGround || ''
    },
    userAvatar: function() {
      return this.$host + this.userInfo.userPhoto || ''
    },
    rencheng: function() {
      if (this.$route.params.userid === this.nowUserId) {
        return '我'
      } else {
        return 'TA'
      }
    },
    followTitle: function() {
      return this.rencheng + '关注的'
    },
    fanTitle: function() {
      return '关注' + this.rencheng + '的'
    },
    // TODO
    followPic: function() {
      if (this.nowUserId === 0) {
        return require('@assets/icon/follow.png')
      } else if (this.isFollow === 0) {
        return require('@assets/icon/follow.png')
      } else {
        return require('@assets/icon/followed.png')
      }
    }
  },
  watch: {
    '$route': 'getRouteResult'
  },
  created: function() {
    console.log(this.nowUserId)
    const fd = new FormData()
    const that = this
    this.loading = true
    fd.append('visitId', this.$route.params.userid)
    if (this.$store.state.user.token) {
      fd.append('userId', this.$store.state.user.userInfo.userId)
      axios.post('/api/user/space/' + this.$route.params.userid, fd, { headers: { 'token': that.$store.state.user.token }}).then((res) => {
        that.userInfo = res.data.user
        that.reviews = res.data.reviews
        that.moments = res.data.moments
        that.excerpts = res.data.excerpts
        that.isFollow = res.data.isFollow
        that.wantBook = res.data.wantBook
        that.readingBook = res.data.readingBook
        that.haveReadBook = res.data.haveReadBook
        that.loading = false
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    } else {
      axios.post('/api/user/space/' + this.$route.params.userid, fd).then((res) => {
        that.userInfo = res.data.user
        that.reviews = res.data.reviews
        that.moments = res.data.moments
        this.excerpts = res.data.excerpts
        that.isFollow = res.data.isFollow
        that.wantBook = res.data.wantBook
        that.readingBook = res.data.readingBook
        that.haveReadBook = res.data.haveReadBook
        console.log(res)
        that.loading = false
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  mounted: function() {
    // console.log(this.userInfo)
  },
  methods: {

    toBookLists() {
      this.$router.push({ name: 'SpaceBookLists', params: { userid: this.$route.params.userid }, query: { userName: this.userInfo.userName }})
    },
    toMoments(userid) {
      this.$router.push({ name: 'SpaceMoments', params: { userid: userid }, query: { userName: this.userInfo.userName }})
    },
    toReviews() {
      this.$router.push({ name: 'SpaceReviews', params: { userid: this.$route.params.userid }, query: { userName: this.userInfo.userName }})
    },
    toExcerpts() {
      this.$router.push({ name: 'SpaceExcerpts', params: { userid: this.$route.params.userid }, query: { userName: this.userInfo.userName }})
    },
    toHisSpace(val) {
      this.followDialogVisible = false
      this.fanDialogLoading = false
      console.log(val.userId)
      this.$router.push({ name: 'Space', params: { userid: val.userId }})
    },
    getRouteResult() {
      console.log(this.nowUserId)
      const fd = new FormData()
      const that = this
      fd.append('visitId', this.$route.params.userid)
      if (this.$store.state.user.token) {
        fd.append('userId', this.$store.state.user.userInfo.userId)
        axios.post('/api/user/space/' + this.$route.params.userid, fd, { headers: { 'token': that.$store.state.user.token }}).then((res) => {
          that.userInfo = res.data.user
          that.reviews = res.data.reviews
          that.moments = res.data.moments
          that.isFollow = res.data.isFollow
          that.wantBook = res.data.wantBook
          that.readingBook = res.data.readingBook
          that.haveReadBook = res.data.haveReadBook
          console.log(res)
        }).catch((error) => {
          console.log(error)
        })
      } else {
        axios.post('/api/user/space/' + this.$route.params.userid, fd).then((res) => {
          that.userInfo = res.data.user
          that.reviews = res.data.reviews
          that.moments = res.data.moments
          that.isFollow = res.data.isFollow
          that.wantBook = res.data.wantBook
          that.readingBook = res.data.readingBook
          that.haveReadBook = res.data.haveReadBook
          console.log(res)
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    follow() {
      if (!this.$store.state.user.token) {
        this.$message.error({ message: '请登录后操作' })
      } else {
        const fd = new FormData()
        const that = this
        fd.append('userId', this.$store.state.user.userInfo.userId)
        fd.append('starId', parseInt(this.$route.params.userid))
        console.log('userId:' + fd.get('userId'))
        console.log('starId:' + fd.get('starId'))
        console.log(this.$store.state.user.token)
        axios.post('/api/social/addpoint', fd, { headers: { 'token': this.$store.state.user.token }}).then(res => {
          console.log(res)
          if (that.isFollow === 0) {
            that.$message({
              type: 'success',
              message: '关注成功'
            })
            that.isFollow = 1
            that.userInfo.userFanNum += 1
          } else {
            that.$message({
              type: 'warning',
              message: '取消关注'
            })
            that.isFollow = 0
            that.userInfo.userFanNum -= 1
          }
        })
      }
    },
    checkFollow() {
      const that = this
      this.followDialogVisible = true
      this.followDialogLoading = true
      axios.post('/api/user/follow/' + this.$route.params.userid).then(res => {
        console.log(res)
        that.follows = res.data.follows
        that.followDialogLoading = false
      })
    },
    checkFan() {
      const that = this
      this.fanDialogVisible = true
      this.fanDialogLoading = true
      axios.post('/api/user/fan/' + this.$route.params.userid).then(res => {
        console.log(res)
        that.fans = res.data.fans
        that.fanDialogLoading = false
      })
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
    .userMiniAvatar{
    height: 36px;
    width: 36px;
    float: left;
  }
  .userMiniName{
    margin-left: 20px;
    font-size:16px;
    height:36px;
    line-height:36px;
    float:left;
  }
  .miniIcon{
    height: 16px;
    width: 16px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    /* display: inline-block; */
    line-height: 16px;
  }
  .cancelFollowBtn{
    float: right;
    position: relative;
    height: 32px;
    width: 72px;
    vertical-align: middle;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    color: #777;
    cursor: pointer;
    text-align: center;
    line-height: 32px;
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
    left: 80px;
    /* height: 24px;
    line-height: 24px; */
  }
  .followBtn{
    cursor: pointer;
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
    cursor: pointer;
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
    cursor: pointer;
  }
</style>
