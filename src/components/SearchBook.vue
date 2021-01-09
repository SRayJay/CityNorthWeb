<template>
  <div class="content" @click="toBookDetails()">
    <img :src="$host+book.bookPhotoUrl" class="bookPhoto" alt="">
    <div class="container">
      <div class="bookName">{{ book.bookName }}</div>
      <el-rate
        v-model="halfrate"
        class="rate"
        disabled
        :max="5"
        text-color="#ff9900"
      />
      <div class="rate_num">{{ book.bookScore.toFixed(1) }}</div>
      <div class="bookInfo">{{ '['+book.authorCountry+']'+book.authorName+' / '+book.bookTranslator+' / '+book.publisherName }}</div>
    </div>
    <div class="divivder" />
  </div>
</template>

<script>
export default {
  name: 'SearchBook',
  props: {
    book: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    return {
    }
  },
  computed: {
    halfrate: {
      get() {
        return (this.book.bookScore) / 2
      },
      set() {

      }
    }
  },
  methods: {
    toBookDetails: function() {
      this.$emit('toBookDetails')
    }
  }
}
</script>

<style scoped>
.content{
  margin-top: 20px;
  height: 140px;
}
.bookPhoto{
    width: 86px;
    height: 120px;
    float: left;
}
.bookName{
    color: #3379cc;
    font-size: 16px;
    text-align: left;
}
.container{
    margin-left: 20px;
    position: relative;
    float: left;
    max-width: 300px;
}
.rate{
    margin-top: 20px;
    text-align: left;
}
.rate_num{
    font-size: 18px;
    margin-top: 10px;
    margin-left: 3px;
    text-align: left;
    color: #F59A23;
}
.bookInfo{
    text-align: left;
    font-size: 14px;
    margin-top: 15px;
}
.divivder{
    position: relative;
    height: 1px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    float: left;
    width: 400px;
    margin-top: 20px;
}
</style>
