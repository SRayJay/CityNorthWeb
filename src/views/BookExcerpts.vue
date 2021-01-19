<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="mtitle">{{ '《'+bookInfo.bookName+'》' }}的书摘</div>
      <el-divider />
      <div v-if="excerpts.length>0">
        <div v-for="excerpt in excerpts.slice((currentPage-1)*10,currentPage*10)" :key="excerpt.reviewId" v-loading="loading" class="reviewSingle">
          <single-book-excerpt :excerpt-info="excerpt" :user-photo="excerpt.userPortrait" :user-name="excerpt.userName" />

          <el-divider />
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="currentPage"
          :total="excerpts.length"
          :hide-on-single-page="true"
          @current-change="handleCurrentChange"
        />
      </div>
      <div v-else>
        暂无书摘
      </div>
    </div>
    <footer-line />
  </div>
</template>

<script>
export default {
  name: 'BookExcerpts',
  data: function() {
    return {
      bookInfo: {},
      bookId: 0,
      excerpts: [],
      currentPage: 1,
      loading: false
    }
  },
  created: function() {
    /*global axios */
    const that = this
    const fd = new FormData()
    this.bookId = this.$route.params.bookid
    this.loading = true
    if (this.$store.state.user.token) {
      fd.append('userId', that.$store.state.user.userInfo.userId)
      axios.post('/api/book/' + that.bookId, fd, { headers: { 'token': that.$store.state.user.token }}).then(res => {
        const { data } = res
        this.bookInfo = data.book
        this.excerpts = data.excerpts
        console.log(this.bookInfo)
        console.log(this.excerpts)
        that.loading = false
      })
    } else {
      axios.post('/api/book/' + that.bookId).then(res => {
        const { data } = res
        this.bookInfo = data.book
        this.reviews = data.review
        console.log(data)
        that.loading = false
      })
    }
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

</style>
