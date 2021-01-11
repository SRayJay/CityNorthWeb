<template>
  <div class="content" @click="toAuthorDetails">
    <img :src="authorPic" alt="" class="authorPhoto">
    <div class="container">
      <div class="authorName">{{ author.authorName }}</div>
      <div class="authorCountry">{{ author.authorCountry }}</div>
      <div class="authorBirth">出生年月：{{ author.authorBirthday }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchAuthor',
  props: {
    'author': {
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
    authorPic: {
      get() {
        if (this.author.authorPhoto) {
          return this.$host + this.author.authorPhoto
        } else {
          return require('@assets/icon/author_nopic.png')
        }
      }
    }
  },
  methods: {
    toAuthorDetails: function() {
      this.$emit('toAuthorDetails')
    }
  }
}
</script>

<style scoped>
.content{
  transition: all 0.4s;
  width: 100%;
  height: 120px;
  margin-bottom: 15px;
}
.content:hover{
  background: #eee;
  opacity: 0.6;
}

.authorPhoto{
  max-width: 120px;
  max-height: 120px;
  float: left;
}
.container{
  position: relative;
  margin-left: 20px;
  float: left;
}
.authorName{
  text-align: left;
  /* float: left; */
  font-size: 16px;
  color: #3379cc;
  /* margin-left: 20px; */
}
.authorCountry{
  /* float: left; */
  text-align: left;
  margin-top: 60px;
  font-size: 14px;
}
.authorBirth{
  font-size: 14px;
  margin-top: 10px;
}
</style>
