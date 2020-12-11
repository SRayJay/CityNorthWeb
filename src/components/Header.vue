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
        <div class="nav">社区</div>
        <div class="nav">排行榜</div>
        <div class="nav">分类</div>
        <div class="nav">专栏</div>
      </div>

      <div class="person">
        <div v-if="false">
          <router-link to="/login">
            <button class="loginbtn">
              <i class="el-icon-s-custom icon_user" />
              <div id="btnword">登录/注册</div>
            </button>
          </router-link>
        </div>
        <div v-else>
          <el-dropdown class="dropdown">
            <div class="el-dropdown-link dropdown-name">
              <el-avatar
                style="width:36px;height:36px;position:absolute;left:0"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="fill"
              /><div class="nametext">终南<i class="el-icon-arrow-down el-icon--right arrow-icon" /></div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人主页</el-dropdown-item>
              <el-dropdown-item>消息中心</el-dropdown-item>
              <el-dropdown-item>我的书单</el-dropdown-item>
              <el-dropdown-item>我的收藏</el-dropdown-item>
              <el-dropdown-item>设置中心</el-dropdown-item>
              <el-dropdown-item divided>
                <router-link to="/login">退出登录</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'

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
        vertical-align: middle;
        float: left;
    }
    .nav-line{
        float: left;
        height: 80px;
        width: 500px;
        margin-left: 20px;
    }
    .nav{
        width: 60px;
        font-size: 14px;
        height: 80px;
        line-height: 80px;
        margin-left: 20px;
        float: left;
    }
    .nav:hover{
        color: #169BD5;
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
        height: 40px;
        width: 100px;
        position: relative;
    }
    .nametext{
        display: inline-block;
        position: absolute;
        top: 10px;
        left:45px;
    }
</style>
