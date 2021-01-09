<template>
  <div id="singleContainer">
    <div class="leftTitle">
      {{ title }}
    </div>
    <div v-if="bookList.length>0" style="margin-left:53px;height:200px;">
      <book-list-thumb
        v-for="book in bookList"
        :key="book.bookId"
        :book-title="book.bookName"
        :book-pic="book.bookPhotoUrl"
        :book-author="book.authorName"
        :book-intro="book.bookIntroduce"
        :book-id="book.bookId"
        class="bookthumb_list"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleBookList',
  props: {
    'title': {
      type: String,
      default: ''
    },
    'bookList': {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data: function() {
    return {
      noBook: {

      }
    }
  },
  created: function() {

  }
}
</script>

<style scoped>
#singleContainer{
  height: 200px;
  width: 100%;
  margin-top: 15px;
}
.leftTitle{
  margin-left: 5px;
  line-height: 200px;
  float: left;
  /* text-align: left; */
}
.bookthumb_list{
  float: left;
  /* margin-left: 35px; */
}
</style>
