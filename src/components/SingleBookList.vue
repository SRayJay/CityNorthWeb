<template>
  <div id="singleContainer">
    <div class="leftTitle">
      {{ title }}
    </div>
    <div v-if="bookList.length>0" style="margin-left:53px;height:200px;">
      <book-list-thumb
        v-for="book in bookList.slice(0,5)"
        :key="book.bookId"
        :book-title="book.bookName"
        :book-pic="book.bookPhotoUrl"
        :book-author="book.authorName"
        :book-intro="book.bookIntroduce"
        :book-id="book.bookId"
        class="bookthumb_list"
      />
      <book-list-thumb
        v-if="bookList.length>5"
        :key="bookList[5].bookId"
        shade-book="true"
        :book-title="bookList[5].bookName"
        :book-pic="bookList[5].bookPhotoUrl"
        :book-author="bookList[5].authorName"
        :book-intro="bookList[5].bookIntroduce"
        :book-id="bookList[5].bookId"
        class="bookthumb_list shadeBook"
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
}
.bookthumb_list{
  float: left;

}
.shadeBook{
  opacity: 0.48;
}
.overPic{
  z-index: 999;
}
</style>
