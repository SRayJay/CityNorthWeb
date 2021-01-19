<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="title">上海译文专栏</div>
      <!-- <el-divider /> -->
      <div class="content">
        <div v-if="loading" v-loading="loading" class="loading" />
        <div v-else>
          <div style="min-height:860px;">
            <book-thumb
              v-for="book in booklist.slice((currentPage-1)*15,currentPage*15)"
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
            class="pagination"
            page-size="15"
            layout="prev, pager, next"
            :current-page.sync="currentPage"
            :total="booklist.length||0"
            :hide-on-single-page="true"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <footer-line />
  </div>
</template>

<script>
/*global axios */
export default {
  name: 'YiwenColumn',
  data: function() {
    return {
      booklist: [],
      loading: false,
      currentPage: 1
    }
  },
  created: function() {
    const that = this
    this.loading = true
    axios.post('/api/special/2').then(res => {
      console.log(res)
      that.booklist = res.data.books
      that.loading = false
    })
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      window.scrollTo(0, 0)
    }
  }

}
</script>

<style scoped>
.wrap{
    /* margin-top: 40px; */
    position: relative;
    width: 1024px;
    margin: 40px auto 0;
    min-height: 800px;
    padding-bottom: 40px;
}
.title{
    font-size: 20px;
    color: #333;
    text-align: left;
    font-weight: 700;
    font-family: 'PingFang SC Bold', 'PingFang SC Regular', 'PingFang SC', sans-serif;
}
.bookthumb_list{
  position: absolute;
  float: left;
  left: 37px;
  top: 40px;
}
.loading{
  font-size: 20px;
  color:#333;
  position: absolute;
  left:50%;
  top:20%;
  transform: translate(-50%,-50%);
}
.pagination{
    display: inline-block;
    width: 100%;
    margin-top: 30px;
}
.content{
    /* margin-left: 30px; */
    /* float: left; */
    margin-top: 20px;
    width: 1024px;
    position:relative;
    height: 950px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
}
</style>
