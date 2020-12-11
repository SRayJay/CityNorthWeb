<template>
  <div style="">
    <el-button type="primary" class="btn">
      <span class="more">更多<i class="el-icon-arrow-right" /></span>
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'BtnMore'
}
</script>

<style scoped>

    .btn{
        height: 30px;
        width: 64px;
        background: rgb(255, 255, 255);
        border-color: rgba(0, 0, 0, 0.3);
        font-size: 13px;
        color: #0078F7;
        position: relative;
    }
    .more{
        position: absolute;
        top:50%;
        transform: translate(-50%,-50%);
        left:50%;

    }
</style>
