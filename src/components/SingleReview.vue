<template>
  <div class="l_wrap">
    <img :src="this.$host+pic" class="bookPic" alt="">
    <div class="reviewTitle">{{ reviewTitle }}</div>
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
    <div class="reviewText">{{ reviewText }}</div>
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
    }
  },
  data: function() {
    return {
      pic: this.reviewInfo.bookPhoto,
      reviewTitle: this.reviewInfo.reviewTitle,
      bookName: this.reviewInfo.bookName,
      bookRate: 9.0,
      reviewText: this.reviewInfo.reviewText

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
  height: 170px;
  /* margin-left: 20px; */
}
.bookPic{
  position: absolute;
  left: 0;
  width: 110px;
  height: 151px;
}
.reviewTitle{
  position: absolute;
  left: 130px;
  color:#0171b0;
  font-size: 18px;
  top: 0px;
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
}

</style>
