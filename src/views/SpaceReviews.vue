<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="mtitle">{{ userName }}的书评</div>
      <el-divider />
      <div v-for="review in reviews.slice((currentPage-1)*10,currentPage*10)" :key="review.reviewId" class="reviewSingle">
        <single-review :review-info="review" :owner="owner" @delete="deleteReview" />

        <el-divider />
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :total="reviews.length"
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
      />

    </div>
    <footer-line />
  </div>
</template>

<script>
export default {
  name: 'SpaceReviews',
  data: function() {
    return {
      reviews: [],
      currentPage: 1,
      userName: this.$route.query.userName
    }
  },
  computed: {
    owner() {
      if (this.$store.state.user.token && this.$store.state.user.userInfo.userId === parseInt(this.$route.params.userid)) {
        return true
      } else {
        return false
      }
    }
  },
  created: function() {
    const that = this
    /*global axios */
    axios.post('/api/user/review/' + this.$route.params.userid).then((res) => {
      that.reviews = res.data.reviews.reverse()
      console.log(that.reviews)
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      window.scrollTo(0, 0)
    },
    deleteReview: function(reviewId) {
      for (var i = 0; i < this.reviews.length; i++) {
        if (this.reviews[i].reviewId === reviewId) {
          this.reviews.splice(i, 1)
        }
      }
    }
  }
}
</script>

<style scoped>
.wrap{
    position: relative;
    width: 1024px;
    margin: 0 auto;
    min-height: 600px;
    padding-bottom: 30px;
}
.mtitle{
    color: #0a7101;
    text-align: left;
    font-size: 20px;
    margin-top: 40px;
}
.reviewSingle{

}

</style>
