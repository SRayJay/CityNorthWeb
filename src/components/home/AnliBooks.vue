<template>
  <div class="content">
    <div class="title">种草好书</div>
    <!-- <div class="subtitle">搜罗好书，只为有趣的灵魂</div> -->
    <btn-more class="btnmore" />
    <div class="carousel_bar">
      <carousel-card />
    </div>
  </div>
</template>

<script>
import BtnMore from '@components/BtnMore.vue'
import CarouselCard from '@components/home/CarouselCard.vue'
export default {
  name: 'AnliBooks',
  components: {
    BtnMore,
    CarouselCard
  }
}
</script>

<style scoped>
    .content{
        position: relative;
        width: 1024px;
        margin: 80px auto;
        border: none;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        height: 510px;
        /* border: 1px solid red; */
    }
    .title{
        font-size: 30px;
        font-weight: 700;
        color: #333333;
        padding-top: 25px;
        font-family: PingFang SC Bold, PingFang SC Regular, PingFang SC, sans-serif;
        font-style: normal;
    }
    .btnmore{
        float: right;
        position: absolute;
        top: 25px;
        right: 40px;
    }
    .carousel_bar{
        position: absolute;
        left:0;
        top: 108px;
        height: 430px;
        width: 100%;
        /* margin: 0 auto; */
        /* text-align: center; */
    }
</style>
