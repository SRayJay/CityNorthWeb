<template>
  <div class="carousel">
    <div class="left_arrow" @click="zuohua">
      <img src="@assets/icon/left_arrow.svg" alt="">
    </div>
    <div class="wrapper">

      <div v-if="num===1" class="card">
        <img :src="anlibooks[0].img" class="book_pic" alt="">
        <div class="title">{{ anlibooks[0].title }}</div>
        <div class="author">{{ anlibooks[0].author }}</div>
        <div class="publisher">{{ anlibooks[0].publisher }}</div>
        <div class="intro">{{ anlibooks[0].intro }}</div>
        <el-rate
          v-model="anlibooks[0].rate"
          class="rate"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        />
        <div class="category">
          {{ anlibooks[0].category }}
        </div>
      </div>
      <div v-else-if="num===2" class="card">
        <img :src="anlibooks[1].img" class="book_pic" alt="">
        <div class="title">{{ anlibooks[1].title }}</div>
        <div class="author">{{ anlibooks[1].author }}</div>
        <div class="publisher">{{ anlibooks[1].publisher }}</div>
        <div class="intro">{{ anlibooks[1].intro }}</div>
      </div>
      <div v-else-if="num===3" class="card">
        <img :src="anlibooks[2].img" class="book_pic" alt="">
        <div class="title">{{ anlibooks[2].title }}</div>
        <div class="author">{{ anlibooks[2].author }}</div>
        <div class="publisher">{{ anlibooks[2].publisher }}</div>
        <div class="intro">{{ anlibooks[2].intro }}</div>
      </div>
    </div>
    <div class="xiangxiBtn">详细信息</div>
    <div class="numberBar">
      <div class="dot" @click="toDot(1)">1</div>
      <div class="dot" @click="toDot(2)">2</div>
      <div class="dot" @click="toDot(3)">3</div>
    </div>
    <div class="right_arrow" @click="youhua">
      <img src="@assets/icon/right_arrow.svg" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'CarouselCard',
  data() {
    return {
      num: 1,
      anlibooks: [
        {
          index: 1,
          img: require('@assets/babieta.jpg'),
          title: '碎片',
          author: '[意]埃莱娜·费兰特',
          publisher: '出版社：人民文学出版社',
          intro: '《碎片》（2016）是意大利作家埃莱娜·费兰特20 余年来的书信、访谈和散文集。作家在书中袒露了自己对写作风格和主题的探索历程，并回顾了自己经历的自我怀疑和突破，这些对话睿智地诠释了女性和家庭、神话和文化、城市和记忆，以及作家和读者的复杂关系。《碎片》既是深入费兰特的文学世界的指引，同时也是一份智性、鲜明而坚定的文学宣言。',
          rate: 4.5,
          category: '小说'
        },
        {
          index: 2,
          img: require('@assets/daofeng.jpg'),
          title: '刀锋',
          author: '[英]毛姆',
          publisher: '出版社：人民文学出版社',
          intro: '《碎片》（2016）是意大利作家埃莱娜·费兰特20 余年来的书信、访谈和散文集。作家在书中袒露了自己对写作风格和主题的探索历程，并回顾了自己经历的自我怀疑和突破，这些对话睿智地诠释了女性和家庭、神话和文化、城市和记忆，以及作家和读者的复杂关系。《碎片》既是深入费兰特的文学世界的指引，同时也是一份智性、鲜明而坚定的文学宣言。',
          rate: 4.5,
          category: '小说'
        },
        {
          index: 3,
          img: require('@assets/bailuyuan.jpg'),
          title: '白鹿原',
          author: '陈忠实',
          publisher: '出版社：人民文学出版社',
          intro: '《碎片》（2016）是意大利作家埃莱娜·费兰特20 余年来的书信、访谈和散文集。作家在书中袒露了自己对写作风格和主题的探索历程，并回顾了自己经历的自我怀疑和突破，这些对话睿智地诠释了女性和家庭、神话和文化、城市和记忆，以及作家和读者的复杂关系。《碎片》既是深入费兰特的文学世界的指引，同时也是一份智性、鲜明而坚定的文学宣言。',
          rate: 4.5,
          category: '小说'
        }
      ]
    }
  },
  methods: {
    zuohua() {
      if (this.num === 1) {
        this.num = 3
      } else {
        this.num -= 1
      }
      console.log(this.num)
    },
    youhua() {
      if (this.num === 3) {
        this.num = 1
      } else {
        this.num += 1
      }
      console.log(this.num)
    },
    toDot(e) {
      this.num = e
    }
  }

}
</script>

<style scoped>
  .carousel{
    height: 400px;
    width: 100%;
    position: relative;
    /* border: 1px solid red; */
  }
  .wrapper{
    position: relative;
    width: 664px;
    margin:0 auto;
    height: 276px;
    overflow: hidden;
    /* border: 1px solid green; */
  }
  .card{
    height: 276px;
    width:664px;
    background-color: rgba(242, 242, 242, 0.5);
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    /* width:50%; */
  }
  .book_pic{
    position: absolute;
    height:230px;
    width: 169px;
    left: 44px;
    top: 22px;
  }
  .title{
    font-weight: 700;
    font-size: 24px;
    position: absolute;
    top: 22px;
    left: 265px;
  }
  .author{
    position: absolute;
    top: 67px;
    font-size: 13px;
    left: 265px;
  }
  .publisher{
    position: absolute;
    top: 92px;
    left: 265px;
    font-size: 13px;
  }
  .intro{
    position:absolute;
    left: 265px;
    top: 117px;
    width: 374px;
    font-size: 13px;
    line-height: 1.4;
    letter-spacing:0.8px;
    font-style: normal;
    text-align: left;
  }
  .rate{
    left: 420px;
    position: absolute;
    top: 27px;
  }
  .category{
    border-radius: 8px;
    width: 60px;
    height: 21px;
    font-size: 15px;
    color: #fff;
    background-color: rgba(85, 85, 85, 1);
    position: absolute;
    left: 580px;
    top: 27px;
    align-self: center;
    padding: 2px;
  }
  .xiangxiBtn{
    position: absolute;
    width: 127px;
    height: 36px;
    cursor: pointer;
    left: 722px;
    line-height: 36px;
    top: 255px;
    background: rgba(121, 121, 121, 1);
    border-radius: 8px;
    color: #fff;
    align-self: center;
    font-size: 15px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.34);
  }
  .left_arrow{
    height: 25px;
    width: 25px;
    position: absolute;
    left: 29px;
    top: 109px;
    cursor: pointer;
  }
  .right_arrow{
    height: 25px;
    width: 25px;
    position: absolute;
    right: 29px;
    top: 109px;
    cursor: pointer;
  }
  .numberBar{
    width: 72px;
    height: 20px;
    position:absolute;
    top: 320px;
    left: 50%;
    margin: 0 auto;
  }
  .dot{
    margin:0 2px;
    float: left;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    height: 20px;
    border-radius: 3px;
    width: 20px;
    cursor: pointer;
    background: rgba(121, 121, 121, 1);
  }

</style>
