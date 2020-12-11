<template>
  <div class="footer">
    <div style="border-top:1px dashed #cccccc;height: 1px;overflow:hidden" />
    <div class="text">© 2020城北书苑 chengbei.site, all rights reserved 杭州城北科技有限公司 浙ICP备19026326号</div>
    <div class="placeholder" />
  </div>
</template>

<script>
export default {
  name: 'FooterLine'
}
</script>

<style scoped>
    /* 要求footer同级的内容有个padding-bottom，且整个外层position：relative */
    .footer{
        /* position: absolute;
        bottom: 0; */
        /* margin-top: -40px; */
        width: 100%;
        /* background: #888; */
        /* display: block; */
        /* height: 40px; */

    }
    .text{
        margin-top: 10px;
        font-size: 14px;
        color: #7A7A7A;
    }
    .placeholder{
        height: 20px;
        width: 100%;
    }
</style>
