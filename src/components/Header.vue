<template>
  <div class="header">
    <div class="content">
      <router-link to="/">
        <div class="logo">
          <img class="logo_pic" alt="Vue logo" src="../assets/logo.png">
        </div>
        <div class="logo_txt">CITYNORTH</div>
      </router-link>
      <div class="nav-line">
        <router-link to="/">
          <div class="nav">主页</div></router-link>
        <router-link to="/community">
          <div class="nav">社区</div></router-link>
        <div class="nav">排行榜</div>
        <div class="nav">分类</div>
        <router-link to="/columns">
          <div class="nav">专栏</div></router-link>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="搜索">
        <div class="search-icon">
          <img src="@assets/icon/search.png" alt=""></div>
      </div>
      <div class="person">
        <div v-if="isLogin">
          <el-dropdown class="dropdown">
            <div class="el-dropdown-link dropdown-name">
              <div class="nametext"><span>{{ this.$store.state.user.userInfo.userName }}</span><i class="el-icon-arrow-down el-icon--right arrow-icon" /></div>
              <el-avatar
                class="userAvatar"
                :src="userAvatar"
                fit="fill"
              />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><div @click="toSpace">个人主页</div></el-dropdown-item>
              <el-dropdown-item>消息中心</el-dropdown-item>
              <el-dropdown-item>我的书单</el-dropdown-item>
              <el-dropdown-item>我的收藏</el-dropdown-item>
              <el-dropdown-item>
                <div @click="toSetting">设置中心</div></el-dropdown-item>
              <el-dropdown-item divided><div @click="logout">退出登录</div></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else>
          <router-link to="/login">
            <button class="loginbtn">
              <i class="el-icon-s-custom icon_user" />
              <div id="btnword">登录/注册</div>
            </button>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: function() {
    return {

    }
  },
  computed: {
    isLogin: function() {
      if (this.$store.state.user.token) {
        return true
      } else {
        return false
      }
    },
    userAvatar: function() {
      return this.$host + this.$store.state.user.userInfo.userPhoto
    }
  },
  // created: function() {
  //   console.log(this.$store.state.user.token)
  //   this.$nextTick(() => {
  //     if (this.$store.state.user.token) {
  //       this.isLogin = true
  //     }
  //   })
  // },
  methods: {
    logout: function() {
      this.$store.commit('user/REMOVE_TOKEN')
      this.$router.push('/')
    },
    toSpace: function() {
      this.$router.push({ name: 'Space', params: { userid: this.$store.state.user.userInfo['userId'] }})
    },
    toSetting: function() {
      this.$router.push({ name: 'Setting', params: { userid: this.$store.state.user.userInfo['userId'] }})
    }
  }
}
</script>

<style scoped>
  .header{
      background: #f2f2f2;
      width: 100%;
      height: 80px;
  }
  .content{
      height: 80px;
      width: 1024px;
      margin: 0 auto;
  }
  .logo{
      width: 55px;
      height: 55px;
      float: left;
      margin-top: 12px;
      /* margin-left: 200px; */
  }
  .logo_pic{
      width: 55px;
      height: 55px;
  }
  .logo_txt{
      height: 80px;
      width: 121px;
      margin-left: 40px;
      font-size: 20px;
      line-height: 80px;
      float: left;
  }
  .nav-line{
      float: left;
      height: 80px;
      width: 360px;
      margin-left: 20px;
  }
  .nav{
      width: 50px;
      font-size: 14px;
      height: 80px;
      line-height: 80px;
      margin-left: 15px;
      float: left;
  }
  .nav:hover{
      color: #169BD5;
  }
  .search-bar{
    float: left;
    height: 32px;
    width: 224px;
    line-height: 32px;
    margin-top: 24px;
    /* margin: auto 0; */
    /* border-radius: 8px; */
  }
  .search-bar input{
    float: left;
    color: #444;
    border: 1px solid #797979;
    text-indent: 8px;
    padding: 2px;
    font-size: 15px;
    width: 181px;
    height: 32px;
    font-family: 'PingFang SC', sans-serif;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-color: rgba(121, 121, 121, 1);
  }
  .search-icon{
    width: 43px;
    height: 32px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    float: left;
    background: rgba(122, 122, 122, 1);
  }
  .search-icon img{
    width: 20px;
    height: 20px;
    text-align: center;
    vertical-align: middle;
  }

  .person{
      float: right;
      margin-top: 20px;

  }
  .loginbtn{
      height: 40px;
      /* padding: 10px; */
      padding: 0px 10px 0px;
      line-height: 40px;
      border-radius: 25px;
      border:none;

  }
  .loginbtn:focus{
      outline: 0;
  }
  .loginbtn:hover{
      background: #fff;
      color: #444;
  }
  .icon_user{
      font-size: 24px;
      vertical-align: middle;
      /* margin-top: 10px; */
      /* height: 40px;
      line-height: 40px; */
  }
  .arrow-icon{
    float:right;
    height: 36px;
    line-height: 36px;
  }
  .userAvatar{
    width:36px;
    height:36px;
    float: right;
    line-height: 36px;
    margin-right: 8px;
  }
  .nametext{
      /* display: inline-block; */
      /* position: absolute;
      top: 10px;
      right: 5px; */
      /* width:100px; */
      padding-left: 5px;
      padding-right: 5px;
      /* height: 36px; */
      /* vertical-align: middle; */
      overflow: hidden;
      line-height: 36px;
      float: right;
      /* padding-right: 20px; */
      /* left:45px; */
  }
  .nametext span{
    display: inline-block;
    white-space: nowrap;
    max-width: 98px;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
      font-size: 12px;
  }
  #btnword{
      font-size: 12px;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      padding-left: 5px;
  }
  .dropdown-name{
      display: inline-block;
      padding-left: 5px;
      /* padding-right: 20px; */
      height: 40px;
      width: 200px;
      position: relative;
  }

</style>
