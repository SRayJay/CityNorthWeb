<template>
  <div class="login-container">
    <div class="title_left" :class="{toLogin:ActLogin}" @click="toLogin">
      <span class="underline-c-out">用户登录</span></div>
    <div class="title_right" :class="{toRegist:!ActLogin}" @click="toRegist">
      <span class="underline-c-out">用户注册</span></div>
    <el-form
      v-if="ActLogin"
      ref="loginForm"
      v-loading="loading"
      :rules="rules"
      :model="loginForm"
      class="login-form"
      label-position="left"
    >
      <el-form-item prop="username">
        <i class="el-icon-user-solid svg-container" />
        <el-input
          ref="username"
          v-model="loginForm.username"
          type="text"
          name="username"
          auto-complete="true"
          placeholder="账号"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item prop="password">
        <i class="el-icon-lock svg-container" />
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          tabindex="2"
          name="password"
          auto-complete="on"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType==='password'?'eye':'eye-open'" />
        </span>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" class="login_remember" label-position="left">记住密码</el-checkbox> -->
      <!-- <el-form-item style="width:100%" /> -->
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;
        margin-bottom:30px"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
    <el-form
      v-else
      ref="loginForm"
      v-loading="loading"
      :rules="rules"
      :model="loginForm"
      class="login-form"
      label-position="left"
    >

      <el-form-item prop="username">
        <i class="el-icon-user-solid svg-container" />
        <el-input
          ref="username"
          v-model="loginForm.username"
          type="text"
          name="username"
          auto-complete="true"
          placeholder="用户名"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item prop="password">
        <i class="el-icon-lock svg-container" />
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          tabindex="2"
          name="password"
          auto-complete="on"
          placeholder="密码"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType==='password'?'eye':'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="checkpassword">
        <i class="el-icon-lock svg-container" />
        <el-input
          :key="passwordType"
          ref="checkpassword"
          v-model="registForm.checkpassword"
          :type="passwordType"
          tabindex="2"
          name="checkpassword"
          auto-complete="on"
          placeholder="确认密码"
          @keyup.enter.native="handleRegist"
        />
        <span class="show-pwd" @click="showCheckPwd">
          <svg-icon :icon-class="passwordType==='password'?'eye':'eye-open'" />
        </span>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" class="login_remember" label-position="left">记住密码</el-checkbox> -->
      <!-- <el-form-item style="width:100%" /> -->
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;
        margin-bottom:30px"
        @click.native.prevent="handleLogin"
      >注册</el-button>
    </el-form>
  </div>
</template>

<script>
import SvgIcon from '@components/SvgIcon'
export default {
  name: 'LoginForm',
  components: {
    SvgIcon
  },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('请输入正确用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('密码不能少于6位'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      ActLogin: true,
      title: '用户登录',
      rules: {
        account: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        checkPass: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      },
      checked: true,
      loginForm: {
        username: 'admin',
        password: '123'
      },
      registForm: {
        username: 'bbb',
        password: 'aaa',
        checkpassword: 'aaa'
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    toLogin() {
      this.ActLogin = true
    },
    toRegist() {
      this.ActLogin = false
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin: function() {
      var _this = this
      this.loading = true
      this.postRequest('/login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      }).then(res => {
        _this.loading = false
        if (res && res.status === 200) {
          var data = res.data
          _this.$store.commit('login', data.obj)
          var path = _this.$route.query.redirect
          _this.$router.replace({ path: path === '/' || path === undefined ? '/home' : path })
        }
      })
    }
  }
}
</script>
<style lang="scss">
// $light_gray:#fff;
// $cursor:#f40;
// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }
.login-container{
  .el-input{
    display: inline-block;
    height: 47px;
    width: 90%;

    input{
      background: transparent;
      // border: 0px;
      -webkit-appearance: none;
      padding: 12px 5px 12px 15px;
      height: 47px;

    }
  }
  .el-form-item{
    border: 1px solid rgba(255,255,255,0.1);
    // background: rgba(0,0,0,0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>
<style lang="scss" scoped>
$dark_gray:#889aa4;
  .login-container{
    // min-height: 100%;
    border-radius: 15px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 350px;
    padding: 35px 35px 0px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    position: relative;
    .underline-c-out{
        position: relative;
        transition: all .3s;
        z-index: 1;
    }
    .underline-c-out:before{
      position: absolute;
      transition: all .3s;
      content: "";
      display: block;
      background: #09f;
      z-index: -1;
      height: 2px;
      width: 100%;
      transform: scaleX(0);
    }
    .underline-c-out:before {
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
    .underline-c-out:hover:before{
      transform: scaleX(1);
    }
    .title_left{
      margin: 0px auto 0px auto;
      text-align: center;
      color: #505458;
      cursor: pointer;
      font-size: 20px;
      position: relative;
      float: left;
      left: 40px;
    }
    .title_right{
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
      font-size: 20px;
      float:right;
      cursor: pointer;
      position: relative;
      right: 40px;
    }
    .toLogin{
      color: #0078F7;
      // font-weight: 700;
    }
    .toRegist{
      color: #0078F7;
      // font-weight: 700;
    }
    .login-form{
      position: relative;
      // width: 350px;
      width: 100%;
      // padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }
    .svg-container{
      padding: 6px 10px 6px 0px;
      font-size: 16px;
      margin-left: -5px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .show-pwd{
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }

</style>
<style scoped>
    .login-container{

    }

</style>
