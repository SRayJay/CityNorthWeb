<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="content">
        <div class="title">诺贝尔文学奖专栏</div>
        <el-divider />
        <el-collapse v-model="activeNames" class="leftBar" @change="handleChange">
          <el-collapse-item title="2001~2020年" name="1" class="">
            <div v-for="getter in authorlist.slice(0,20)" :key="getter._id" class="single">{{ getter.title }}</div>
          </el-collapse-item>
          <el-collapse-item title="1981~2000年" name="2" class="">
            <div v-for="getter in getters2" :key="getter.id" class="single">{{ getter.title }}</div>
          </el-collapse-item>
          <el-collapse-item title="1961~1980年" name="3" class="">
            <div v-for="getter in getters3" :key="getter.id" class="single">{{ getter.title }}</div>
          </el-collapse-item>
          <el-collapse-item title="1941~1960年" name="4" class="">
            <div v-for="getter in getters4" :key="getter.id" class="single">{{ getter.title }}</div>
          </el-collapse-item>
          <el-collapse-item title="1921~1940年" name="5" class="">
            <div v-for="getter in getters5" :key="getter.id" class="single">{{ getter.title }}</div>
          </el-collapse-item>
          <el-collapse-item title="1901~1920年" name="6" class="">
            <div v-for="getter in getters6" :key="getter.id" class="single">{{ getter.title }}</div>
          </el-collapse-item>
        </el-collapse>
        <div class="authorInfo">
          <div class="container_Info">
            <img :src="$host+authorInfo.authorPhoto" class="authorPhoto" alt="">
            <div class="simple_info">
              <div class="authorName">{{ authorInfo.authorName }}</div>
              <div class="authorBirth">出生日期：{{ authorInfo.authorBirthday }}</div>
              <div class="authorCountry">国家/地区：{{ authorInfo.authorCountry }}</div>
            </div>
          </div>
          <div class="container_Intro">
            <div class="mtitle">作者简介</div>
            <div class="authorIntroduce">{{ authorInfo.authorIntroduce }}</div>
          </div>
          <div class="container_recom">
            <div class="mtitle">代表作品</div>
            <div class="recomBookBar">
              <book-thumb
                v-for="book in authorInfo.authorBook"
                :key="book.id"
                :book-title="book.bookName"
                :book-pic="book.bookPhotoUrl"
                :book-author="authorInfo.authorName"
                :book-intro="book.bookIntroduce"
                :book-id="book.bookId"
                class="bookthumb"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
    <footer-line />
  </div>
</template>

