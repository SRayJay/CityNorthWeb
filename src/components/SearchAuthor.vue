<template>
  <div class="content">
    <img :src="author.authorPhoto" alt="" class="authorPhoto">
    <div class="container">
      <div class="authorName">{{ author.authorName }}</div>
      <div class="authorCountry">{{ author.authorCountry }}</div>
      <div class="authorBirth">出生年月：{{ author.authorBirth }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchAuthor',
  // props: {
  //   'author': {
  //     type: Object,
  //     default: function() {
  //       return {}
  //     }
  //   }
  // },
  data: function() {
    return {
      author: {
        authorPhoto: require('@assets/gelike.jpg'),
        authorName: '露易丝·格丽克',
        authorCountry: '美国',
        authorBirth: '1943年4月7日'
      }
    }
  }
}
</script>

<style scoped>
.content{
  width: 100%;
  height: 130px;
  margin-bottom: 15px;
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
