<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="userInfoBar">
        <div class="authorName">
          {{ authorInfo.authorName }}
        </div>
        <img :src="authorPic" class="authorPhoto" alt="">
        <div class="info">
          <div class="authorCountry">国籍：{{ authorInfo.authorCountry }}</div>
          <div class="authorBirth">生日：{{ authorInfo.authorBirthday||'暂无' }}</div>
        </div>
      </div>
      <div class="introduceBar">
        <div class="subtitle">作家简介</div>
        <div class="cutline" />
        <div ref="author_text" :class="{author_intro_content:author_haveMore,author_intro_content_all:!author_haveMore}">{{ authorInfo.authorIntroduce }}</div>
        <div v-if="author_haveMore" class="more" @click="getMore_author">--展开--</div>
      </div>
      <div class="bookBar">
        <div class="subtitle">主要作品</div>
        <div class="cutline" />
        <div style="min-height:250px;width:100%;height:auto;">
          <book-list-thumb
            v-for="book in booklist.slice((currentPage-1)*18,currentPage*18)"
            :key="book.bookId"
            :book-title="book.bookName"
            :book-pic="book.bookPhotoUrl"
            :book-author="book.authorName"
            :book-intro="book.bookIntroduce"
            :book-id="book.bookId"
            class="bookthumb_list"
          />
        </div>
        <el-pagination
          background
          page-size="18"
          class="pagination"
          layout="prev, pager, next"
          :current-page.sync="currentPage"
          :total="booklist.length"
          :hide-on-single-page="true"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <footer-line style="display:inline-block;" />
  </div>
</template>

<script>
/*global axios*/
export default {
  name: 'AuthorDetails',
  data: function() {
    return {
      authorInfo: {},
      author_haveMore: false,
      currentPage: 1,
      booklist: []
    }
  },
  computed: {
    authorPic: {
      get() {
        if (this.authorInfo.authorPhoto) {
          return this.$host + this.authorInfo.authorPhoto
        } else {
          return require('@assets/icon/author_nopic.png')
        }
      }
    }
  },
  created: function() {
    const that = this
    axios.post('/api/author/' + this.$route.params.authorid).then(res => {
      that.authorInfo = res.data.author
      that.booklist = that.authorInfo.authorBook
      console.log(that.authorInfo)
      console.log(that.booklist)
    })
  },
  mounted: function() {
    // console.log(this.$refs.content_text.textContent)
    this.$nextTick(() => {
      setTimeout(() => {
        // console.log('高度' + this.$refs.author_text.offsetHeight)
        this.change_author_haveMore()
      }, 100)
    })
  },
  methods: {
    change_author_haveMore: function() {
      if (this.$refs.author_text.offsetHeight > 210) {
        this.author_haveMore = true
        return true
      } else {
        this.author_haveMore = false
        return true
      }
    },
    getMore_author: function() {
      this.author_haveMore = !this.author_haveMore
    //   console.log('高度' + this.$refs.author_text.offsetHeight)
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped>
.wrap{
    position: relative;
    width: 1024px;
    margin: 0 auto;
    padding-bottom: 30px;
    margin-top: 40px;
}
  .more{
    cursor: pointer;
    color: #3379c6;
    font-size: 14px;
    /* margin: 4px; */
    margin-top: 10px;
  }
.userInfoBar{
    /* margin-top: 30px; */
    height: 260px;
}
.authorName{
    font-size: 26px;
    font-weight: 700;
    text-align: left;
}
.authorPhoto{
    /* width: ; */
    /* position: absolute;
    top: 50px;
    left: 0; */
    float: left;
    margin-top: 20px;
    /* text-align: left; */
    max-height: 180px;
}
.info{
    float: left;
    margin-left: 30px;
    margin-top: 20px;
}
.authorCountry{
    /* position: absolute;
    left: ; */
    /* display: inline-block; */
    text-align: left;
    margin-bottom: 10px;
    /* float: left; */
}
.authorBirth{
    text-align: left;
    margin-bottom: 10px;
}
.introduceBar{
    /* height: 300px; */
    margin-bottom: 30px;
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
    width: 1024px;
    font-size: 14px;
    margin-top: 15px;
    text-align: left;
    text-indent: 2em;
    line-height: 1.5;
}
.bookBar{

}
.bookthumb_list{
  float: left;
  margin: 25px 30px!important;
}
.pagination{
    display: inline-block;
    width: 100%;
}
</style>
