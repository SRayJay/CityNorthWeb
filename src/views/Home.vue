<template>
  <div>
    <Header />
    <div>
      <div class="index_bg">
        <img src="../assets/index_bg.png" alt="" class="bg_pic">
        <div class="welcometext">Welcome to CityNorthBook</div>
      </div>

      <div class="search_back">
        <input ref="search_word" class="search_input" placeholder="搜索" @keyup.enter="search">
        <div class="right_back" @click="search">
          <img id="search_icon" src="@assets/icon/search.png" alt="">
        </div>
      </div>
      <recom-books v-loading="loading" :recommend-book="recommendBook" />
      <anli-books />
      <hot-books v-loading="loading" :hot-book="hotBook" />
    </div>
    <footer-line />
  </div>
</template>

<script>
// import { getIndex } from '@/api/public.js'
export default {
  name: 'Home',
  data: function() {
    return {
      hotBook: [],
      recommendBook: [],
      loading: false
    }
  },
  created: function() {
    const that = this
    this.loading = true
    const fd = new FormData()

    if (this.$store.state.user.token) {
      fd.append('userId', this.$store.state.user.userInfo.userId)
      axios.post('/api/user/index', fd, { headers: { 'token': that.$store.state.user.token }}).then(res => {
        console.log(res)
        that.hotBook = res.data.hotBook
        that.recommendBook = res.data.recommendBook
        that.loading = false
      })
    } else {
      fd.append('userId', 0)
      axios.post('/api/user/index', fd, { headers: { 'token': that.$store.state.user.token }}).then(res => {
        console.log(res)
        that.hotBook = res.data.hotBook
        that.recommendBook = res.data.recommendBook
        that.loading = false
      })
    }
  },
  methods: {
    search: function() {
      const content = this.$refs.search_word.value.trim()
      if (content !== '') {
        this.getNowTime()
        const fd = new FormData()
        const that = this
        fd.append('searchContent', content)
        fd.append('searchTime', this.getNowTime())
        /*global axios */
        if (this.$store.state.user.token) {
          fd.append('userId', this.$store.state.user.userInfo.userId)
          axios.post('/api/search', fd, { headers: { 'token': that.$store.state.user.token }}).then(res => {
            console.log(res)
            that.$router.push({ name: 'SearchResult', params: { 'searchContent': content }, query: { 'result': JSON.stringify(res.data) }})
          })
        } else {
          axios.post('/api/search', fd).then(res => {
            that.$router.push({ name: 'SearchResult', params: { 'searchContent': content }, query: { 'result': JSON.stringify(res.data) }})
          })
        }
      }
    }

  }

}
</script>
<style scoped>
  .bg_pic{
    width: 1024px;
    height: 352px;
    position: relative;
  }
  .welcometext{
    font-weight: 700;
    color: #fefefe;
    position: absolute;
    top: 216px;
    left: 538px;
    left: 50%;
    transform: translate(-50%,0);
    font-family: Arial Negreta;
    font-style: normal;
    font-size: 32px;
  }
  .search_back{
    border-radius: 8px;
    border: none;
    background-color: rgba(242, 242, 242, 0.5);
    /* opacity: 0.5; */
    position: absolute;
    /* left: 464px; */
    left: 50%;
    transform: translate(-50%,0);
    top: 391px;
    height: 75px;
    width: 592px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.35);
    z-index: 1;

  }

  .search_input{
    position: absolute;
    width: 442px;
    height: 41px;
    border: 1px solid #797979;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    /* left: 494px; */
    left: 30px;
    top: 17px;
    /* top: 408px; */
    font-weight: 400;
    box-sizing: border-box;
    align-self: center;
    padding: 2px;
    color:#797979;
    background-color: rgb(242, 242, 242);
    font-size: 15px;
    text-align: left;
    z-index: 2;
    text-indent: 22px;
  }
  .search_input:focus{
    outline: none ;
  }
  .right_back{
    width:89px;
    height:41px;
    left:470px;
    top:17px;
    position: absolute;
    background-color:rgba(0, 0,0,0.5);
    border: none;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    cursor: pointer;
  }
  #search_icon{
    width: 24px;
    height: 24px;
    position: absolute;
    top:8px;
    left:33px;

  }

</style>
