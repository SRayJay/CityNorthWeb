<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="mtitle">{{ userName }}的书单</div>
      <el-divider />
      <el-tabs style="min-height:800px;" type="border-card">
        <el-tab-pane label="想读" style="overflow: auto;height:auto;">
          <div style="min-height:684px;">
            <book-list-thumb
              v-for="book in wantBooks.slice((currentPageW-1)*18,currentPageW*18)"
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
            :current-page.sync="currentPageW"
            :total="wantBooks.length"
            :hide-on-single-page="true"
            @current-change="handleCurrentChangeW"
          />
        </el-tab-pane>
        <el-tab-pane label="在读">
          <book-list-thumb
            v-for="book in readingBooks.slice((currentPageI-1)*18,currentPageI*18)"
            :key="book.bookId"
            :book-title="book.bookName"
            :book-pic="book.bookPhotoUrl"
            :book-author="book.authorName"
            :book-intro="book.bookIntroduce"
            :book-id="book.bookId"
            class="bookthumb_list"
          />
          <el-pagination
            background
            page-size="18"
            class="pagination"
            layout="prev, pager, next"
            :current-page.sync="currentPageI"
            :total="readingBooks.length"
            :hide-on-single-page="true"
            @current-change="handleCurrentChangeI"
          />
        </el-tab-pane>
        <el-tab-pane label="已读">
          <book-list-thumb
            v-for="book in haveReadBooks.slice((currentPageH-1)*18,currentPageH*18)"
            :key="book.bookId"
            :book-title="book.bookName"
            :book-pic="book.bookPhotoUrl"
            :book-author="book.authorName"
            :book-intro="book.bookIntroduce"
            :book-id="book.bookId"
            class="bookthumb_list"
          />
          <el-pagination
            background
            page-size="18"
            class="pagination"
            layout="prev, pager, next"
            :current-page.sync="currentPageH"
            :total="haveReadBooks.length"
            :hide-on-single-page="true"
            @current-change="handleCurrentChangeH"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <footer-line />
  </div>
</template>

<script>
export default {
  name: 'SpaceBookLists',
  data: function() {
    return {
      userName: this.$route.query.userName,
      wantBooks: [],
      readingBooks: [],
      haveReadBooks: [],
      currentPageW: 1,
      currentPageI: 1,
      currentPageH: 1
    }
  },
  created: function() {
    const that = this
    /*global axios */
    axios.post('/api/user/want/' + this.$route.params.userid).then((res) => {
      console.log(res)
      that.wantBooks = res.data.books
    })
    axios.post('/api/user/reading/' + this.$route.params.userid).then(res => {
      console.log(res)
      that.readingBooks = res.data.books
    })
    axios.post('/api/user/haveread/' + this.$route.params.userid).then(res => {
      console.log(res)
      that.haveReadBooks = res.data.books
    })
  },
  methods: {
    handleCurrentChangeW: function(currentPageW) {
      this.currentPageW = currentPageW
      window.scrollTo(0, 0)
    },
    handleCurrentChangeI: function(currentPageI) {
      this.currentPageI = currentPageI
      window.scrollTo(0, 0)
    },
    handleCurrentChangeH: function(currentPageH) {
      this.currentPageH = currentPageH
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
}
.mtitle{
    color: #0a7101;
    text-align: left;
    font-size: 20px;
    margin-top: 40px;
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
