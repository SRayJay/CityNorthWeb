<template>
  <div class="content" @click="toUserSpace">
    <img :src="userPic" alt="" class="userPhoto">
    <div class="container">
      <div class="userName">{{ user.userName }}</div>
      <div class="userSelfLable">{{ user.userSelfLable }}</div>
    </div>
    <div class="divivder" />
  </div>
</template>

<script>
export default {
  name: 'SearchUser',
  props: {
    'user': {
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
    userPic: {
      get() {
        if (this.user.userPhoto) {
          return this.$host + this.user.userPhoto
        } else {
          return require('@assets/icon/no_avatar.png')
        }
      }
    }
  },
  methods: {
    toUserSpace: function() {
      this.$emit('toUserSpace')
    }
  }
}
</script>

<style scoped>
.content{
    transition: all .4s;

  width: 100%;
  height: 86px;
  margin-bottom: 15px;
}
.content:hover{
    opacity: .6;
    background: #eee;
}
.userPhoto{
  max-width: 86px;
  max-height: 86px;
  float: left;
}
.container{
  position: relative;
  margin-left: 20px;
  float: left;
}
.userSelfLable{
 margin-top: 10px;
 text-align: left;
  font-size: 14px;
  color: #7f7f7f;
}
.userName{
  text-align: left;
  font-size: 16px;
  color: #3379cc;
}
.divivder{
    position: relative;
    height: 1px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    float: left;
    width: 400px;
    margin-top: 20px;
}
/* .authorCountry{
  text-align: left;
  margin-top: 60px;
  font-size: 14px;
}
.authorBirth{
  font-size: 14px;
  margin-top: 10px;
} */
</style>
