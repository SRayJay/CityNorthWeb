<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="bookBar">
        <div v-if="!nobook">
          <div class="bookPhoto">
            <img :src="$host+bookInfo.bookPhotoUrl" alt="">
          </div>
          <div class="bookName">{{ bookInfo.bookName }}</div>
          <button v-if="!this.$route.query.bookInfo" class="reselectBtn" @click="reselect">重选</button>
          <div class="bookAuthor">{{ '['+bookInfo.authorCountry+']'+bookInfo.authorName }}</div>
          <div class="publisherAndProducer">{{ bookInfo.producerName }}·{{ bookInfo.publisherName }}</div>
          <div class="bookrate">
            <el-rate :value="bookInfo.bookScore/2" disabled />
          </div>
          <div class="rate_num">{{ bookInfo.bookScore.toFixed(1) }}</div>
        </div>
        <div v-else>
          <div class="bookPhoto" @click="selectBook">
            <img src="@assets/icon/no_book.png" alt="">
          </div>
          <div class="bookName">从书单中挑选一门书吧</div>
          <button v-if="!nobook" class="reselectBtn" @click="reselect">重选</button>

        </div>
        <el-dialog
          title="选择书籍"
          :visible.sync="selectDialogVisible"
          width="30%"
        >
          <span style="float:left;margin-bottom:10px;font-size:16px;">我已读的书单:</span>
          <el-table
            v-loading="selectLoading"
            max-height="300"
            :data="booklist"
            stripe
            border
            style="width: 100%;margin-bottom:10px;"
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column
              prop="bookName"
              label="书名"
              width="180"
            />
            <el-table-column
              prop="authorName"
              label="作者"
              width="180"
            />
            <el-table-column
              prop="publisherName"
              label="出版社"
            />
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="selectDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="selectone">选 择</el-button>
          </span>
        </el-dialog>
      </div>

      <div>
        <div v-if="!nobook" class="nextBar">
          <div class="text">给个评价吧</div>
          <div class="rateBar">
            <el-rate v-model="gaveRate" allow-half class="rate" />
          </div>
          <div class="btnPublish">
            <button class="publish" @click="publish">发表</button>
          </div>
          <el-dialog
            title="提示"
            :visible.sync="showSubmitDaialog"
            width="20%"
          >
            <span>确认发表书评吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="showSubmitDaialog = false">取 消</el-button>
              <el-button type="primary" @click="postReview">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="title">
          <input v-model="reviewTitle" maxlength="20" type="text" class="title_input" placeholder="添加标题">
          <div class="cutline" />
        </div>
        <div class="editor">
          <div ref="toolbar" class="toolbar" />
          <div ref="editor" class="edittext" />
        </div>
      </div>
    </div>
    <!-- <button style="width:100px;height:100px;" @click="getContent">get</button> -->
    <footer-line />
  </div>
</template>

