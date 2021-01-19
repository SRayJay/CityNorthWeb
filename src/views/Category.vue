<template>
  <div>
    <Header />
    <div class="wrap">

      <el-collapse v-model="activeName" class="leftBar" accordion @change="handleChange">
        <el-collapse-item title="中国文学" name="1" class="title">
          <div v-for="(item,index) in select.中国文学" :key="index" :class="{focus:index===chosen}" class="single" @click="choose(item,index,0)">{{ item }}</div>
        </el-collapse-item>
        <el-collapse-item title="日本文学" name="2" class="title">
          <div v-for="(item,index) in select.日本文学" :key="index" :class="{focus:index===chosen}" class="single" @click="choose(item,index,1)">{{ item }}</div>
        </el-collapse-item>
        <el-collapse-item title="欧美文学" name="3" class="title">
          <div v-for="(item,index) in select.欧美文学" :key="index" :class="{focus:index===chosen}" class="single" @click="choose(item,index,2)">{{ item }}</div>
        </el-collapse-item>
        <el-collapse-item title="拉美文学" name="4" class="title">
          <div v-for="(item,index) in select.拉美文学" :key="index" :class="{focus:index===chosen}" class="single" @click="choose(item,index,3)">{{ item }}</div>
        </el-collapse-item>
      </el-collapse>

      <div class="rightBar">
        <div v-if="loading" v-loading="loading" class="loading" />
        <div v-else>
          <div v-if="booklist.length===0" style="margin-top:40px;">暂无书籍</div>
          <div v-else>
            <div style="min-height:860px;">
              <book-thumb
                v-for="book in booklist.slice((currentPage-1)*12,currentPage*12)"
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
              page-size="12"
              layout="prev, pager, next"
              :current-page.sync="currentPage"
              :total="booklist.length||0"
              :hide-on-single-page="true"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
    <footer-line />
  </div>
</template>

<script>
/*global axios */
export default {
  name: 'Category',
  data: function() {
    return {
      activeName: '1',
      bookLabel: this.$route.query.label || '中国文学',
      bookCategory: this.$route.query.category || '小说',
      loading: false,
      chosen: 0,
      currentPage: 1,
      select: {
        '中国文学': ['小说', '随笔', '诗歌', '社科', '散文', '传记', '人文'],
        '日本文学': ['小说', '随笔', '诗歌', '社科', '散文', '传记', '人文'],
        '欧美文学': ['小说', '随笔', '诗歌', '社科', '散文', '传记', '人文'],
        '拉美文学': ['小说', '随笔', '诗歌', '社科', '散文', '传记', '人文']
      },
      booklist: [],
      category: ['小说', '随笔', '诗歌', '社科', '散文', '传记', '人文'],
      label: ['中国文学', '日本文学', '欧美文学', '拉美文学']
    }
  },

  created: function() {
    if (this.$route.query.category) {
      this.chosen = this.category.findIndex(i => i === this.$route.query.category)
    } else {
      this.chosen = 0
    }
    if (this.$route.query.label) {
      this.activeName = (this.label.findIndex(i => i === this.$route.query.label) + 1).toString()
    } else {
      this.activeName = '1'
    }
    const that = this
    const fd = new FormData()
    if (this.$route.query.label && this.$route.query.category) {
      fd.append('bookLabel', this.$route.query.label)
      fd.append('bookCategory', this.$route.query.category)
    } else {
      fd.append('bookLabel', '中国文学')
      fd.append('bookCategory', '小说')
    }
    this.loading = true
    axios.post('/api/category', fd).then(res => {
      console.log(res)
      that.booklist = res.data.books
      that.loading = false
    })
  },
  methods: {
    choose(item, index, label) {
      this.chosen = index
      this.bookLabel = this.label[label]
      this.bookCategory = item
      const that = this
      const fd = new FormData()
      fd.append('bookLabel', this.bookLabel)
      fd.append('bookCategory', item)
      this.loading = true
      axios.post('/api/category', fd).then(res => {
        that.booklist = res.data.books
        that.loading = false
        that.handleCurrentChange(1)
      })
    },
    handleChange(val) {
      this.bookLabel = this.label[parseInt(val) - 1]
      console.log(this.bookLabel)
      console.log(this.bookCategory)
      const that = this
      const fd = new FormData()
      fd.append('bookLabel', this.bookLabel)
      fd.append('bookCategory', this.bookCategory)
      this.loading = true
      axios.post('/api/category', fd).then(res => {
        that.booklist = res.data.books
        that.loading = false
        that.handleCurrentChange(1)
      })
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
    margin-bottom: 30px;
    margin-top: 40px;
    height: 950px;
}
.leftBar{
    width: 228px;
    height: 950px;
    float: left;
     /* font-size: 16px; */
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
}
::v-deep .el-collapse-item__header{
  font-size: 16px;
  font-weight: 700;
  font-family: 'PingFang SC Bold', 'PingFang SC Regular', 'PingFang SC', sans-serif;
  /* color: #fff; */
  text-indent: 1em;
}
::v-deep .el-collapse-item__content{
  padding: 0;
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
/* .title{
 font-size: 16px;
} */
.rightBar{
    margin-left: 30px;
    float: left;
    width: 765px;
    position:relative;
    height: 950px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
}
.single{
  text-align: left;
  font-size: 15px;
  text-indent: 2em;
  line-height: 40px;
  height: 40px;
  cursor: pointer;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.focus{
  color: #3379cc;
  background:#f2f2f2;
}
.pagination{
    display: inline-block;
    width: 100%;
    margin-top: 30px;
}
</style>
