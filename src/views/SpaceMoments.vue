<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="mtitle">{{ userName }}的动态</div>
      <el-divider />
      <div v-for="moment in moments.slice((currentPage-1)*10,currentPage*10)" :key="moment.momentId" v-loading="loading" class="momentsSingle">
        <single-moment-pro :moment-info="moment" @delete="deleteMoment" />
        <el-divider />
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :total="moments.length"
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
      />
    </div>
    <footer-line />
  </div>
</template>

<script>
export default {
  name: 'SpaceMoments',
  data: function() {
    return {
      moments: [],
      currentPage: 1,
      loading: false,
      userName: this.$route.query.userName
    }
  },
  created: function() {
    const that = this
    /*global axios */
    this.loading = true
    axios.post('/api/user/moment/' + this.$route.params.userid).then((res) => {
      console.log(res)
      that.moments = res.data.moments.reverse()
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
    deleteMoment: function(momentId) {
      for (var i = 0; i < this.moments.length; i++) {
        if (this.moments[i].momentId === momentId) {
          this.moments.splice(i, 1)
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
