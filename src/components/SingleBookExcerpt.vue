<template>
  <div>
    <div class="userBar">
      <img :src="$host+userPhoto" class="userPhoto" alt="">
      <div class="userName">{{ userName }}</div>
    </div>
    <div
      ref="content_text"
      class="excerptText"
      :class="{excerptContent_all:!content_haveMore,excerptContent:content_haveMore}"
      v-html="'“'+excerptInfo.excerptsContent+'”'"
    />
    <div v-if="content_haveMore" class="more" @click="getMore">--展开--</div>
  </div>
</template>

<script>
export default {
  name: 'SingleBookExcerpt',
  props: {
    'excerptInfo': {
      type: Object,
      default: function() {
        return {}
      }
    },
    'userPhoto': {
      type: String,
      default: function() {
        return ''
      }
    },
    'userName': {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data: function() {
    return {
      content_haveMore: false
    }
  },
  created() {
    console.log(this.excerptInfo)
  },
  mounted: function() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.change_content_haveMore()
      }, 100)
    })
  },
  methods: {
    change_content_haveMore: function() {
      if (this.$refs.content_text.offsetHeight > 125) {
        this.content_haveMore = true
        return true
      } else {
        this.content_haveMore = false
        return true
      }
    },
    getMore: function() {
      this.content_haveMore = !this.content_haveMore
    }
  }
}
</script>

<style scoped>
.userBar{
    height: 32px;
    text-align: left;
}
.userPhoto{
    width: 32px;
    height: 32px;
    float: left;
}
.more{
    cursor: pointer;
    color: #3379c6;
    font-size: 14px;
    z-index: 999;
    display: inline-block;
    text-align: center;
    width: 100%;
    margin-top: 10px;
}
.userName{
    line-height: 32px;
    margin-left: 5px;
    font-size: 16px;
    color: #3379cc;
    float: left;
}
.excerptText{
    margin-top: 15px;
    text-align: left;
}
.excerptContent{
  padding-top: 15px;
  /* margin-left: 70px; */
  font-size: 15px;
  text-align: left;
  width: 800px;
  line-height: 1.5;
  min-height: 20px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.excerptContent_all{
  width: 800px;
  padding-top: 15px;
  /* margin-left: 70px; */
  height: auto;
  font-size: 15px;
  text-align: left;
  line-height: 1.5;
  display: -webkit-box;
}
</style>
