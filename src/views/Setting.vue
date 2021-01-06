<template>
  <div>
    <Header />
    <div class="wrap">
      <el-tabs type="card">
        <el-tab-pane label="个人信息">
          <div class="avatarBar">
            <div class="mtitle">头像</div>
            <el-upload
              class="avatar"
              action="#"
              :on-error="uploadError"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img class="avatar_pic" :src="avatarUrl||this.$host+this.$store.state.user.userInfo.userPhoto" alt="">
              <!-- <img class="avatar_pic" :src="imageUrl"> -->
              <span>编辑头像</span>
            </el-upload>
          </div>
          <div class="nameBar">
            <div class="mtitle">用户名</div>
            <el-input v-model="userName" class="nameInput" maxlength="10" @blur="checkName" /></div>
          <div class="sexBar">
            <div class="mtitle">性别</div>
            <div class="sex_radio">
              <el-radio-group v-model="userSex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
              <!-- <el-radio v-model="userSex" label="1">男</el-radio>
              <el-radio v-model="userSex" label="0">女</el-radio> -->
            </div>
          </div>
          <div class="selflabelBar">
            <div class="mtitle">个性签名</div>
            <el-input v-model="userSelfLable" class="selfLabelInput" />
          </div>
          <div class="cityBar">
            <div class="mtitle">城市</div>
            <el-input v-model="userCity" class="city" />
          </div>
          <div class="backgroundBar">
            <div class="mtitle">背景图片</div>
            <el-upload
              class="background"
              action="#"
              :on-error="uploadError"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeBackgroundUpload"
            >
              <img class="background_pic" :src="backgroundUrl||this.$host+this.$store.state.user.userInfo.userBackGround" alt="">
              <span>编辑图片</span>
            </el-upload>
          </div>
          <div class="save">
            <button class="saveBtn" @click="uploadAll">保存</button></div>
        </el-tab-pane>
        <el-tab-pane label="安全设置">
          <div class="passwordBar">
            <div class="mtitle">密码</div>
            <div class="yuan_password">
              <div class="slabel">原密码：</div>
              <input v-model="this.$store.state.user.userInfo.userPassword" class="password_input" type="password" disabled>
            </div>
            <div class="password">
              <div class="slabel">新密码：</div>
              <input v-model="password" type="password" class="password_input">
            </div>
            <div class="checkPassword">
              <div class="slabel">确认密码</div>
              <input v-model="checkPassword" type="password" class="password_input">
            </div>
            <el-button plain class="passwordBtn" @click="changePassword">修改密码</el-button></div>
          <div class="safeQuestionBar">
            <div class="mtitle">密保问题</div>
            <div v-if="!isHasQuestion">
              <el-select v-model="value" class="questionSelect" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <div class="qaInput"><input v-model="answer" maxlength="10" type="text" class="answerInput"></div>
              <el-button plain class="safeQuestionBtn" @click="addQA">添加密保问题</el-button>
            </div>
            <div v-else>
              <div class="tip">已设置密保问题</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <footer-line />
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'Setting',
  data: function() {
    return {
      avatarFileUrl: '', // 代表用户当前的头像的url地址，作为提交内容
      avatarUrl: '', // 代表用户上传头像生成的本地url，用于预览
      backgroundUrl: '',
      userBackGroundUrl: '',
      userName: this.$store.state.user.userInfo.userName,
      userSex: this.$store.state.user.userInfo.userSex,
      userSelfLable: this.$store.state.user.userInfo.userSelfLable,
      userCity: this.$store.state.user.userInfo.userCity || '',
      password: '',
      checkPassword: '',
      options: [{
        value: '你的生日是',
        label: '你的生日是'
      }, {
        value: '你的宠物名字是',
        label: '你的宠物名字是'
      }, {
        value: '你的母亲姓氏是',
        label: '你的母亲姓氏是'
      }, {
        value: '你的童年好友姓氏是',
        label: '你的童年好友姓氏是'
      }, {
        value: '你的大学室友姓氏是',
        label: '你的大学室友姓氏是'
      }],
      value: '',
      hasValue: this.$store.state.user.userInfo.userSecurityQuestion,
      answer: '',
      nameNoProblem: true
    }
  },
  computed: {
    isHasQuestion: {
      get() {
        if (this.$store.state.user.userInfo.userSecurityQuestion !== '') {
          return true
        } else {
          return false
        }
      },
      set() {

      }
    }
  },
  created: function() {
    console.log(this.$store.state.user.userInfo)
  },
  methods: {
    // 上传图片成功的函数，暂时没用到
    handleAvatarSuccess(res, file) {
      // console.log(res)
      // console.log(file)
      this.avatarUrl = URL.createObjectURL(file.raw)
      // console.log(this.avatarUrl)
    },
    checkName() {
      // chengbei.site/user/modify/checkname
      const that = this
      // console.log(this.userName)
      const fd = new FormData()
      fd.append('userName', this.userName)
      /*global axios */
      axios.post('/api/user/modify/checkname', fd).then(function(res) {
        // console.log(res)
        if (res.data.message === 200) {
          that.$message({
            type: 'success',
            message: '用户名可用'
          })
          that.nameNoProblem = true
        } else if (res.data.message === 400) {
          if (that.userName === that.$store.state.user.userInfo.userName) {
            that.nameNoProblem = true
          } else {
            that.$message({
              type: 'error',
              message: '用户名已存在'
            })
            that.nameNoProblem = false
          }
        }
      })
    },
    changePassword() {
      if (this.password.length < 6 || this.password.length > 15) {
        this.$message.error({
          message: '密码长度在6到15个字符之间，请重新输入'
        })
      } else if (this.password !== this.checkPassword) {
        this.$message.error({
          message: '两次密码不一致'
        })
      } else {
        const that = this
        const fd = new FormData()
        fd.append('userId', this.$store.state.user.userInfo.userId)
        fd.append('userPassword', this.password)
        axios.post('/api/user/modify/setpassword', fd, {
          headers: { 'token': that.$store.state.user.token }
        }).then(function(res) {
          if (res.data.message === 200) {
            that.$message({
              type: 'success',
              message: '修改成功'
            })
            that.$store.state.user.userInfo.userPassword = that.password
            that.password = ''
            that.checkPassword = ''
          }
        })
      }
    },
    addQA() {
      const that = this
      const fd = new FormData()
      fd.append('userId', this.$store.state.user.userInfo.userId)
      fd.append('userQuestion', this.value)
      fd.append('userAnswer', this.answer)
      axios.post('/api/user/modify/security', fd, {
        headers: { 'token': that.$store.state.user.token }
      }).then(function(res) {
        if (res.data.message === 200) {
          that.$message({
            type: 'success',
            message: '添加成功'
          })
          that.$store.state.user.userInfo.userSecurityQuestion = that.value
          that.$store.state.user.userInfo.userSecurityQuestionAnswer = that.answer
          that.hasValue = that.value
        }
      })
    },
    beforeAvatarUpload(file) {
      const fd = new FormData()
      const that = this
      fd.append('userPhoto', file)// 传文件
      // fd.append('srid',this.upLoadData.srid);//传其他参数
      axios.post('/api/user/modify/userphoto', fd, { headers: {
        'token': that.$store.state.user.token
      }}).then(function(res) {
        console.log(res)
        console.log(file)
        that.avatarUrl = window.URL.createObjectURL(file)
        that.avatarFileUrl = res.data.userphotourl
      })
      return false// 屏蔽了action的默认上传
    },
    beforeBackgroundUpload(file) {
      const fd = new FormData()
      const that = this
      fd.append('userBackground', file)// 传文件
      // fd.append('srid',this.upLoadData.srid);//传其他参数
      axios.post('/api/user/modify/userbackground', fd, { headers: {
        'token': that.$store.state.user.token
      }}).then(function(res) {
        console.log(res)
        console.log(file)
        that.backgroundUrl = window.URL.createObjectURL(file)
        that.userBackGroundUrl = res.data.userbackgroundurl
      })
      return false// 屏蔽了action的默认上传
    },
    uploadError(error) {
      console.log('error!')
      console.log(error)
    },
    uploadAll() {
      if (this.userSex == null) {
        this.$message.error({
          message: '请选择性别'
        })
      } else {
        this.checkName()
        if (this.nameNoProblem) {
          const formData = new FormData()
          const that = this
          formData.append('userId', this.$store.state.user.userInfo.userId)
          if (this.avatarUrl != null) {
            formData.append('userPhoto', this.avatarFileUrl)
          } else {
            formData.append('userPhoto', '')
          }
          formData.append('userName', this.userName)
          formData.append('userSex', this.userSex)
          formData.append('userLable', this.userSelfLable)
          formData.append('userCity', this.userCity)
          if (this.backgroundUrl != null) {
            formData.append('userBackground', this.userBackGroundUrl)
          } else {
            formData.append('userBackground', '')
          }
          console.log(formData.get('userLable'))
          // 下面写请求
          axios.post('/api/user/modify/information', formData, { headers: {
            'token': that.$store.state.user.token
          }}).then(function(res) {
            that.$store.commit('user/SET_USERINFO', res.data.user)
            that.$store.commit('user/UPDATE_USERINFO', res.data.user)
            console.log(res)
            that.$message({
              type: 'success',
              message: '修改成功'
            })
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.wrap{
    width: 1024px;
    margin: 0 auto;
    position: relative;
    padding-bottom: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
    min-height: 800px;
    /* height: 80%; */
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.avatarBar{
    position: relative;
    /* border:1px solid red; */
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    text-align: left;
}
.avatar{
    margin-left: 100px;
    width: 100px;
    height: 100px;
    text-align:left;
    overflow: hidden;
    border-radius: 100%;
    position: relative;
    cursor: pointer;
}
.avatar span{
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    bottom: 0;
    left: 0;
    height: 26px;
    line-height: 24px;
    width: 100%;
    color: #fff;
    font-size: 12px;
    text-align: center;
}
.avatar_pic{
    width: 100px;
    height: 100px;
}
.mtitle{
    text-align: left;
    float: left;
    margin-left: 10px;
    position: absolute;
    /* top: 50%; */
    /* transform: translateY(-50%); */
}
.nameBar{
    position: relative;
    /* border:1px solid red; */
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    text-align: left;
}
.nameInput{
    width: 200px;
    position: relative;
    margin-left: 100px;
    text-align: left;
}
.sexBar{
    position: relative;
    /* border:1px solid red; */
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    text-align: left;
}
.sex_radio{
    position: relative;
    text-align: left;
    margin-left: 100px;
}
.selflabelBar{
    position: relative;
    /* border:1px solid red; */
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    text-align: left;
}
.selfLabelInput{
    margin-left: 100px;
    width: 600px;
    position: relative;
    text-align: left;
}
.cityBar{
    position: relative;
    /* border:1px solid red; */
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    text-align: left;
}
.city{
    margin-left: 100px;
    width: 200px;
    position: relative;
    text-align: left;
}
.backgroundBar{
    position: relative;
    /* border:1px solid red; */
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    text-align: left;
}
.background{
    margin-left: 100px;
    width: 512px;
    height: 232px;
    text-align:left;
    overflow: hidden;
    position: relative;
    cursor: pointer;
}
.background_pic{
    width: 512px;
    height: 232px;
}
.background span{
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    bottom: 0;
    left: 0;
    height: 26px;
    line-height: 24px;
    width: 100%;
    color: #fff;
    font-size: 12px;
    text-align: center;
}
.tip{
  position: relative;
  float: left;
  color: #888;
  font-style:italic;
  margin-left: 100px;
}
.passwordBar{
    position: relative;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    text-align: left;
}
.yuan_password{
  position: relative;
  margin-left: 100px;
  height: 40px;
}
.slabel{
  font-size: 14px;
  float: left;
  color: #666;
  line-height: 32px;
}
.password_input{
  height: 32px;
  float: left;
  margin-left: 15px;
  border-radius: 5px;
  text-indent: 0.5em;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.password{
  margin-left: 100px;
  height: 40px;
  position: relative;
}
.checkPassword{
  margin-left: 100px;
  height: 40px;
  position: relative;
}
.passwordBtn{
    margin-left: 100px;
    /* width: 600px; */
    position: relative;
    text-align: left;
}
.safeQuestionBar{
    position: relative;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    text-align: left;
}
.questionSelect{
  margin-left: 100px;
  position: relative;

}
.qaInput{
  margin-left: 100px;
  position: relative;
  height: 40px;
  margin-top: 10px;
}
.answerInput{
height: 32px;
  float: left;
  font-size: 14px;
  /* margin-left: 15px; */
  border-radius: 5px;
  text-indent: 1em;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.safeQuestionBtn{
    margin-left: 100px;
    /* width: 600px; */
    position: relative;
    text-align: left;
}
.save{
    position: relative;
    margin-left: 110px;
    margin-right: 10px;
    margin-top: 40px;
    text-align: left;
}
.saveBtn{
    width: 100px;
    height: 40px;
    background: #3379c6;
    color:#fff;
    border:none;
    border-radius:4px;
}
</style>

