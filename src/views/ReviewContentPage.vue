<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="title">{{ reviewTitle }}</div>
      <div class="userInfoBar">
        <img :src="this.$host+user.userPhoto" alt="" class="userAvatar" @click="toUser(user.userId)">
        <div class="userName" @click="toUser(user.userId)">{{ user.userName }}</div>
        <div class="userLabel">{{ user.userSelfLable }}</div>
        <div class="bookName" @click="toBook(book.bookId)">{{ book.bookName }}</div>
        <div class="reviewTime">{{ reviewTime }}</div>
      </div>
      <div class="bookInfoContainer">
        <div ref="bookInfoBar" class="bookInfoBar" :class="bookInfoBarFixed == true ? 'isFixed' :''">
          <book-thumb
            :book-title="book.bookName"
            :book-pic="book.bookPhotoUrl"
            :book-author="book.authorName"
            :book-intro="book.bookIntroduce"
            :book-id="book.bookId"
          />
        </div>
      </div>
      <div class="reviewContent">
        <div v-html="reviewContent" />
      </div>
    </div>
    <footer-line />
  </div>
</template>

<script>
import { getReviewContent } from '@/api/book.js'
export default {
  name: 'ReviewContentPage',
  data: function() {
    return {
      reviewTitle: '',
      book: {},
      user: '',
      reviewTime: '',
      reviewContent: '',
      bookInfoBarFixed: false,
      authorName: '',
      reviewid: this.$route.params.reviewid,
      default_avatar: require('@assets/avatar.jpg')
    }
  },
  created() {
    new Promise((resolve, reject) => {
      getReviewContent(this.reviewid).then((response) => {
        const { data } = response
        console.log(data)
        this.reviewTitle = data.review.reviewTitle
        this.reviewContent = data.review.reviewContent
        this.reviewTime = data.review.reviewTime
        this.book = data.book
        this.user = data.user
      }).catch(error => {
        reject(error)
      })
    })
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll: function() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var offsetTop = 240
      // console.log(scrollTop)
      if (scrollTop > offsetTop) {
        this.bookInfoBarFixed = true
      } else {
        this.bookInfoBarFixed = false
      }
    },
    toUser: function(userid) {
      this.$router.push({ name: 'Space', params: { userid: userid }})
    },
    toBook: function(bookid) {
      this.$router.push({ name: 'book', params: { bookid: bookid }})
    }

  }
}
</script>

<style scoped>
.wrap{
  width:1024px;
  margin:0 auto;
  position:relative;
  /* min-height: 2000px; */
  padding-bottom: 30px;
}
.title{
  margin-top: 60px;
  text-align: left;
  font-size: 32px;
  font-weight: 700;
}
.userInfoBar{
  margin-top: 25px;
  position: relative;
  height: 45px;
}
.userAvatar{
  width: 45px;
  height: 45px;
  border-radius: 100%;
  position: absolute;
  left: 0px;
  cursor: pointer;
}
.userName{
  position:absolute;
  left: 60px;
  top:5px;
  font-size: 14px;
  cursor: pointer;
}
.userLabel{
  color:#7f7f7f;
  font-size: 13px;
  position: absolute;
  left:60px;
  top: 30px;
}
.bookName{
  position:absolute;
  left: 250px;
  top: 5px;
  font-size: 14px;
  color: #3379c6;
  cursor: pointer;
}
.reviewTime{
  position:absolute;
  left: 250px;
  top:30px;
  font-size: 14px;
  color: #7f7f7f;
}
.reviewContent{
  margin-top: 30px;
  width: 730px;
}
.bookInfoContainer{
  position: absolute;
  /* top: 200px; */
  left: 850px;
}
.bookInfoBar{
  height: 328px;
  width: 131px;
}
.bookPhoto{
  width: 110px;
  height: 150px;

}
.isFixed{
    position:fixed;
    background-color:#Fff;
    top:0;
    z-index:999;
}
</style>
