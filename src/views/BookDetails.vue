<template>
  <div class="book-details">
    <Header />
    <div class="wrap">
      <div class="bookinfo">

        <div class="book_brief">
          <div class="booktitle">
            {{ BookInfo.bookName }}
          </div>
          <div class="pic">
            <img :src="this.$host+BookInfo.bookPhotoUrl" alt="" class="bookpic">
          </div>
          <div class="author">作者：{{ '['+BookInfo.authorCountry+']'+BookInfo.authorName }}</div>
          <div class="publisher">出版社：{{ BookInfo.publisherName }}</div>
          <div class="producer">出品方：{{ BookInfo.producerName }}</div>
          <div class="publish_time">出版时间：{{ BookInfo.bookPublishTime }}</div>
          <div class="translator">译者：{{ BookInfo.bookTranslator }}</div>
          <!-- <div class="ISBNcode">ISBN：{{ BookInfo.bookISBNcode }}</div> -->
        </div>
        <div class="btnBar">
          <el-tooltip class="item" effect="dark" content="加入想读书单" placement="bottom-start">
            <div class="btnBar_btn" :class="{btnBar_btn_click:BookInfo.iswantRead===1,btnBar_btn_noClick:BookInfo.iswantRead===0}" @click="addWant">想读</div></el-tooltip>
          <el-tooltip class="item" effect="dark" content="加入在读书单" placement="bottom-start">
            <div class="btnBar_btn" :class="{btnBar_btn_click:BookInfo.isreadIng===1,btnBar_btn_noClick:BookInfo.isreadIng===0}" @click="addReading">在读</div></el-tooltip>
          <el-tooltip class="item" effect="dark" content="加入已读书单" placement="bottom-start">
            <div class="btnBar_btn" :class="{btnBar_btn_click:BookInfo.ishaveRead===1,btnBar_btn_noClick:BookInfo.ishaveRead===0}" @click="addHaveRead">已读</div></el-tooltip>
        </div>
        <div class="book_intro">
          <div class="subtitle">内容简介</div>
          <div class="cutline" />
          <div ref="content_text" :class="{book_intro_content_all:!content_haveMore,book_intro_content:content_haveMore}">{{ BookInfo.bookIntroduce }}</div>
          <div v-if="content_haveMore" class="more" @click="getMore_content">--展开--</div>
        </div>
        <div class="author_intro">
          <div class="subtitle">作者简介</div>
          <div class="cutline" />
          <div ref="author_text" :class="{author_intro_content:author_haveMore,author_intro_content_all:!author_haveMore}">{{ BookInfo.authorIntroduce }}</div>
          <div v-if="author_haveMore" class="more" @click="getMore_author">--展开--</div>
        </div>
        <div class="excerpts">
          <div class="subtitle">书摘</div>
          <div class="write_excerpts"><i class="el-icon-edit small-icon" /><span> 写书摘</span></div>
          <div class="cutline" />
          <div v-for="excerpts in show_excerpts " :key="excerpts.excerptsId" class="excerpts_single">
            <div class="excerpts_content">{{ excerpts.excerptsContent }}</div>
            <img :src="excerpts.userPhoto" class="excerpts_user_avatar" alt="">
            <div class="excerpts_user_name">{{ excerpts.userName }}</div>
            <div class="likes">
              <div class="likes_icon">
                <img :src="like_icon" alt="">
              </div>
              <div class="likes_num">{{ excerpts.likes }}</div>
            </div>
          </div>
          <div class="excerpts_more">
            <i class="el-icon-arrow-right" /> 更多书摘({{ BookInfo.excerptsNum }}篇)</div>
        </div>
        <div class="review">
          <div class="subtitle">书评</div>
          <div class="write_review" @click="toWriteReview"><i class="el-icon-edit-outline small-icon" /> <span> 写书评</span></div>
          <div class="cutline" />
          <div v-for="review in show_reviews.slice(0,2)" :key="review.reviewId" class="review_single" @click="toReviewContentPage(review.reviewId)">
            <div class="review_title">{{ review.reviewTitle }}</div>
            <div class="review_content">{{ review.reviewText }}</div>
            <div class="likes">
              <div class="likes_icon">
                <img :src="like_icon" alt="">
              </div>
              <div class="likes_num">{{ review.pointNum }}</div>
            </div>
          </div>
          <div class="review_more">
            <i class="el-icon-arrow-right" />更多书评({{ BookInfo.reviewNum }}篇)</div>
        </div>

      </div>
      <div class="bookrate">
        <div class="container">
          <div class="mtitle">书籍评分</div>
          <div class="rate_num">{{ (BookInfo.bookScore).toFixed(1) }}</div>
          <el-rate
            v-model="halfrate"
            class="rate"
            disabled
            :max="5"
            text-color="#ff9900"
          />
          <div class="xiangdu">{{ BookInfo.wantRead }} 人想读</div>
          <div class="zaidu">{{ BookInfo.readIng }} 人在读</div>
          <div class="yidu">{{ BookInfo.haveRead }} 人已读</div>
        </div>
      </div>
      <div class="relatedbooks">
        <div class="mtitle">相关书籍</div>
        <div class="booklist">
          <div v-for="(book,index) in relationbook.slice(0,5)" :key="index" class="book_single">
            <img :src="host+book.bookPhotoUrl" class="related_pic">
            <span class="related_title">{{ book.bookName }}</span>
            <div class="related_author">{{ book.authorName }}</div>
            <el-rate
              :value="halfRelatedRate(book.bookScore)"
              class="related_rate"
              disabled
              text-color="#ff9900"
            />
          </div>
        </div>
      </div>
    </div>
    <footer-line />
  </div>

