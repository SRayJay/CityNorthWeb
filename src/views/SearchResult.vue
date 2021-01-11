<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="search_back">
        <input ref="search_word" :value="this.$route.params.searchContent" class="search_input" @keyup.enter="search">
        <div class="right_back" @click="search">
          <img id="search_icon" src="@assets/icon/search.png" alt="">
        </div>
      </div>
      <div class="leftBar">
        <button class="leftBtn" :class="{leftBtn_focus:nowBar===0,leftBtn_nofocus:nowBar!==0}" @click="focus(0)">全部</button>
        <button class="leftBtn" :class="{leftBtn_focus:nowBar===1,leftBtn_nofocus:nowBar!==1}" @click="focus(1)">书籍</button>
        <button class="leftBtn" :class="{leftBtn_focus:nowBar===2,leftBtn_nofocus:nowBar!==2}" @click="focus(2)">作家</button>
        <button class="leftBtn" :class="{leftBtn_focus:nowBar===3,leftBtn_nofocus:nowBar!==3}" @click="focus(3)">用户</button>
      </div>
      <div class="middleBar">

        <span class="search_title">搜索{{ this.$route.params.searchContent }}</span>
        <el-divider class="divider" />
        <div v-if="nowBar===0" ref="middleBar">
          <div v-if="result.authors.length>0">
            <div class="result_title">作家：</div>
            <div v-for="author in result.authors" :key="author.authorId">
              <search-author :author="author" class="singleAuthor" @toAuthorDetails="toAuthorDetails(author.authorId)" />
            </div>
          </div>
          <div v-if="result.books.length>0">
            <div class="result_title">书籍：</div>
            <div v-for="book in result.books" :key="book.bookId">
              <search-book :book="book" class="single" @toBookDetails="toBookDetails(book.bookId)" />
            </div>
          </div>
          <div v-if="result.users.length>0">
            <div class="result_title">用户：</div>
            <div v-for="user in result.users" :key="user.userId">
              <search-user :user="user" class="singleUser" @toUserSpace="toUserSpace(user.userId)" />
            </div>
          </div>
          <div v-if="result.authors.length===0&&result.books.length===0&&result.users.length===0">
            没有搜索到结果
          </div>
        </div>
        <div v-else-if="nowBar===1">
          <div class="result_title">书籍：</div>
          <div v-if="result.books.length===0">
            没有搜索到结果
          </div>
          <div v-for="book in result.books" :key="book.bookId">
            <search-book :book="book" class="single" @toBookDetails="toBookDetails(book.bookId)" />
          </div>
        </div>
        <div v-else-if="nowBar===2">
          <div class="result_title">作家：</div>
          <div v-if="result.authors.length===0">
            没有搜索到结果
          </div>
          <div v-for="author in result.authors" :key="author.authorId">
            <search-author :author="author" class="singleAuthor" @toAuthorDetails="toAuthorDetails(author.authorId)" />
          </div>
        </div>
        <div v-else-if="nowBar===3">
          <div class="result_title">用户：</div>
          <div v-if="result.users.length===0">
            没有搜索到结果
          </div>
          <div v-for="user in result.users" :key="user.userId">
            <search-user :user="user" class="singleUser" @toUserSpace="toUserSpace(user.userId)" />
          </div>
        </div>
      </div>
      <div class="rightBar">
        <span class="label_title">热门标签</span>
        <btn-more class="moreBtn" />
        <el-divider class="divider_right" />
        <div class="lineBar">
          <div class="mtitle">中国文学</div>
          <div class="labelBar">
            <div class="label">小说</div>
            <div class="label">随笔</div>
            <div class="label">诗歌</div>
            <div class="label">社科</div>
            <div class="label">散文</div>
            <div class="label">传记</div>
            <div class="label">人文</div>
          </div>
          <div class="mydivider" />
        </div>
        <div class="lineBar">
          <div class="mtitle">日本文学</div>
          <div class="labelBar">
            <div class="label">小说</div>
            <div class="label">随笔</div>
            <div class="label">诗歌</div>
            <div class="label">社科</div>
            <div class="label">散文</div>
            <div class="label">传记</div>
            <div class="label">人文</div>
          </div>
          <div class="mydivider" />
        </div>
        <div class="lineBar">
          <div class="mtitle">欧美文学</div>
          <div class="labelBar">
            <div class="label">小说</div>
            <div class="label">随笔</div>
            <div class="label">诗歌</div>
            <div class="label">社科</div>
            <div class="label">散文</div>
            <div class="label">传记</div>
            <div class="label">人文</div>
          </div>
          <div class="mydivider" />
        </div>
        <div class="lineBar">
          <div class="mtitle">拉美文学</div>
          <div class="labelBar">
            <div class="label">小说</div>
            <div class="label">随笔</div>
            <div class="label">诗歌</div>
            <div class="label">社科</div>
            <div class="label">散文</div>
            <div class="label">传记</div>
            <div class="label">人文</div>
          </div>
          <div class="mydivider" />
        </div>
      </div>
    </div>
    <footer-line class="footer" />
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  data: function() {
    return {
      result: JSON.parse(this.$route.query.result),
      nowBar: 0
    }
  },

  watch: {
    '$route': 'getRouteResult'
  },

  created: function() {
    // console.log(this.result)
    this.result = JSON.parse(this.$route.query.result)
  },
  methods: {
    search: function() {
      const content = this.$refs.search_word.value.trim()
      // console.log(content)
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
            that.result = JSON.parse(that.$route.query.result)
            // that.word = content
          })
        } else {
          axios.post('/api/search', fd).then(res => {
            that.$router.push({ name: 'SearchResult', params: { 'searchContent': content }, query: { 'result': JSON.stringify(res.data) }})
            that.result = JSON.parse(that.$route.query.result)
            // that.word = content
          })
        }
        // console.log(this.result.authors)
      }
    },
    getRouteResult: function() {
      this.result = JSON.parse(this.$route.query.result)
    },
    toBookDetails: function(bookId) {
      this.$router.push({ name: 'book', params: { bookid: bookId }})
    },
    toUserSpace: function(userId) {
      this.$router.push({ name: 'Space', params: { userid: userId }})
    },
    toAuthorDetails: function(authorId) {
      this.$router.push({ name: 'author', params: { authorid: authorId }})
    },
    focus: function(id) {
      this.nowBar = id
    }
  }
}
</script>

