<template>
  <div class="login-container">
    <div class="title tologin">
      <span>管理员登录</span></div>
    <el-form
      ref="adminloginForm"
      v-loading="loading"
      :rules="rules"
      :model="adminloginForm"
      class="adminlogin-form"
      label-position="left"
    >
      <el-form-item prop="adminname">
        <i class="el-icon-user-solid svg-container" />
        <el-input
          ref="adminname"
          v-model="adminloginForm.adminname"
          type="text"
          name="adminname"
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
          v-model="adminloginForm.password"
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
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;
        margin-bottom:30px"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import SvgIcon from '@components/SvgIcon'
export default {
  name: 'AdminLoginForm',
  components: {
    SvgIcon
  },
  data() {
    return {
      title: '管理员登录',
      rules: {
        account: [{
          required: true,
          message: '请输入管理员账号',
          trigger: 'blur'
        }],
        checkPass: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      },
      checked: true,
      adminloginForm: {
        adminname: '',
        password: ''
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
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    showCheckPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin: function() {
      this.loading = true
      this.$refs.adminloginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('admin/login', this.adminloginForm).then(() => {
            console.log('error')
            this.$router.push({ path: '/admin' })
            this.loading = false
          }).catch(function(error) {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
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
    .title{
      margin: 0px auto 0px auto;
      text-align: center;
      color: #505458;
      cursor: pointer;
      font-size: 20px;
      position: relative;
      bottom: 15px;
      color: #0078F7;
      //float: left;
      //left: 60px;
    }
    }
    .adminlogin-form{
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
  </style>