</template>

<script>
import { getBookInfo } from '@/api/book.js'
export default {
  name: 'Book',

  data: function() {
    return {
      host: this.$host,
      bookid: this.$route.params.bookid,
      content_haveMore: false,
      author_haveMore: true,
      BookInfo: {
        bookScore: 0
      },
      default: 0,
      like_icon: require('@assets/icon/like.png'),
      relationbook: [],
      show_excerpts: [],
      show_reviews: []
    }
  },
  computed: {
    halfrate: {
      get() {
        return (this.BookInfo.bookScore) / 2
      },
      set() {

      }
    }
  },
  created: function() {
    // const _this = this

    new Promise((resolve, reject) => {
      getBookInfo(this.bookid).then((response) => {
        const { data } = response
        console.log(data)
        this.BookInfo = data.book
        console.log(this.BookInfo)
        this.show_excerpts = data.excerpts
        this.show_reviews = data.review
        this.relationbook = data.relationbook
      }).catch(error => {
        reject(error)
      })
    })
  },
  mounted: function() {
    // console.log(this.$refs.content_text.textContent)
    this.$nextTick(() => {
      setTimeout(() => {
        console.log('高度' + this.$refs.content_text.offsetHeight)
        this.change_content_haveMore()
        this.change_author_haveMore()
      }, 100)
    })
  },
  methods: {
    // 判断当前dom节点应该有多少高度，一行为19px,最多显示十行，若高度多于十行，则显示展开按钮
    change_content_haveMore: function() {
      if (this.$refs.content_text.offsetHeight > 210) {
        this.content_haveMore = true
        return true
      } else {
        this.content_haveMore = false
        return true
      }
    },
    change_author_haveMore: function() {
      if (this.$refs.author_text.offsetHeight > 210) {
        this.author_haveMore = true
        return true
      } else {
        this.author_haveMore = false
        return true
      }
    },
    getMore_content: function() {
      console.log('高度' + this.$refs.content_text.offsetHeight)
      this.content_haveMore = !this.content_haveMore
      console.log('高度' + this.$refs.content_text.offsetHeight)
    },
    getMore_author: function() {
      this.author_haveMore = !this.author_haveMore
      console.log('高度' + this.$refs.author_text.offsetHeight)
    },
    halfRelatedRate: function(r) {
      return r / 2
    },
    toWriteReview: function() {
      if (this.$store.state.user.token) {
        const fd = new FormData()
        const that = this
        fd.append('userId', this.$store.state.user.userInfo.userId)
        fd.append('bookId', this.bookid)
        /*global axios */
        axios.post('/api/write/review/check', fd).then(function(res) {
          console.log(res)
          if (res.data.message === 422) {
            that.$message({
              type: 'warning',
              message: '您已发表过该书籍的书评'
            })
            that.$router.push({ name: 'ReviewContentPage', params: { reviewid: res.data.reviewId }})
          } else {
            that.$router.push({ name: 'ReviewEditPage', query: { bookInfo: JSON.stringify(this.BookInfo) }})
          }
        })
      } else {
        this.$message.error('当前未登录，请登录后操作')
      }
    },
    toReviewContentPage: function(reviewId) {
      this.$router.push({ name: 'ReviewContentPage', params: { reviewid: reviewId }})
    },
    addWant: function() {
      // 没添加想读时
      if (!this.$store.state.user.token) {
        this.$message.error({
          message: '请登录后操作'
        })
      } else if (this.$store.state.user.token && this.BookInfo.iswantRead === 0) {
        const that = this
        const fd = new FormData()
        fd.append('userId', this.$store.state.user.userInfo.userId)
        fd.append('bookId', this.BookInfo.bookId)
        axios.post('/api/book/addwant', fd, { headers: { 'token': this.$store.state.user.token }}).then(res => {
          console.log(res)
          that.BookInfo.iswantRead = 1
          that.$message({
            type: 'success',
            message: '已加入想读书单'
          })
        })
      } else if (this.$store.state.user.token && this.BookInfo.iswantRead === 1) {
        const that = this
        const fd = new FormData()
        fd.append('userId', this.$store.state.user.userInfo.userId)
        fd.append('bookId', this.BookInfo.bookId)
        axios.post('/api/book/addwant', fd, { headers: { 'token': this.$store.state.user.token }}).then(res => {
          console.log(res)
          that.BookInfo.iswantRead = 0
          that.$message({
            type: 'success',
            message: '已从想读书单移除'
          })
        })
      }
    },
    addReading: function() {
      if (!this.$store.state.user.token) {
        this.$message.error({
          message: '请登录后操作'
        })
      } else if (this.$store.state.user.token && this.BookInfo.isreadIng === 0) {
        const that = this
        const fd = new FormData()
        fd.append('userId', this.$store.state.user.userInfo.userId)
        fd.append('bookId', this.BookInfo.bookId)
        axios.post('/api/book/addreading', fd, { headers: { 'token': this.$store.state.user.token }}).then(res => {
          console.log(res)
          that.BookInfo.isreadIng = 1
          that.$message({
            type: 'success',
            message: '已加入在读书单'
          })
        })
      } else if (this.$store.state.user.token && this.BookInfo.isreadIng === 1) {
        const that = this
        const fd = new FormData()
        fd.append('userId', this.$store.state.user.userInfo.userId)
        fd.append('bookId', this.BookInfo.bookId)
        axios.post('/api/book/addreading', fd, { headers: { 'token': this.$store.state.user.token }}).then(res => {
          console.log(res)
          that.BookInfo.isreadIng = 0
          that.$message({
            type: 'success',
            message: '已从在读书单移除'
          })
        })
      }
    },
    addHaveRead: function() {
      if (!this.$store.state.user.token) {
        this.$message.error({
          message: '请登录后操作'
        })
      } else if (this.$store.state.user.token && this.BookInfo.ishaveRead === 0) {
        const that = this
        const fd = new FormData()
        fd.append('userId', this.$store.state.user.userInfo.userId)
        fd.append('bookId', this.BookInfo.bookId)
        axios.post('/api/book/addhaveread', fd, { headers: { 'token': this.$store.state.user.token }}).then(res => {
          console.log(res)
          that.BookInfo.ishaveRead = 1
          that.$message({
            type: 'success',
            message: '已加入已读书单'
          })
        })
      } else if (this.$store.state.user.token && this.BookInfo.ishaveRead === 1) {
        const that = this
        const fd = new FormData()
        fd.append('userId', this.$store.state.user.userInfo.userId)
        fd.append('bookId', this.BookInfo.bookId)
        axios.post('/api/book/addhaveread', fd, { headers: { 'token': this.$store.state.user.token }}).then(res => {
          console.log(res)
          that.BookInfo.ishaveRead = 0
          that.$message({
            type: 'success',
            message: '已从已读书单移除'
          })
        })
      }
    }
  }

}
</script>

