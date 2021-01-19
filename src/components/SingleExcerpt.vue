<template>
  <div class="l_wrap">
    <img :src="$host+excerptInfo.bookPhoto" class="bookPic" alt="" @click="toReviewContent">
    <div class="reviewTitle" @click="toReviewContent">《{{ excerptInfo.bookName }}》</div>
    <div
      ref="content_text"
      class="reviewText"
      :class="{excerptContent_all:!content_haveMore,excerptContent:content_haveMore}"
      @click="toReviewContent"
      v-html="'“ '+excerptInfo.excerptsContent +' ”'"
    />
    <div v-if="content_haveMore" class="more" @click="getMore">--展开--</div>
    <div v-if="owner" class="deleteBar">
      <i class="el-icon-delete-solid" alt="删除" @click="showDeleteDialog" />
    </div>
    <div style="clear:both;" />
    <el-divider />
    <el-dialog
      title="提示"
      :visible.sync="deleteVisible"
      width="20%"
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
  name: 'SingleExcerpt',
  props: {
    'excerptInfo': {
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
      content_haveMore: false,
      deleteVisible: false
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.change_content_haveMore()
      }, 100)
    })
  },
  methods: {
    halfrate: function(rate) {
      return rate / 2
    },
    toReviewContent: function() {
      this.$router.push({ name: 'ReviewContentPage', params: { reviewid: this.reviewInfo.reviewId }})
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
  min-height: 170px;
  /* margin-left: 20px; */
}
.bookPic{
  float: left;
  width: 110px;
  height: 151px;
  cursor: pointer;
}
.more{
    cursor: pointer;
    color: #3379c6;
    font-size: 14px;
    z-index: 999;
    display: inline-block;
    text-align: center;
    width: 100%;
    margin-top: 10px;
}
.reviewTitle{
  /* position: absolute;
  left: 130px; */
  float: left;
  margin-left: 20px;
  color:#0171b0;
  font-size: 18px;
  top: 0px;
  cursor: pointer;
}
/* .reviewText{
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
} */
.reviewText{
  float: left;
  margin-left: 20px;
  margin-top: 30px;

}
.excerptContent{
  padding-top: 15px;
  /* margin-left: 70px; */
  font-size: 15px;
  text-align: left;
  width: 800px;
  line-height: 1.5;
  min-height: 20px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.excerptContent_all{
  width: 800px;
  padding-top: 15px;
  /* margin-left: 70px; */
  height: auto;
  font-size: 15px;
  text-align: left;
  line-height: 1.5;
  display: -webkit-box;
}

.like_icon{
  width: 16px;
  height: 16px;
  vertical-align: top;
}
.deleteBar{
  cursor: pointer;
  float: right;

  color: #7f7f7f;
}
</style>
