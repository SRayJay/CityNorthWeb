<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="mtitle">{{ userName }}的动态</div>
      <el-divider />
      <div v-for="moment in moments" :key="moment.momentId" class="momentsSingle">
        <single-moment-pro :moment-info="moment" />
        <el-divider />
      </div>
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
      userName: this.$route.query.userName
    }
  },
  created: function() {
    /*global axios */
    axios.post('/api/user/moment/' + this.$route.params.userid).then((res) => {
      console.log(res)
      this.moments = res.data.moments.reverse()
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
.wrap{
    position: relative;
    width: 1024px;
    margin: 0 auto;
    padding-bottom: 30px;
}
.mtitle{
    color: #0a7101;
    text-align: left;
    font-size: 20px;
    margin-top: 40px;
}
.momentsSingle{

}
</style>
