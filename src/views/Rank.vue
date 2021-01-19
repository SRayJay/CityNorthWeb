<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="mtitle">热门书籍榜</div>
      <el-divider />
      <div v-loading="loading" class="rankBar">
        <div v-for="(item,index) in ranklist.slice((currentPage-1)*25,currentPage*25)" :key="item.bookId">

          <rank-book
            :book="item"
            :rank-number="index+1"
            class="single"
            @toBookDetails="toBookDetails(item.bookId)"
            @toAuthorDetails="toAuthorDetails(item.authorId)"
          />

        </div>
        <el-pagination
          background
          page-size="25"
          class="pagination"
          layout="prev, pager, next"
          :current-page.sync="currentPage"
          :total="ranklist.length"
          :hide-on-single-page="true"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <footer-line class="footer" />
  </div>
</template>

<script>
/*global axios */
export default {
  name: 'Rank',
  data: function() {
    return {
      ranklist: [],
      currentPage: 1,
      loading: false
    }
  },
  created: function() {
    const that = this
    this.loading = true
    axios.post('/api/rank').then(res => {
      // console.log(res)
      that.ranklist = res.data.books
      // console.log(that.ranklist[0])
      // console.log(that.ranklist[101])
      // console.log(that.ranklist.length)
      this.loading = false
    })
  },
  methods: {
    toBookDetails: function(bookid) {
      this.$router.push({ name: 'book', params: { bookid: bookid }})
    },
    toAuthorDetails: function(authorid) {
      this.$router.push({ name: 'author', params: { authorid: authorid }})
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
  padding-bottom: 30px;
}
.footer{
  display: inline-block;
  width: 100%;
}
.mtitle{
  color: #0a7101;
    text-align: left;
    font-size: 20px;
    /* margin-top: 40px; */
}
 .single{
    /* margin-left: 40px; */
    margin-top: 20px;
    height: 140px;
    /* cursor:pointer; */
    /* height: 100%; */
  }
  .rankBar{
    min-height: 800px;
  }
  .pagination{
    margin-top: 30px;
    display: inline-block;
    width: 100%;
    height: 32px;
}
</style>
