<template>
  <div>
    <Header />
    <div class="wrap">

      <el-collapse v-model="activeName" class="leftBar" accordion @change="handleChange">
        <el-collapse-item title="中国文学" name="1" class="title">
          <!-- <div v-for="getter in getters1" :key="getter.id" class="single">{{ getter.title }}</div> -->
        </el-collapse-item>
        <el-collapse-item title="日本文学" name="2" class="title">
          <!-- <div v-for="getter in getters2" :key="getter.id" class="single">{{ getter.title }}</div> -->
        </el-collapse-item>
        <el-collapse-item title="欧美文学" name="3" class="title">
          <!-- <div v-for="getter in getters3" :key="getter.id" class="single">{{ getter.title }}</div> -->
        </el-collapse-item>
        <el-collapse-item title="拉美文学" name="4" class="title">
          <!-- <div v-for="getter in getters4" :key="getter.id" class="single">{{ getter.title }}</div> -->
        </el-collapse-item>
      </el-collapse>

      <div class="rightBar">s</div>
    </div>
    <footer-line />
  </div>
</template>

<script>
export default {
  name: 'Category',
  data: function() {
    return {
      activeName: '1'
    }
  }
}
</script>

<style scoped>
.wrap{
    position: relative;
    width: 1024px;
    margin: 0 auto;
    margin-bottom: 30px;
    margin-top: 40px;
    height: 900px;
}
.leftBar{
    width: 228px;
    height: 900px;
    float: left;
     /* font-size: 16px; */
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
}
::v-deep .el-collapse-item__header{
  font-size: 16px;
  font-weight: 700;
  font-family: 'PingFang SC Bold', 'PingFang SC Regular', 'PingFang SC', sans-serif;
  /* color: #fff; */
  text-indent: 1em;
}
/* .title{
 font-size: 16px;
} */
.rightBar{
    margin-left: 30px;
    float: left;
    width: 765px;
    height: 900px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
}
</style>
