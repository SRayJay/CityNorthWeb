<template>
  <div class="content">
    <div class="rankNumber">{{ rankNumber }}</div>
    <img :src="$host+book.bookPhotoUrl" class="bookPhoto" alt="" @click="toBookDetails">
    <div class="scontainer">
      <div class="bookName" @click="toBookDetails">{{ book.bookName }}</div>
      <el-rate
        v-model="halfrate"
        class="rate"
        disabled
        :max="5"
        text-color="#ff9900"
      />
      <div class="rate_num">{{ book.bookScore.toFixed(1) }}</div>
      <div class="bookInfo" @click="toAuthorDetails()">{{ '['+book.authorCountry+']'+book.authorName+' / '+book.bookTranslator+' / '+book.publisherName }}</div>
    </div>
    <div class="divivder" />
  </div>
</template>

<script>
export default {
  name: 'RankBook',
  props: {
    book: {
      type: Object,
      default: function() {
        return {}
      }
    },
    rankNumber: {
      type: Number,
      default: 0
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
    },
    toAuthorDetails: function() {
      this.$emit('toAuthorDetails')
    }
  }
}
</script>

<style scoped>
.content{
    width: 100%;
  margin-top: 20px;
  height: 140px;
}
.rankNumber{
    width:36px;
    height: 36px;
    background: #7f7f7f;
    border-radius: 100%;
    color: #fff;
    font-size: 18px;
    /* font-weight: 700; */
    text-align: center;
    font-family: 'PingFang SC Bold', 'PingFang SC Regular', 'PingFang SC', sans-serif;
    line-height: 36px;
    float: left;
    margin-right: 15px;
}
.bookPhoto{
    width: 86px;
    height: 120px;
    float: left;
    cursor: pointer;
}
.bookName{
    color: #3379cc;
    font-size: 16px;
    text-align: left;
    cursor: pointer;
}
.scontainer{
    width: 800px;
    margin-left: 20px;
    position: relative;
    float: left;
    /* max-width: 300px; */
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
    /* text-align: left; */
    float: left;
    font-size: 14px;
    margin-top: 15px;
    min-width: 100px;
    /* display: inline-block; */
    cursor: pointer;
}
.divivder{
    position: relative;
    height: 1px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    float: left;
    width: 800px;
    margin-top: 20px;
}
</style>
