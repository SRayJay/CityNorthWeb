<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="content">
        <div class="title">诺贝尔文学奖专栏</div>
        <el-divider />
        <el-collapse v-model="activeNames" class="leftBar" @change="handleChange">
          <el-collapse-item title="2001~2020年" name="1" class="">
            <div v-for="getter in authorlist.slice(0,20)" :key="getter._id" class="single" :class="{chosen:getter._id===choose}" @click="show(getter._id,getter.id)">{{ getter.title }}</div>
          </el-collapse-item>
          <el-collapse-item title="1981~2000年" name="2" class="">
            <div v-for="getter in getters1" :key="getter.id" class="single">{{ getter.title }}</div>
          </el-collapse-item>
          <el-collapse-item title="1961~1980年" name="3" class="">
            <div v-for="getter in getters2" :key="getter.id" class="single">{{ getter.title }}</div>
          </el-collapse-item>
          <el-collapse-item title="1941~1960年" name="4" class="">
            <div v-for="getter in getters3" :key="getter.id" class="single">{{ getter.title }}</div>
          </el-collapse-item>
          <el-collapse-item title="1921~1940年" name="5" class="">
            <div v-for="getter in getters4" :key="getter.id" class="single">{{ getter.title }}</div>
          </el-collapse-item>
          <el-collapse-item title="1901~1920年" name="6" class="">
            <div v-for="getter in getters5" :key="getter.id" class="single">{{ getter.title }}</div>
          </el-collapse-item>
        </el-collapse>
        <div v-loading="loading" class="authorInfo">
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
        { _id: 5, id: 339, title: '2016年-鲍勃·迪伦' },
        { _id: 6, id: 340, title: '2015年-斯维拉娜·亚历塞维奇' },
        { _id: 7, id: 341, title: '2014年-帕特里克·莫迪亚诺' },
        { _id: 8, id: 342, title: '2013年-艾丽丝·门罗' },
        { _id: 9, id: 35, title: '2012年-莫言' },
        { _id: 10, id: 128, title: '2011年-托马斯·特朗斯特罗姆' },
        { _id: 11, id: 343, title: '2010年-马里奥·巴尔加斯·略萨' },
        { _id: 12, id: 344, title: '2009年-赫塔·米勒' },
        { _id: 13, id: 345, title: '2008年-勒·克莱齐奥' },
        { _id: 14, id: 255, title: '2007年-多丽丝·莱辛' },
        { _id: 15, id: 346, title: '2006年-奥尔罕·帕穆克' },
        { _id: 16, id: 352, title: '2005年-斯维拉娜·亚历塞维奇' },
        { _id: 17, id: 347, title: '2004年-埃尔弗里德・耶利内克' },
        { _id: 18, id: 348, title: '2003年-约翰·马克斯维尔·库切' },
        { _id: 19, id: 349, title: '2002年-凯尔泰斯·伊姆雷' },
        { _id: 20, id: 350, title: '2001年-维·苏·奈保尔' }
      ],
      getters1: [
        { id: 1, authorId: 1, title: '2000年-高行健' }, { id: 2, authorId: 2, title: '1999年-君特·格拉斯' },
        { id: 3, authorId: 3, title: '1998年-若泽·萨拉马戈' }, { id: 4, authorId: 4, title: '1997年-达里奥·福' },
        { id: 5, authorId: 5, title: '1996年-希姆博尔斯卡' }, { id: 6, authorId: 6, title: '1995年-希尼' },
        { id: 7, authorId: 7, title: '1994年-大江健三郎' }, { id: 8, authorId: 8, title: '1993年-托尼·莫里森' },
        { id: 9, authorId: 9, title: '1992年-德里克·沃尔科特' }, { id: 10, authorId: 10, title: '1991年-内丁·戈迪默' },
        { id: 11, authorId: 11, title: '1990年-奥克塔维奥·帕斯' }, { id: 12, authorId: 12, title: '1989年-卡米洛·何塞·塞拉' },
        { id: 13, authorId: 13, title: '1988年-纳吉布·马哈富兹' }, { id: 14, authorId: 14, title: '1987年-约瑟夫·布罗茨基' },
        { id: 15, authorId: 15, title: '1986年-沃莱·索因卡' }, { id: 16, authorId: 16, title: '1985年-克洛德西蒙' },
        { id: 17, authorId: 17, title: '1984年-雅罗斯拉夫·塞弗尔特' }, { id: 18, authorId: 18, title: '1983年-威廉·戈尔丁' },
        { id: 19, authorId: 19, title: '1982年-加西亚·马尔克斯' }, { id: 20, authorId: 20, title: '1981年-埃利亚斯·卡内蒂' }
      ],

      getters2: [
        { id: 1, authorId: 1, title: '1980年-切斯拉夫·米沃什' }, { id: 2, authorId: 2, title: '1979年-奥德修斯·埃里蒂斯' },
        { id: 3, authorId: 3, title: '1978年-艾萨克巴什维斯辛格' }, { id: 4, authorId: 4, title: '1977年-阿莱克桑德雷·梅洛' },
        { id: 5, authorId: 5, title: '1976年-索尔贝娄' }, { id: 6, authorId: 6, title: '1975年-埃乌杰尼奥·蒙塔莱' },
        { id: 7, authorId: 7, title: '1974年-埃温特·约翰逊' }, { id: 8, authorId: 8, title: '1974年-哈里·埃德蒙·马丁逊' },
        { id: 9, authorId: 8, title: '1973年-帕特里克·怀特' },
        { id: 10, authorId: 9, title: '1972年-亨利希·伯尔' }, { id: 11, authorId: 10, title: '1971年-巴勃鲁·聂鲁达' },
        { id: 12, authorId: 11, title: '1970年-亚历山大·索尔仁尼琴' }, { id: 13, authorId: 12, title: '1969年-萨缪尔·贝克特' },
        { id: 14, authorId: 13, title: '1968年-川端康成' }, { id: 15, authorId: 14, title: '1967年-安赫尔·阿斯图里亚斯' },
        { id: 16, authorId: 15, title: '1966年-萨缪尔·约瑟夫·阿格农' },
        { id: 17, authorId: 16, title: '1966年-奈莉·萨克斯' }, { id: 18, authorId: 16, title: '1965年-米哈伊尔·肖洛霍夫' },
        { id: 19, authorId: 17, title: '1964年-让·保尔·萨特' }, { id: 20, authorId: 18, title: '1963年-乔治·塞菲里斯' },
        { id: 21, authorId: 19, title: '1962年-约翰·斯坦贝克' }, { id: 22, authorId: 20, title: '1961年-伊沃安德里奇' }
      ],
      getters3: [
        { id: 1, authorId: 1, title: '1960年-圣琼·佩斯' }, { id: 2, authorId: 2, title: '1959年-萨瓦多尔·夸西莫多' },
        { id: 3, authorId: 3, title: '1958年-帕斯捷尔纳克' }, { id: 4, authorId: 4, title: '1957年-阿尔贝·加缪' },
        { id: 5, authorId: 5, title: '1956年-胡安·拉蒙·希梅内斯' }, { id: 6, authorId: 6, title: '1955年-奇里扬·拉克司内斯' },
        { id: 7, authorId: 7, title: '1954年-欧内斯特·海明威' }, { id: 8, authorId: 8, title: '1953年-温斯特·丘吉尔' },
        { id: 9, authorId: 9, title: '1952年-弗朗索瓦·莫里亚克' }, { id: 10, authorId: 10, title: '1951年-费比安·拉格奎斯特' },
        { id: 11, authorId: 11, title: '1950年-帕特兰·威廉·罗素' }, { id: 12, authorId: 12, title: '1949年-威廉·福克纳' },
        { id: 13, authorId: 13, title: '1948年-托马斯·艾略特' }, { id: 14, authorId: 14, title: '1947年-安德烈·纪德' },
        { id: 15, authorId: 15, title: '1946年-赫尔曼·黑塞' }, { id: 16, authorId: 16, title: '1945年-加夫列拉·米斯特拉尔' },
        { id: 17, authorId: 17, title: '1944年-约翰内斯·威廉·扬森' }
      ],
      getters4: [
        { id: 1, authorId: 1, title: '1939年-弗兰斯·埃米尔·西兰帕' }, { id: 2, authorId: 2, title: '1938年-塞登斯特里克·布克' },
        { id: 3, authorId: 3, title: '1937年-罗杰·马丁·杜加尔' }, { id: 4, authorId: 4, title: '1936年-尤金·奥尼尔' },
        { id: 5, authorId: 5, title: '1934年-路伊吉皮兰德娄' }, { id: 6, authorId: 6, title: '1933年-伊凡·蒲宁' },
        { id: 7, authorId: 7, title: '1932年-约翰·高尔斯华绥' }, { id: 8, authorId: 8, title: '1931年-埃利克·卡尔费尔德' },
        { id: 9, authorId: 9, title: '1930年-辛克莱·刘易斯' }, { id: 10, authorId: 10, title: '1929年-保尔·托马斯·曼' },
        { id: 11, authorId: 11, title: '1928年-西格里德·温塞特' }, { id: 12, authorId: 12, title: '1927年-亨利·柏格森' },
        { id: 13, authorId: 13, title: '1926年-格拉齐亚·黛莱达' }, { id: 14, authorId: 14, title: '1925年-乔治·萧伯纳' },
        { id: 15, authorId: 15, title: '1924年-弗拉迪斯拉夫·莱蒙特' }, { id: 16, authorId: 16, title: '1923年-威廉·勃特勒·叶芝' },
        { id: 17, authorId: 17, title: '1922年-哈辛托·贝纳文特' }, { id: 18, authorId: 18, title: '1921年-阿纳托尔·法郎士' }
      ],
      getters5: [
        { id: 1, authorId: 1, title: '1920年-克努特·汉姆生' }, { id: 2, authorId: 2, title: '1919年-卡尔施皮特勒' },
        { id: 3, authorId: 3, title: '1917年-卡尔·耶勒鲁普' }, { id: 3, authorId: 3, title: '1917年-亨利克·彭托皮丹' },
        { id: 4, authorId: 4, title: '1916年-魏尔纳·海顿斯坦姆' },
        { id: 5, authorId: 5, title: '1915年-罗曼·罗兰' }, { id: 6, authorId: 6, title: '1913年-罗宾德拉纳特·泰戈尔' },
        { id: 7, authorId: 7, title: '1912年-盖哈特·霍普特曼' }, { id: 8, authorId: 8, title: '1911年-莫里斯·梅特林克' },
        { id: 9, authorId: 9, title: '1910年-保尔·海泽' }, { id: 10, authorId: 10, title: '1909年-西尔玛·拉格洛夫' },
        { id: 11, authorId: 11, title: '1908年-鲁道尔夫·欧肯' }, { id: 12, authorId: 12, title: '1907年-约瑟夫·吉卜林' },
        { id: 13, authorId: 13, title: '1906年-乔祖埃·卡尔杜齐' }, { id: 14, authorId: 14, title: '1905年-亨利克·显克维支' },
        { id: 15, authorId: 15, title: '1904年-弗雷德里克·米斯塔尔' }, { id: 16, authorId: 16, title: '1904年-何塞埃切加赖' },
        { id: 17, authorId: 17, title: '1903年-比昂斯滕·比昂松' }, { id: 18, authorId: 18, title: '1902年-特奥多尔·蒙森' },
        { id: 19, authorId: 19, title: '1901年-苏利·普吕多姆' }
      ],
      choose: 1,
      loading: false
    }
  },
  created: function() {
    const that = this
    this.loading = true
    axios.post('/api/author/54').then(res => {
      console.log(res)
      that.authorInfo = res.data.author
      that.loading = false
    })
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    show: function(_id, id) {
      console.log(id)
      const that = this
      this.loading = true
      this.choose = _id
      axios.post('/api/author/' + id).then(res => {
        console.log(res)
        that.authorInfo = res.data.author
        that.loading = false
      })
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
.chosen{
  color: #3379cc;
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