<style scoped>
.wrap{
    position: relative;
    margin: 0 auto;
    width: 1024px;
    padding-bottom: 30px;
    min-height: 600px;
}
.search_back{
    border-radius: 8px;
    border: none;
    position: relative;
    margin: 20px auto 0;
    height: 75px;
    width: 592px;
    z-index: 1;
    cursor: pointer;
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
    color:#000;
    /* background-color: rgb(242, 242, 242); */
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
  }
  #search_icon{
    width: 24px;
    height: 24px;
    position: absolute;
    top:8px;
    left:33px;
  }
  .leftBar{
    width: 88px;
    float: left;
    margin-top: 80px;
  }
  .leftBtn{
    width: 88px;
    height: 33px;
    font-size: 14px;
    margin-bottom: 2px;
    outline: none;
    border:none;
    cursor: pointer;
    border-radius: 5px;
  }
  .leftBtn_nofocus{
    color: #000;
    background: #fff;
  }
  .leftBtn_focus{
    color: #ffffff;
    background: #3379cc;
  }
  .middleBar{
      float: left;
      margin-top: 30px;
      width: 480px;
      margin-left: 30px;
  }
  .divider{
      margin-top: 50px;
      width: 480px;
  }
  .mydivider{
    margin-top: 10px;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.3);
    height: 1px;
  }
  .search_title{
    font-size: 24px;
    /* text-align: left; */
    float: left;
    font-weight: 700;
    font-family: 'PingFang SC Bold', 'PingFang SC Regular', 'PingFang SC', sans-serif;
  }
  .rightBar{
      float: left;
      margin-top: 30px;
      margin-left: 80px;
  }
  .label_title{
    font-size: 24px;
    font-weight: 700;
    float: left;
    font-family: 'PingFang SC Bold', 'PingFang SC Regular', 'PingFang SC', sans-serif;
  }
  .divider_right{
      /* margin-top: 50px; */
      width: 300px;
  }
  .result_title{
    text-align: left;
    margin-top: 20px;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    font-family:  'PingFang SC Bold', 'PingFang SC Regular', 'PingFang SC', sans-serif;
  }
  .single{
    margin-left: 40px;
    margin-top: 20px;
    height: 140px;
    cursor:pointer;
    /* height: 100%; */
  }
  .singleAuthor{
    margin-left: 40px;
    margin-top: 20px;
    height: 120px;
    cursor:pointer;
  }
  .singleUser{
    margin-left: 40px;
    margin-top: 20px;
    height: 86px;
    cursor:pointer;
  }
  .mtitle{
   color: #333;
   font-size: 14px;
   text-align: left;
  }
  .labelBar{
    /* margin-top: 8px; */
    height: 60px;
    width: 300px;
  }
  .label{
    float: left;
    width: 50px;
    color: #0171B0;
    margin-right: 10px;
    margin-top: 8px;
    font-size: 13px;
    height: 22px;
    line-height: 22px;
    background-color: rgba(242, 242, 242, 1);
  }
  .lineBar{
    margin-top: 20px;
    height: 88px;
  }
  .moreBtn{
    /* text-align: right; */
    /* float:right; */
    /* position: absolute;
    right: 0px; */
    margin-left: 136px;
  }
  .footer{
    position: relative;
    margin-top: 60px;
    display: inline-block;
  }
</style>
