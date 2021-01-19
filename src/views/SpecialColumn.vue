<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="title">专栏</div>
      <div class="line1">
        <div class="column" @click="toNobel">
          <div class="pic">
            <img class="column_pic" src="@assets/nobel.svg" alt="">
          </div>
          <div class="text">诺贝尔文学</div>
        </div>
        <div class="column" @click="toLixiangguo">
          <div class="pic">
            <img class="column_pic" src="@assets/lixiangguo.svg" alt="">
          </div>
          <div class="text">理想国</div>
        </div>
        <div class="column" @click="toYiwen">
          <div class="pic">
            <img class="column_pic" src="@assets/yiwen.svg" alt="">
          </div>
          <div class="text">上海译文</div>
        </div>
      </div>
      <div class="line2">
        <div class="column" @click="toYilin">
          <div class="pic">
            <img class="column_pic" src="@assets/yilin.svg" alt="">
          </div>
          <div class="text">译林出版</div>
        </div>
        <div class="column" @click="toZhongxin">
          <div class="pic">
            <img class="column_pic" src="@assets/zhongxin.svg" alt="">
          </div>
          <div class="text">中信出版</div>
        </div>
        <div class="column" @click="toShiji">
          <div class="pic">
            <img class="column_pic" src="@assets/wenjing.svg" alt="">
          </div>
          <div class="text">世纪文景</div>
        </div>
      </div>
    </div>
    <footer-line class="footer" />
  </div>
</template>

<script>
export default {
  name: 'SpecialColumn',
  data: function() {
    return {

    }
  },
  methods: {
    toNobel: function() {
      this.$router.push('/columns/nobel')
    },
    toLixiangguo: function() {
      this.$router.push({ name: 'LixiangguoColumn' })
    },
    toYiwen: function() {
      this.$router.push({ name: 'YiwenColumn' })
    },
    toYilin: function() {
      this.$router.push({ name: 'YilinColumn' })
    },
    toZhongxin: function() {
      this.$router.push({ name: 'ZhongxinColumn' })
    },
    toShiji: function() {
      this.$router.push({ name: 'ShijiColumn' })
    }
  }
}
</script>

<style scoped>
.wrap{
    position: relative;
    width: 1024px;
    margin: 0 auto;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding-bottom: 30px;
    background: #f2f2f2;
    border-radius: 8px;
    margin-top: 40px;
    margin-bottom: 100px;
    /* height: 100%; */
    height: 660px;
}
.title{
  position: absolute;
  font-size: 26px;
  font-weight: 700;
  /* margin-top: 20px; */
  left: 30px;
  top: 30px;
}
.line1{
  position: absolute;
  /* height: px; */
  top: 100px;
  left: 100px;
}
.column{
  float: left;
  margin-left: 50px;
  margin-right: 50px;
  cursor: pointer;
}
.line2{
  position: absolute;
  top: 360px;
  left: 100px;
}
.text{
  margin-top: 20px;
  font-weight: 700;
  font-size: 18px;
}
/* .footer{
  position: absolute;
  z-index: -1;
  bottom: 0;
} */
</style>
