<template>
  <div class="l_wrap">
    <img :src="this.$host+pic" class="bookPic" alt="" @click="toReviewContent">
    <div class="reviewTitle" @click="toReviewContent">{{ reviewTitle }}</div>
    <div class="actionBar">
      <img src="@assets/icon/like.png" class="like_icon" alt="">
      {{ pointNum }}
    </div>
    <div class="lBar">
      <div class="bookName">《{{ bookName }}》</div>
      <el-rate
        :value="halfrate(bookRate)"
        class="rate"
        disabled
        :max="5"
        text-color="#ff9900"
      />

    </div>
    <div class="reviewText" @click="toReviewContent">{{ reviewText }}</div>
    <div v-if="owner" class="deleteBar">
      <i class="el-icon-delete-solid" alt="删除" @click="showDeleteDialog" />
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
        <el-button size="small" type="primary" @click="deleteReview">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SingleReview',
  props: {
    'reviewInfo': {
      type: Object,
      default: function() {
        return {}
      }
    },
    'owner': {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      pic: this.reviewInfo.bookPhoto,
      reviewTitle: this.reviewInfo.reviewTitle,
      bookName: this.reviewInfo.bookName,
      bookRate: 9.0,
      reviewText: this.reviewInfo.reviewText,
      pointNum: this.reviewInfo.pointNum,
      deleteVisible: false
    }
  },
  methods: {
    halfrate: function(rate) {
      return rate / 2
    },
    toReviewContent: function() {
      this.$router.push({ name: 'ReviewContentPage', params: { reviewid: this.reviewInfo.reviewId }})
    },
    showDeleteDialog: function() {
      this.deleteVisible = true
    },
    deleteReview: function() {
      /*global axios */
      const fd = new FormData()
      const that = this
      fd.append('reviewId', this.reviewInfo.reviewId)
      axios.post('/api/user/delete/review', fd, { headers: { 'token': that.$store.state.user.token }}).then(res => {
        console.log(res)
        that.deleteVisible = false
        that.$emit('delete', that.reviewInfo.reviewId)
      })
    }
  }
}
</script>

<style scoped>
.l_wrap{
  position: relative;
  width: 1024px;
  height: 170px;
  /* margin-left: 20px; */
}
.bookPic{
  position: absolute;
  left: 0;
  width: 110px;
  height: 151px;
  cursor: pointer;
}
.reviewTitle{
  position: absolute;
  left: 130px;
  color:#0171b0;
  font-size: 18px;
  top: 0px;
  cursor: pointer;
}
.lBar{
  position: absolute;
  left: 130px;
  top: 40px;
  height: 18px;
  line-height: 18px;
}
.bookName{
  position: relative;
  font-size: 14px;
  float: left;
  /* display: inline-block; */
}
.rate{
  /* position: relative; */
  margin-left: 10px;
  float: left;
}
.reviewText{
  text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
  position: absolute;
  left: 130px;
  top: 90px;
  width: 785px;
  letter-spacing:normal;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
}
.actionBar{
  position: absolute;
  right: 50px;
}
.like_icon{
  width: 16px;
  height: 16px;
  vertical-align: top;
}
.deleteBar{
  cursor: pointer;
  position: absolute;
  right: 50px;
  color: #7f7f7f;
  bottom: 0;
}
</style>
