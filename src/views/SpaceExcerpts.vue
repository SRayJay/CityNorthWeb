<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="mtitle">{{ userName }}的书摘</div>
      <el-divider />
      <div v-for="excerpt in excerpts.slice((currentPage-1)*10,currentPage*10)" :key="excerpt.excerptId" v-loading="loading" class="reviewSingle">
        <single-excerpt :excerpt-info="excerpt" :owner="owner" @delete="deleteExcerpts" />
        <!-- <el-divider /> -->
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
    <footer-line class="footer" />
  </div>
</template>

<script>
export default {
  name: 'SpaceExcerpts',
  data: function() {
    return {
      excerpts: [],
      loading: false,
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
    this.loading = true
    axios.post('/api/user/excerpts/' + this.$route.params.userid).then((res) => {
      that.excerpts = res.data.excerpts.reverse()
      console.log(res)
      that.loading = false
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      window.scrollTo(0, 0)
    },
    deleteExcerpt: function(excerptId) {
      for (var i = 0; i < this.excerpts.length; i++) {
        if (this.excerpts[i].excerptId === excerptId) {
          this.excerpts.splice(i, 1)
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
.footer{
  display: inline-block;
}
</style>