<style scoped>
  .wrap{
      width: 1024px;
      margin:0 auto;
      position: relative;
      padding-bottom: 30px;
  }
  .container{
      position: relative;
  }
  .more{
    cursor: pointer;
    color: #3379c6;
    font-size: 14px;
    /* margin: 4px; */
    margin-top: 10px;
  }
  .bookinfo{
      width: 700px;
      position: relative;
      margin-top: 40px;
      /* height: 1700px; */
      padding-bottom: 40px;
      /* float: left; */
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  .book_brief{
    position: relative;
    /* margin-top: 20px; */
    width: 700px;
    height: 320px;
    /* border: 1px solid blue; */
    margin-top: 34px;
  }
  .booktitle{
      position: absolute;
      left: 40px;
      top: 34px;
      font-weight: 700;
      font-size: 23px;
      font-family: 'PingFang SC Bold', 'PingFang SC Regular', 'PingFang SC', sans-serif;
  }
  .bookpic{
      width: 164px;
      height: 227px;
      position: absolute;
      left: 40px;
      top: 86px;
  }
  .author{
      position: absolute;
      left: 228px;
      top: 86px;
      font-size:14px;
  }
  .publisher{
      position: absolute;
      left: 228px;
      top: 116px;
      font-size: 14px;
  }
  .producer{
      position: absolute;
      left: 228px;
      top: 146px;
      font-size: 14px;
  }
  .publish_time{
      position: absolute;
      left: 228px;
      top: 176px;
      font-size: 14px;
  }
  .translator{
      position: absolute;
      left: 228px;
      top: 206px;
      font-size: 14px;
  }
  .ISBNcode{
      position: absolute;
      left: 228px;
      top: 236px;
      font-size: 14px;
  }

  .btnBar{
    position: relative;
    margin-top: 20px;
    margin-left: 40px;
    height: 30px;
  }
  .btnBar_btn{
    float: left;
    cursor: pointer;
    align-self: center;
    line-height: 30px;
    margin-right: 20px;
    width: 60px;
    height: 30px;

    color: #fff;
    font-size: 13px;
    border-radius: 5px;
  }
  .btnBar_btn_noClick{
    background: rgba(85, 85, 85, 1);
  }
  .btnBar_btn_click{
    background: #03B615;
  }
  .book_intro{
    /* //top: 436px; */
    position: relative;
    margin-top: 40px;
    /* border: 1px solid red; */
    width: 660px;
    margin-left: 40px;

  }
  .subtitle{
    color: #03B615;
    font-size: 18px;
    text-align: left;
  }
  .cutline{
    width: 200px;
    height: 1px;
    background: #ccc;
    margin-top: 20px;
  }
  .book_intro_content{
    width: 635px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-overflow: -o-ellipsis-lastline;
    display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 10;
    font-size: 14px;
    margin-top: 15px;
    text-align: left;
    text-indent: 2em;
    line-height: 1.5;
  }
  .book_intro_content_all{
    width: 635px;
    font-size: 14px;
    margin-top: 15px;
    text-align: left;
    height: auto;
    text-indent: 2em;
    line-height: 1.5;
    display: -webkit-box;
  }
  .author_intro{
    position:relative;
    margin-top: 40px;
    margin-left: 40px;
    width: 660px;
  }
  .excerpts{
    position: relative;
    margin-top: 40px;
    margin-left: 40px;
    width: 660px;
  }
  .author_intro_content{
    width: 635px;
    /* max-height: 190px; */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 10;
    /* height: 190px; */
    font-size: 14px;
    margin-top: 15px;
    text-align: left;
    text-indent: 2em;
    line-height: 1.5;
  }
  .author_intro_content_all{
    width: 635px;
    font-size: 14px;
    margin-top: 15px;
    text-align: left;
    text-indent: 2em;
    line-height: 1.5;
  }
  .small-icon{
    font-size: 18px;
    vertical-align: middle;
  }
  .excerpts_single{
    width: 585px;
    height: 100px;
    /* margin-top: 15px; */
    margin: 15px 0px;
    position: relative;
  }
  .write_excerpts{
    background: #fff;
    position: absolute;
    top: 0px;
    left: 550px;
    border-radius: 8px;
    color:#0078F7;
    font-size: 14px;
    width: 80px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    box-shadow:0 2px 6px rgba(0, 0, 0, 0.1);
  }
  .write_review{
    background: #fff;
    cursor: pointer;
    position: absolute;
    top: 0px;
    left: 550px;
    border-radius: 8px;
    color:#0078F7;
    font-size: 14px;
    width: 80px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    box-shadow:0 2px 6px rgba(0, 0, 0, 0.1);
  }
  .excerpts_content{
    font-size: 14px;
    text-align: left;
  }
  .excerpts_user_avatar{
    height: 24px;
    width:24px;
    position: absolute;
    left: 0px;
    top: 70px;
  }
  .excerpts_user_name{
    position: absolute;
    left: 35px;
    top: 75px;
    font-size: 14px;
  }
  .likes{
    position: absolute;
    left: 600px;
    top: 0px;
  }
  .likes_icon img{
    width: 16px;
    height: 16px;
  }
  .likes_num{
    font-size: 13px;
  }
  .excerpts_more{
    font-size: 13px;
    color: #3379c6;
    margin-top: 5px;
    width: 120px;
    text-align: left;
    cursor: pointer;
  }

  .review{
    position: relative;
    margin-top: 40px;
    margin-left: 40px;
    width: 660px;
  }
  .review_single{
    width: 585px;
    height: 100px;
    /* margin-top: 15px; */
    margin: 15px 0px;
    position: relative;
    cursor: pointer;
  }
  .review_title{
    font-size: 16px;
    color:#3379c6;
    text-align: left;
    margin-bottom: 10px;
  }
  .review_content{
    font-size: 14px;
    text-align: left;
    /* max-height: 80px; */
    overflow: hidden;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
    /* white-space: nowrap; */
  }
  .review_more{
    font-size: 13px;
    color: #3379c6;
    width: 120px;
    text-align: left;
    cursor: pointer;
    margin-top: 5px;
  }
  .bookrate{
      width: 284px;
      height: 216px;
      top: 0px;
      left: 740px;
      position: absolute;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  .mtitle{
      font-size: 18px;
      position: relative;
      text-align: left;
      margin-left: 30px;
      margin-top: 34px;
  }
  .rate_num{
      position: absolute;
      top: 32px;
      left: 30px;
      font-size: 20px;
      color: #F59A23;
  }
  .rate{
      position: absolute;
      top: 36px;
      left: 85px;
  }
  .xiangdu{
      position: absolute;
      left: 30px;
      top: 76px;
  }
  .zaidu{
      position: absolute;
      left: 30px;
      top: 106px;
  }
  .yidu{
      position: absolute;
      left: 30px;
      top: 136px;
  }

  .relatedbooks{
    position: absolute;
    left: 740px;
    top: 260px;
    height: 800px;
    width: 284px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  .booklist{
    margin-top: 20px;
    margin-left: 30px;
  }
  .book_single{
    height: 140px;
    width: 230px;
    position: relative;
  }
  .related_pic{
    width: 86px;
    height: 120px;
    position: absolute;
    left: 0;
    top:10px;
  }
  .related_title{
    position: absolute;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    width: 62%;
    font-size: 15px;
    color: #3379c6;
    left: 86px;
    top: 10px;
  }
  .related_author{
    position: absolute;
    width: 62%;
    height: 30px;
    font-size: 14px;
    padding-left: 10px;
    padding-right: 10px;
    left: 86px;
    top: 50px;
  }
  .related_rate{
    position: absolute;
    width: 62%;
    height: 30px;
    left: 100px;
    top: 110px;
  }
</style>
