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
      <img v-if="!notBook" :src="this.$host+bookPic" alt="" class="pic">

      <div class="bookname">{{ bookTitle }}</div>
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
    },
    'notBook': {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
    }
  },
  methods: {
    toBookDetails() {
      if (!this.notBook) {
        this.$router.push({ name: 'book', params: { bookid: this.bookId }})
      }

      // this.$router.push('/BookDetails/1')
    }
  }
}
</script>

<style scoped>
    #bookthumb{
        width: 100px;
        /* height: 260px; */
        position: relative;
        margin: 8px 25px;
        cursor: pointer;
    }
    .book_card{
      /* border: 1px solid red; */
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }
    .pic{
        width: 100px;
        height: 148px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border: none;
    }
    /* .noPic{
        background: #fff;
        width: 100px;
        height: 148px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    } */
    .bookname{
        color: #009Af9;
        overflow: hidden;
        white-space: nowrap;
        font-size: 13px;
        text-overflow: ellipsis;
        padding-top: 8px;
        padding-bottom: 5px;
        padding-left: 5px;
        padding-right: 5px;
    }
    /* .author{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 13px;
        padding-bottom: 8px;
        padding-left: 8px;
        padding-right: 8px;
    } */
    .popper{
        height: 400px;
        /* font-size: 20px; */
    }

</style>
