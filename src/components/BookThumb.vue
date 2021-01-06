<template>
  <el-popover
    id="bookthumb"
    placement="right"
    :title="bookTitle"
    width="200"
    popper-class="popper"
    :close-delay="0"
    trigger="hover"
    :content="bookIntro"
  >

    <div slot="reference" class="book_card" @click="toBookDetails">
      <img :src="this.$host+bookPic" alt="" class="pic">
      <div class="bookname">{{ bookTitle }}</div>
      <div class="author">{{ bookAuthor }}</div>
    </div>
  </el-popover>
</template>
<script>
export default {
  name: 'BookThumb',
  props: {
    'bookTitle': {
      type: String,
      default: ''
    },
    'bookPic': {
      type: String,
      default: ''
    },
    'bookAuthor': {
      type: String,
      default: ''
    },
    'bookIntro': {
      type: String,
      default: ''
    },
    'bookId': {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {

    }
  },
  methods: {
    toBookDetails() {
      this.$router.push({ name: 'book', params: { bookid: this.bookId }})
      // this.$router.push('/BookDetails/1')
    }
  }
}
</script>

<style scoped>
    #bookthumb{
        width: 131px;
        /* height: 260px; */
        position: relative;
        margin: 20px 25px;
        cursor: pointer;
    }
    .book_card{
      /* border: 1px solid red; */
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }
    .pic{
        width: 131px;
        height: 180px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .bookname{
        color: #009Af9;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-top: 8px;
        padding-bottom: 5px;
        padding-left: 5px;
        padding-right: 5px;
    }
    .author{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 13px;
        padding-bottom: 8px;
        padding-left: 8px;
        padding-right: 8px;
        /* text-indent: 0.5em; */
    }
    .popper{
        height: 400px;
        /* font-size: 20px; */
    }

</style>
