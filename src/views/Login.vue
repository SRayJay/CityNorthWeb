<template>
  <div class="login">
    <div class="content">
      <div class="header">
        <div class="bar">
          <router-link to="/">
            <div class="logo">
              <img class="logo_pic" alt="" src="../assets/logo.png">
            </div>
            <div class="logo_txt">CITYNORTH</div>
          </router-link>
        </div>
      </div>
      <img src="../assets/background.jpg" alt="" class="bgpic">
      <login-form class="form" />
    </div>
    <footer-line />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .login{
      line-height: 0!important;
      overflow:hidden;

        position: relative;
    }
    .content{
        padding-bottom: 30px;
    }
    .bgpic{
        height: 100%;
        width: 100%;

    }
    .form{
        position: absolute;
        /* right: 200px; */
        right: 20%;
        transform: translate(50%,0);
        /* top: 183px; */
        top: 25%;
    }
    .header{
        background: #f2f2f2;
        width: 100%;
        height: 80px;
    }
    .bar{
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
</style>
