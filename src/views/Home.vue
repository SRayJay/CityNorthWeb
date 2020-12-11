<template>
  <div class="home">
    <Header />
    <div class="wrap">
      <div class="content">
        <div class="index_bg">
          <img src="../assets/index_bg.png" alt="" class="bg_pic">
          <div class="welcometext">Welcome to CityNorthBook</div>
        </div>

        <div class="search_back">
          <input class="search_input" placeholder="搜索">
          <div class="right_back">
            <img id="search_icon" src="../assets/search.png" alt="">
          </div>
        </div>
        <recom-books />
        <anli-books />
        <hot-books />
      </div>
    </div>
    <footer-line />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@components/Header.vue'
import FooterLine from '@components/FooterLine.vue'
import RecomBooks from '@components/home/RecomBooks.vue'
import AnliBooks from '@components/home/AnliBooks.vue'
import HotBooks from '@components/home/HotBooks.vue'
export default {
  name: 'Home',
  components: {
    Header,
    FooterLine,
    RecomBooks,
    AnliBooks,
    HotBooks
  }
}
</script>
<style scoped>
  .bg_pic{
    width: 1024px;
    height: 352px;
    position: relative;
  }
  .welcometext{
    font-weight: 700;
    color: #fefefe;
    position: absolute;
    top: 216px;
    left: 538px;
    left: 50%;
    transform: translate(-50%,0);
    font-family: Arial Negreta;
    font-style: normal;
    font-size: 32px;
  }
  .search_back{
    border-radius: 8px;
    border: none;
    background-color: rgba(242, 242, 242, 0.5);
    /* opacity: 0.5; */
    position: absolute;
    /* left: 464px; */
    left: 50%;
    transform: translate(-50%,0);
    top: 391px;
    height: 75px;
    width: 592px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.35);
    z-index: 1;
  }

  .search_input{
    position: absolute;
    width: 442px;
    height: 41px;
    border: 1px solid #797979;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    /* left: 494px; */
    left: 30px;
    top: 17px;
    /* top: 408px; */
    font-weight: 400;
    box-sizing: border-box;
    align-self: center;
    padding: 2px;
    color:#797979;
    background-color: rgb(242, 242, 242);
    font-size: 15px;
    text-align: left;
    z-index: 2;
    text-indent: 22px;
  }
  .search_input:focus{
    outline: none ;
  }
  .right_back{
    width:89px;
    height:41px;
    left:470px;
    top:17px;
    position: absolute;
    background-color:rgba(0, 0,0,0.5);
    border: none;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  #search_icon{
    width: 24px;
    height: 24px;
    position: absolute;
    top:8px;
    left:33px;
  }

</style>
