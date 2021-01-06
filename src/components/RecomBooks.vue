<template>
  <div class="content">
    <div class="title">推荐书籍</div>
    <div class="subtitle">搜罗好书，只为有趣的灵魂</div>
    <!-- <btn-more class="btnmore" /> -->
    <book-thumb
      v-for="book in recommendBook"
      :key="book.bookId"
      :book-title="book.bookName"
      :book-pic="book.bookPhotoUrl"
      :book-author="book.authorName"
      :book-intro="book.bookIntroduce"
      :book-id="book.bookId"
      class="bookthumb_list"
    />

  </div>
</template>
<script>
export default {
  name: 'RecomBooks',
  props: {
    'recommendBook': {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data: function() {
    return {
      books: this.recommendBook
    }
  }
}
</script>

<style scoped>
    .content{
        position: relative;
        width: 1024px;
        margin: 80px auto;
        border: none;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        height: 750px;
        /* border: 1px solid red; */
    }
    .title{
        font-size: 30px;
        font-weight: 700;
        color: #333333;
        padding-top: 25px;
        font-family: PingFang SC Bold, PingFang SC Regular, PingFang SC, sans-serif;
        font-style: normal;
    }
    .subtitle{
        padding-top: 12px;
        font-size: 14px;
        color: #797979;
    }
    /* .btnmore{
        float: right;
        position: absolute;
        top: 25px;
        right: 40px;
    } */
    .bookthumb_list{
        position: absolute;
        float: left;
        left: 37px;
        top: 40px;
    }
</style>