<script>
import E from 'wangeditor'
// import axios from 'axios'
/*global axios */
// import { publishReview } from '@/api/write.js'
import xss from 'xss'
export default {
  name: 'ReviewEditPage',
  data: function() {
    return {
      showSubmitDaialog: false,
      bookInfo: {},
      nobook: true,
      gaveRate: 0,
      reviewTitle: '',
      editor: null,
      info_: null,
      selectLoading: false,
      selectDialogVisible: false,
      booklist: [],
      currentRow: {}
    }
  },

  created() {
    if (this.$route.query.bookInfo) {
      this.nobook = false
      this.bookInfo = JSON.parse(this.$route.query.bookInfo)
    } else {
      this.nobook = true
      this.bookInfo = {}
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.seteditor()
      this.editor.txt.html(this.value)
    })
  },
  methods: {
    publish() {
      // 先验证
      // 再发送api请求
      var initText = this.editor.txt.text()
      var afterText1 = initText.replace(/&nbsp;/g, '')
      var afterText2 = afterText1.replace(/&amp;/g, '&')

      if (afterText2.length < 200) {
        this.$message({
          message: '书评字数不可少于200',
          type: 'warning'
        })
      } else if (afterText2.length > 20000) {
        this.$message({
          message: '书评字数不可超过20000',
          type: 'warning'
        })
      } else if (this.gaveRate === 0) {
        this.$message({
          message: '请给书籍打分',
          type: 'warning'
        })
      } else if (this.reviewTitle.length === 0) {
        this.$message({
          message: '请输入书评标题',
          type: 'warning'
        })
      } else {
        this.showSubmitDaialog = true
      }
    },
    selectBook() {
      const that = this
      this.selectDialogVisible = true
      this.selectLoading = true
      axios.post('/api/user/haveread/' + this.$store.state.user.userInfo.userId).then(res => {
        console.log(res)
        that.booklist = res.data.books
        that.selectLoading = false
      })
    },
    reselect() {
      this.selectDialogVisible = true
    },
    selectone() {
      console.log(111)
      this.bookInfo = this.currentRow
      console.log(this.bookInfo)
      this.selectDialogVisible = false
      this.nobook = false
    },
    handleCurrentChange(val) {
      this.currentRow = val
      console.log(this.currentRow)
    },
    postReview() {
      this.showSubmitDaialog = false

      const fd = new FormData()
      fd.append('userId', this.$store.state.user.userInfo.userId)
      fd.append('bookId', this.bookInfo.bookId)
      fd.append('reviewContent', this.editor.txt.html())
      fd.append('reviewTime', this.getNowTime())
      fd.append('reviewText', xss(this.editor.txt.text()))
      fd.append('reviewTitle', this.reviewTitle)
      fd.append('gaveScore', this.gaveRate * 2)
      axios.post(
        '/api/write/review', fd, { headers: { 'token': this.$store.state.user.token }}
      ).then((res) => {
        console.log(res)
        this.$message({
          message: '成功',
          type: 'success'
        })
        this.$router.push({ name: 'ReviewContentPage', params: { reviewid: res.data.reviewId }})
      }).catch((error) => {
        console.log(error)
      })
    },
    seteditor() {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      this.editor.config.placeholder = '写书评...'
      this.editor.config.focus = false
      this.editor.config.pasteFilterStyle = false
      this.editor.config.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'indent', // 缩进
        'link', // 插入链接
        'justify', // 对齐方式
        'quote', // 引用
        'splitLine',
        'undo', // 撤销
        'redo' // 重复
      ]
      this.editor.create()
    }
  }

}

</script>

<style scoped>
.wrap{
    width:750px;
    margin: 0 auto;
    margin-top: 30px;

}
.bookBar{
    height: 150px;
    background: #f2f2f2;
    position: relative;
}
.nextBar{
    height: 30px;
    margin-top: 30px;
    position: relative;
    line-height: 30px;
}
.text{
    text-align: left;
    float: left;
    font-size: 14px;
}
.rateBar{
    float: left;
    margin-left: 30px;
    line-height: 30px;
}
.rate{
    line-height: 30px;
    margin-top: 6px;
}
.btnPublish{
    float: right;
}
.publish{
    height: 30px;
    width: 83px;
    background: rgba(51, 121, 204, 1);
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 14px;
}
.bookPhoto{
    width: 86px;
    height: 120px;
    position: absolute;
    left: 20px;
    top: 15px;
    cursor: pointer;
    border-radius: 10px;
    /* background: url('../assets/icon/no_book.png'); */

}
.bookPhoto img{
    background-size: 100% 100%;
    width: 86px;
    height:120px;
    border-radius: 10px;
    -moz-background-size:100% 100%;
}
.bookName{
    color: #3379c6;
    position: absolute;
    left:140px;
    font-size: 18px;
    top:15px
}
.bookAuthor{
    font-size: 14px;
    left:140px;
    top: 50px;
    position: absolute;
}
.publisherAndProducer{
    position: absolute;
    left: 140px;
    top: 80px;
    font-size: 14px;
}
.bookrate{
    position: absolute;
    left: 140px;
    top: 115px;
    font-size: 18px;
}
.rate_num{
    position: absolute;
    left: 270px;
    top: 115px;
    font-size: 20px;
    color: #F59A23;
}
.reselectBtn{
  position: absolute;
  right: 20px;
  top: 15px;
  height: 30px;
  width: 83px;
  background: #555;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

.title{
  text-align: left;
  width: 750px;
  margin: 20px auto;

}
.title_input{
  height: 32px;
  line-height: 32px;
  border:none;
  font-size: 18px;
  width: 500px;
  outline: none;
}
.cutline{
    width: 750px;
    height: 1px;
    background: #ccc;
    margin-top: 20px;
}
.editor {
  width: 750px;
  margin: 0 auto;
  position: relative;
  z-index: 0;
  margin-bottom: 40px;
}
.edittext {
  /* border: 1px solid #ccc; */
  min-height: 500px;
}
</style>
