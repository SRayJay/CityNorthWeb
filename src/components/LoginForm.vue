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
      :rules="login_rules"
      :model="loginForm"
      class="login-form"
      label-position="left"
    >
      <el-form-item prop="login_username">
        <i class="el-icon-user-solid svg-container" />
        <el-input
          ref="login_username"
          v-model="loginForm.login_username"
          type="text"
          name="login_username"
          auto-complete="true"
          placeholder="账号"
          tabindex="1"
        />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="大写已锁定" placement="right" manual>
        <el-form-item prop="login_password">
          <i class="el-icon-lock svg-container" />
          <el-input
            :key="passwordType"
            ref="login_password"
            v-model="loginForm.login_password"
            :type="passwordType"
            tabindex="2"
            name="login_password"
            auto-complete="on"
            placeholder="密码"
            @blur="capsTooltip = false"
            @keyup.native="checkCapslock"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType==='password'?'eye':'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <div class="l_icon" @click="open">忘记密码</div>

      <!-- <i class="el-icon-question l_icon" /> -->
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
      ref="registerForm"
      v-loading="loading"
      :rules="register_rules"
      :model="registerForm"
      class="login-form"
      label-position="left"
    >

      <el-form-item prop="register_username">
        <i class="el-icon-user-solid svg-container" />
        <el-input
          ref="register_username"
          v-model="registerForm.register_username"
          type="text"
          name="register_username"
          auto-complete="true"
          placeholder="用户名"
          tabindex="1"
        />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="大写已锁定" placement="right" manual>
        <el-form-item prop="register_password">
          <i class="el-icon-lock svg-container" />
          <el-input
            :key="passwordType"
            ref="register_password"
            v-model="registerForm.register_password"
            :type="passwordType"
            tabindex="2"
            name="register_password"
            auto-complete="on"
            placeholder="密码"
            @blur="capsTooltip = false"
            @keyup.native="checkCapslock"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType==='password'?'eye':'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-tooltip v-model="capsTooltip" content="大写已锁定" placement="right" manual>
        <el-form-item prop="register_checkpassword">
          <i class="el-icon-lock svg-container" />
          <el-input
            :key="passwordType"
            ref="register_checkpassword"
            v-model="registerForm.register_checkpassword"
            :type="passwordType"
            tabindex="2"
            name="checkpassword"
            auto-complete="on"
            placeholder="确认密码"
            @blur="capsTooltip = false"
            @keyup.native="checkCapslock"
            @keyup.enter.native="handleRegister"
          />
          <span class="show-pwd" @click="showCheckPwd">
            <svg-icon :icon-class="passwordType==='password'?'eye':'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <!-- <el-checkbox v-model="checked" class="login_remember" label-position="left">记住密码</el-checkbox> -->
      <!-- <el-form-item style="width:100%" /> -->
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;
        margin-bottom:30px"
        @click.native.prevent="handleRegister"
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
    const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else if (value.length > 10) {
        callback(new Error('用户名长度不能多于10位'))
      } else if (pattern.test(value)) {
        callback(new Error('用户名不允许有特殊字符'))
      } else {
        callback()
      }
    }
    const validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (value.length > 15) {
        callback(new Error('密码长度不能多于15位'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能少于6位'))
      } else {
        callback()
      }
    }
    const validateCheckPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确认密码'))
      } else if (value !== this.registerForm.register_password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      ActLogin: true,
      title: '用户登录',
      login_rules: {
        login_username: [{ validator: validateName, trigger: 'blur' }],
        login_password: [{ validator: validatePwd, trigger: 'blur' }]
      },
      register_rules: {
        register_username: [{ validator: validateName, trigger: 'blur' }],
        register_password: [{ validator: validatePwd, trigger: 'blur' }],
        register_checkpassword: [{ validator: validateCheckPwd, trigger: 'blur' }]
      },
      checked: true,
      loginForm: {
        login_username: '',
        login_password: ''
      },
      registerForm: {
        register_username: '',
        register_password: '',
        register_checkpassword: ''
      },
      capsTooltip: false,
      loading: false,
      passwordType: 'password',
      dialogVisible: false
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
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
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
    },
    open() {
      this.$alert('请联系客服13857021812', '忘记密码', {
        confirmButtonText: '确定',
        callback: action => {
          // this.$message({
          //   type: 'info',
          //   message: `action: ${action}`
          // })
        }
      })
    },
    showCheckPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin: function() {
      this.$refs.loginForm.validate(valid => {
        this.loading = true
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }, (data) => {
            this.$message.error({
              message: '用户名或密码错误'
            })
            this.loading = false
          }).catch(function(error) {
            console.log(error)
          })
        } else {
          this.loading = false
          this.$message.error({
            message: '用户名或密码格式不正确，请重新输入'
          })
          console.log('error login!!')
          return false
        }
      })
    },
    handleRegister: function() {
      this.$refs.registerForm.validate(valid => {
        this.loading = true
        if (valid) {
          this.$store.dispatch('user/register', this.registerForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }, (data) => {
            this.$message.error({
              message: '用户名已存在'
            })
            console.log(data)
            this.loading = false
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.loading = false
          this.$message.error({
            message: '用户名或密码格式不正确，请重新输入'
          })
          console.log('error register!!')
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
    line-height: 0!important;
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
        margin-left: 40px;
    }
    .l_icon{
      color: rgba($color: #3379cc, $alpha: 0.7);
      font-size: 14px;
      float: right;
      height: 14px;
      cursor: pointer;
      margin-bottom: 5px;
    }
    .title_left{
      // margin: 0px auto 0px auto;
      margin-bottom: 40px;
      text-align: center;
      color: #505458;
      cursor: pointer;
      font-size: 20px;
      position: relative;
      float: left;
      // left: 40px;
    }
    .title_right{
      // margin: 0px auto 40px auto;
      margin-bottom: 40px;
      text-align: center;
      color: #505458;
      font-size: 20px;
      float:left;
      cursor: pointer;
      position: relative;
      // margin-left: 38px;
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