<script>
/*global axios */
export default {
  name: 'NobelColumn',
  data: function() {
    return {
      activeNames: ['1'],
      authorInfo: {},
      authorlist: [
        { _id: 1, id: 54, title: '2020年-露易丝·格丽克' },
        { _id: 2, id: 55, title: '2019年-彼得·汉德克' },
        { _id: 3, id: 56, title: '2018年-奥尔加·托卡尔丘克' },
        { _id: 4, id: 12, title: '2017年-石黑一雄' },
        { _id: 5, id: 8, title: '2016年-鲍勃·迪伦' }

      ],
      getters1: [
        { id: 1, authorId: 1, title: '2020年-露易丝·格丽克' }, { id: 2, authorId: 2, title: '2019年-彼得·汉德克' },
        { id: 3, authorId: 3, title: '2018年-奥尔嘉·朵卡萩' }, { id: 4, authorId: 4, title: '2017年-石黑一雄' },
        { id: 5, authorId: 5, title: '2016年-鲍勃·迪伦' }, { id: 6, authorId: 6, title: '2015年-斯维拉娜·亚历塞维奇' },
        { id: 7, authorId: 7, title: '2014年-帕特里克·莫迪亚诺' }, { id: 8, authorId: 8, title: '2013年-艾丽斯·芒罗' },
        { id: 9, authorId: 9, title: '2012年-莫言' }, { id: 10, authorId: 10, title: '2011年-托马斯·特朗斯特罗姆' },
        { id: 11, authorId: 11, title: '2010年-马里奥·巴尔加斯·略萨' }, { id: 12, authorId: 12, title: '2009年-赫塔·米勒' },
        { id: 13, authorId: 13, title: '2008年-勒·克莱齐奥' }, { id: 14, authorId: 14, title: '2007年-多丽丝·莱辛' },
        { id: 15, authorId: 15, title: '2006年-奥尔罕·帕穆克' }, { id: 16, authorId: 16, title: '2005年-哈洛·品特' },
        { id: 17, authorId: 17, title: '2004年-艾尔弗雷德·耶利内克' }, { id: 18, authorId: 18, title: '2003年-约翰·马克斯维尔·库切' },
        { id: 19, authorId: 19, title: '2002年-凯尔泰斯·伊姆雷' }, { id: 20, authorId: 20, title: '2001年-维·苏·奈保尔' }
      ],

      getters2: [
        { id: 1, authorId: 1, title: '2020年-露易丝·格丽克' }, { id: 2, authorId: 2, title: '2019年-彼得·汉德克' },
        { id: 3, authorId: 3, title: '2018年-奥尔嘉·朵卡萩' }, { id: 4, authorId: 4, title: '2017年-石黑一雄' },
        { id: 5, authorId: 5, title: '2016年-鲍勃·迪伦' }, { id: 6, authorId: 6, title: '2015年-斯维拉娜·亚历塞维奇' },
        { id: 7, authorId: 7, title: '2014年-帕特里克·莫迪亚诺' }, { id: 8, authorId: 8, title: '2013年-艾丽斯·芒罗' },
        { id: 9, authorId: 9, title: '2012年-莫言' }, { id: 10, authorId: 10, title: '2011年-托马斯·特朗斯特罗姆' },
        { id: 11, authorId: 11, title: '2010年-马里奥·巴尔加斯·略萨' }, { id: 12, authorId: 12, title: '2009年-赫塔·米勒' },
        { id: 13, authorId: 13, title: '2008年-勒·克莱齐奥' }, { id: 14, authorId: 14, title: '2007年-多丽丝·莱辛' },
        { id: 15, authorId: 15, title: '2006年-奥尔罕·帕穆克' }, { id: 16, authorId: 16, title: '2005年-哈洛·品特' },
        { id: 17, authorId: 17, title: '2004年-艾尔弗雷德·耶利内克' }, { id: 18, authorId: 18, title: '2003年-约翰·马克斯维尔·库切' },
        { id: 19, authorId: 19, title: '2002年-凯尔泰斯·伊姆雷' }, { id: 20, authorId: 20, title: '2001年-维·苏·奈保尔' }
      ],
      getters3: [
        { id: 1, authorId: 1, title: '2020年-露易丝·格丽克' }, { id: 2, authorId: 2, title: '2019年-彼得·汉德克' },
        { id: 3, authorId: 3, title: '2018年-奥尔嘉·朵卡萩' }, { id: 4, authorId: 4, title: '2017年-石黑一雄' },
        { id: 5, authorId: 5, title: '2016年-鲍勃·迪伦' }, { id: 6, authorId: 6, title: '2015年-斯维拉娜·亚历塞维奇' },
        { id: 7, authorId: 7, title: '2014年-帕特里克·莫迪亚诺' }, { id: 8, authorId: 8, title: '2013年-艾丽斯·芒罗' },
        { id: 9, authorId: 9, title: '2012年-莫言' }, { id: 10, authorId: 10, title: '2011年-托马斯·特朗斯特罗姆' },
        { id: 11, authorId: 11, title: '2010年-马里奥·巴尔加斯·略萨' }, { id: 12, authorId: 12, title: '2009年-赫塔·米勒' },
        { id: 13, authorId: 13, title: '2008年-勒·克莱齐奥' }, { id: 14, authorId: 14, title: '2007年-多丽丝·莱辛' },
        { id: 15, authorId: 15, title: '2006年-奥尔罕·帕穆克' }, { id: 16, authorId: 16, title: '2005年-哈洛·品特' },
        { id: 17, authorId: 17, title: '2004年-艾尔弗雷德·耶利内克' }, { id: 18, authorId: 18, title: '2003年-约翰·马克斯维尔·库切' },
        { id: 19, authorId: 19, title: '2002年-凯尔泰斯·伊姆雷' }, { id: 20, authorId: 20, title: '2001年-维·苏·奈保尔' }
      ],
      getters4: [
        { id: 1, authorId: 1, title: '2020年-露易丝·格丽克' }, { id: 2, authorId: 2, title: '2019年-彼得·汉德克' },
        { id: 3, authorId: 3, title: '2018年-奥尔嘉·朵卡萩' }, { id: 4, authorId: 4, title: '2017年-石黑一雄' },
        { id: 5, authorId: 5, title: '2016年-鲍勃·迪伦' }, { id: 6, authorId: 6, title: '2015年-斯维拉娜·亚历塞维奇' },
        { id: 7, authorId: 7, title: '2014年-帕特里克·莫迪亚诺' }, { id: 8, authorId: 8, title: '2013年-艾丽斯·芒罗' },
        { id: 9, authorId: 9, title: '2012年-莫言' }, { id: 10, authorId: 10, title: '2011年-托马斯·特朗斯特罗姆' },
        { id: 11, authorId: 11, title: '2010年-马里奥·巴尔加斯·略萨' }, { id: 12, authorId: 12, title: '2009年-赫塔·米勒' },
        { id: 13, authorId: 13, title: '2008年-勒·克莱齐奥' }, { id: 14, authorId: 14, title: '2007年-多丽丝·莱辛' },
        { id: 15, authorId: 15, title: '2006年-奥尔罕·帕穆克' }, { id: 16, authorId: 16, title: '2005年-哈洛·品特' },
        { id: 17, authorId: 17, title: '2004年-艾尔弗雷德·耶利内克' }, { id: 18, authorId: 18, title: '2003年-约翰·马克斯维尔·库切' },
        { id: 19, authorId: 19, title: '2002年-凯尔泰斯·伊姆雷' }, { id: 20, authorId: 20, title: '2001年-维·苏·奈保尔' }
      ],
      getters5: [
        { id: 1, authorId: 1, title: '2020年-露易丝·格丽克' }, { id: 2, authorId: 2, title: '2019年-彼得·汉德克' },
        { id: 3, authorId: 3, title: '2018年-奥尔嘉·朵卡萩' }, { id: 4, authorId: 4, title: '2017年-石黑一雄' },
        { id: 5, authorId: 5, title: '2016年-鲍勃·迪伦' }, { id: 6, authorId: 6, title: '2015年-斯维拉娜·亚历塞维奇' },
        { id: 7, authorId: 7, title: '2014年-帕特里克·莫迪亚诺' }, { id: 8, authorId: 8, title: '2013年-艾丽斯·芒罗' },
        { id: 9, authorId: 9, title: '2012年-莫言' }, { id: 10, authorId: 10, title: '2011年-托马斯·特朗斯特罗姆' },
        { id: 11, authorId: 11, title: '2010年-马里奥·巴尔加斯·略萨' }, { id: 12, authorId: 12, title: '2009年-赫塔·米勒' },
        { id: 13, authorId: 13, title: '2008年-勒·克莱齐奥' }, { id: 14, authorId: 14, title: '2007年-多丽丝·莱辛' },
        { id: 15, authorId: 15, title: '2006年-奥尔罕·帕穆克' }, { id: 16, authorId: 16, title: '2005年-哈洛·品特' },
        { id: 17, authorId: 17, title: '2004年-艾尔弗雷德·耶利内克' }, { id: 18, authorId: 18, title: '2003年-约翰·马克斯维尔·库切' },
        { id: 19, authorId: 19, title: '2002年-凯尔泰斯·伊姆雷' }, { id: 20, authorId: 20, title: '2001年-维·苏·奈保尔' }
      ],
      getters6: [
        { id: 1, authorId: 1, title: '2020年-露易丝·格丽克' }, { id: 2, authorId: 2, title: '2019年-彼得·汉德克' },
        { id: 3, authorId: 3, title: '2018年-奥尔嘉·朵卡萩' }, { id: 4, authorId: 4, title: '2017年-石黑一雄' },
        { id: 5, authorId: 5, title: '2016年-鲍勃·迪伦' }, { id: 6, authorId: 6, title: '2015年-斯维拉娜·亚历塞维奇' },
        { id: 7, authorId: 7, title: '2014年-帕特里克·莫迪亚诺' }, { id: 8, authorId: 8, title: '2013年-艾丽斯·芒罗' },
        { id: 9, authorId: 9, title: '2012年-莫言' }, { id: 10, authorId: 10, title: '2011年-托马斯·特朗斯特罗姆' },
        { id: 11, authorId: 11, title: '2010年-马里奥·巴尔加斯·略萨' }, { id: 12, authorId: 12, title: '2009年-赫塔·米勒' },
        { id: 13, authorId: 13, title: '2008年-勒·克莱齐奥' }, { id: 14, authorId: 14, title: '2007年-多丽丝·莱辛' },
        { id: 15, authorId: 15, title: '2006年-奥尔罕·帕穆克' }, { id: 16, authorId: 16, title: '2005年-哈洛·品特' },
        { id: 17, authorId: 17, title: '2004年-艾尔弗雷德·耶利内克' }, { id: 18, authorId: 18, title: '2003年-约翰·马克斯维尔·库切' },
        { id: 19, authorId: 19, title: '2002年-凯尔泰斯·伊姆雷' }, { id: 20, authorId: 20, title: '2001年-维·苏·奈保尔' }
      ]
    }
  },
  created: function() {
    const that = this
    axios.post('/api/author/54').then(res => {
      console.log(res)
      that.authorInfo = res.data.author
    })
  },
  methods: {
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
    /* margin-top: 40px; */
    position: relative;
    width: 1024px;
    margin: 0 auto;
    min-height: 800px;
    padding-bottom: 40px;
}
.content{
    margin-top: 40px;
}
.title{
    font-size: 20px;
    color: #333;
    text-align: left;
    font-weight: 700;
    font-family: 'PingFang SC Bold', 'PingFang SC Regular', 'PingFang SC', sans-serif;
}
::v-deep .el-divider--horizontal{
  margin:20px 0 0;
}
.leftBar{
  width: 220px;
}
.single{
  text-align: left;
  font-size: 15px;
  text-indent: 0.5em;
  line-height: 40px;
  height: 40px;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
::v-deep .el-collapse-item__header{
  background: #7f7f7f;
  font-size: 16px;
  color: #fff;
  text-indent: 0.5em;
}
::v-deep .el-collapse-item__content{
  padding-bottom: 0px;
}
.authorInfo{
  width: 760px;
  min-height: 700px;
  position: absolute;
  top: 60px;
  right: 0px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.authorPhoto{
  max-width: 180px;
  max-height: 180px;
//   position: absolute;
// left: 40px;
// top: 30px;
  // text-align: left;
  float: left;
  margin-left: 40px;
  margin-top: 30px;
  position: relative;

}
.simple_info{
  position: relative;
  float: left;
  margin-left: 30px;
  height: 240px;
  width: 500px;
  // width: 260px;
}
.authorName{
  font-size: 20px;
  font-weight: 700;
  position: absolute;
  font-family: 'PingFang SC Bold', 'PingFang SC Regular', 'PingFang SC', sans-serif;
  left: 0px;
  top: 50px;
}
.authorBirth{
  position: absolute;
  left: 0px;
  top: 120px;
  font-size: 14px;
}
.authorCountry{
  position: absolute;
  left: 0px;
  top: 150px;
  font-size: 14px;
}
.mtitle{
  text-align: left;
  margin-left: 40px;
  font-size: 14px;
  color: #70B603;
}
.authorIntroduce{
  font-size: 14px;
  margin: 20px 40px;
  text-align: left;
  line-height: 1.5;
}
.container_Info{
  position: relative;
  height: 260px;
}
.container_Intro{
  position: relative;
  min-height: 100px;
}
.recomBookBar{
  height: 300px;
  margin-top: 20px;
  margin-left: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.bookthumb{
  /* float: left; */
  display: inline-block;
  /* margin-left: 20px; */
  /* margin-right: 60px; */
  /* padding-right: 30px; */
}
</style>
