<template>
  <div class="content">
    <div class="title">热门书籍</div>
    <div class="subtitle">总有一些文字能够直击心灵</div>
    <btn-more class="btnmore" />
    <book-thumb
      v-for="book in books"
      :key="book.bookId"
      :book-title="book.bookTitle"
      :book-pic="book.bookPic"
      :book-author="book.bookAuthor"
      :book-intro="book.bookIntro"
      class="bookthumb_list"
    />

  </div>
</template>
<script>
import BtnMore from '@components/BtnMore.vue'
import BookThumb from '@components/BookThumb.vue'
export default {
  name: 'HotBooks',
  components: {
    BtnMore,
    BookThumb
  },
  data: function() {
    return {
      books: [
        {
          bookId: 1,
          bookPic: require('@assets/daofeng.jpg'),
          bookTitle: '刀锋',
          bookAuthor: '毛姆',
          bookIntro: '本书是毛姆四大长篇小说代表作中最后一部，小说初稿完成后，他说：“写这本书带给我极大的乐趣。我才不管其他人觉得这本书是好是坏。我终于可以一吐为快，对我而言，这才是最重要的。”《刀锋》出版首月，就在美国狂销五十万册，两度被改编电影，入围奥斯卡最佳影片等多项提名，并勇夺最佳女配角奖。本书背景设于两次世界大战期间（1919年至20世纪40年代），小说主人公拉里一战时服役于空军，曾在浩瀚无垠的天空中高飞，想要“远远超越世俗的权力和荣誉”，战友之死让他惊觉生命之无奈与不可超越。退伍后，拉里不上大学，不结婚，也不愿就业，抛下亲友，到欧洲游历，最后远赴印度，在一位象神大师的静修院受到启发，顿悟了生命的真义。本书是毛姆唯一以自己真名作为叙事者的长篇小说。书中人物虽都“另取其名”，内容却“毫无虚构”，都是源自毛姆与友人的亲身经历。'
        },
        {
          bookId: 2,
          bookPic: require('@assets/bailuyuan.jpg'),
          bookTitle: '白鹿原',
          bookAuthor: '陈忠实',
          bookIntro: '这是一部渭河平原五十年变迁的雄奇史诗，一轴中国农村班斓多彩、触目惊心的长幅画卷。主人公六娶六丧，神秘的序曲预示着不祥。一个家族两代子孙，为争夺白鹿原的统治代代争斗不已，上演了一幕幕惊心动魄的活剧：巧取风水地，恶施美人计，孝子为匪，亲翁杀媳，兄弟相煎，情人反目……大革命、日寇入侵、三年内战，白鹿原翻云覆雨，王旗变幻，家仇国恨交错缠结，冤冤相报代代不已……古老的土地在新生的阵痛中颤栗。厚重深邃的思想内容，复杂多变的人物性格，跌宕曲折的故事情节，绚丽多彩的风土人情，形成作品鲜明的艺术特色和令人震撼的真实感.'
        },
        {
          bookId: 3,
          bookPic: require('@assets/huoluan.jpg'),
          bookTitle: '霍乱时期的爱情',
          bookAuthor: '加西亚·马尔克斯',
          bookIntro: '《霍乱时期的爱情》是加西亚•马尔克斯获得诺贝尔文学奖之后完成的第一部小说。讲述了一段跨越半个多世纪的爱情史诗，穷尽了所有爱情的可能性：忠贞的、隐秘的、粗暴的、羞怯的、柏拉图式的、放荡的、转瞬即逝的、生死相依的……再现了时光的无情流逝，被誉为“人类有史以来最伟大的爱情小说”，是20世纪最重要的经典文学巨著之一。'
        },
        {
          bookId: 4,
          bookPic: require('@assets/daofeng.jpg'),
          bookTitle: '刀锋',
          bookAuthor: '毛姆',
          bookIntro: '本书是毛姆四大长篇小说代表作中最后一部，小说初稿完成后，他说：“写这本书带给我极大的乐趣。我才不管其他人觉得这本书是好是坏。我终于可以一吐为快，对我而言，这才是最重要的。”《刀锋》出版首月，就在美国狂销五十万册，两度被改编电影，入围奥斯卡最佳影片等多项提名，并勇夺最佳女配角奖。本书背景设于两次世界大战期间（1919年至20世纪40年代），小说主人公拉里一战时服役于空军，曾在浩瀚无垠的天空中高飞，想要“远远超越世俗的权力和荣誉”，战友之死让他惊觉生命之无奈与不可超越。退伍后，拉里不上大学，不结婚，也不愿就业，抛下亲友，到欧洲游历，最后远赴印度，在一位象神大师的静修院受到启发，顿悟了生命的真义。本书是毛姆唯一以自己真名作为叙事者的长篇小说。书中人物虽都“另取其名”，内容却“毫无虚构”，都是源自毛姆与友人的亲身经历。'
        },
        {
          bookId: 5,
          bookPic: require('@assets/bailuyuan.jpg'),
          bookTitle: '白鹿原',
          bookAuthor: '陈忠实',
          bookIntro: '这是一部渭河平原五十年变迁的雄奇史诗，一轴中国农村班斓多彩、触目惊心的长幅画卷。主人公六娶六丧，神秘的序曲预示着不祥。一个家族两代子孙，为争夺白鹿原的统治代代争斗不已，上演了一幕幕惊心动魄的活剧：巧取风水地，恶施美人计，孝子为匪，亲翁杀媳，兄弟相煎，情人反目……大革命、日寇入侵、三年内战，白鹿原翻云覆雨，王旗变幻，家仇国恨交错缠结，冤冤相报代代不已……古老的土地在新生的阵痛中颤栗。厚重深邃的思想内容，复杂多变的人物性格，跌宕曲折的故事情节，绚丽多彩的风土人情，形成作品鲜明的艺术特色和令人震撼的真实感.'
        },
        {
          bookId: 6,
          bookPic: require('@assets/huoluan.jpg'),
          bookTitle: '霍乱时期的爱情',
          bookAuthor: '加西亚·马尔克斯',
          bookIntro: '《霍乱时期的爱情》是加西亚•马尔克斯获得诺贝尔文学奖之后完成的第一部小说。讲述了一段跨越半个多世纪的爱情史诗，穷尽了所有爱情的可能性：忠贞的、隐秘的、粗暴的、羞怯的、柏拉图式的、放荡的、转瞬即逝的、生死相依的……再现了时光的无情流逝，被誉为“人类有史以来最伟大的爱情小说”，是20世纪最重要的经典文学巨著之一。'
        },
        {
          bookId: 7,
          bookPic: require('@assets/daofeng.jpg'),
          bookTitle: '刀锋',
          bookAuthor: '毛姆',
          bookIntro: '本书是毛姆四大长篇小说代表作中最后一部，小说初稿完成后，他说：“写这本书带给我极大的乐趣。我才不管其他人觉得这本书是好是坏。我终于可以一吐为快，对我而言，这才是最重要的。”《刀锋》出版首月，就在美国狂销五十万册，两度被改编电影，入围奥斯卡最佳影片等多项提名，并勇夺最佳女配角奖。本书背景设于两次世界大战期间（1919年至20世纪40年代），小说主人公拉里一战时服役于空军，曾在浩瀚无垠的天空中高飞，想要“远远超越世俗的权力和荣誉”，战友之死让他惊觉生命之无奈与不可超越。退伍后，拉里不上大学，不结婚，也不愿就业，抛下亲友，到欧洲游历，最后远赴印度，在一位象神大师的静修院受到启发，顿悟了生命的真义。本书是毛姆唯一以自己真名作为叙事者的长篇小说。书中人物虽都“另取其名”，内容却“毫无虚构”，都是源自毛姆与友人的亲身经历。'
        },
        {
          bookId: 8,
          bookPic: require('@assets/bailuyuan.jpg'),
          bookTitle: '白鹿原',
          bookAuthor: '陈忠实',
          bookIntro: '这是一部渭河平原五十年变迁的雄奇史诗，一轴中国农村班斓多彩、触目惊心的长幅画卷。主人公六娶六丧，神秘的序曲预示着不祥。一个家族两代子孙，为争夺白鹿原的统治代代争斗不已，上演了一幕幕惊心动魄的活剧：巧取风水地，恶施美人计，孝子为匪，亲翁杀媳，兄弟相煎，情人反目……大革命、日寇入侵、三年内战，白鹿原翻云覆雨，王旗变幻，家仇国恨交错缠结，冤冤相报代代不已……古老的土地在新生的阵痛中颤栗。厚重深邃的思想内容，复杂多变的人物性格，跌宕曲折的故事情节，绚丽多彩的风土人情，形成作品鲜明的艺术特色和令人震撼的真实感.'
        },
        {
          bookId: 9,
          bookPic: require('@assets/huoluan.jpg'),
          bookTitle: '霍乱时期的爱情',
          bookAuthor: '加西亚·马尔克斯',
          bookIntro: '《霍乱时期的爱情》是加西亚•马尔克斯获得诺贝尔文学奖之后完成的第一部小说。讲述了一段跨越半个多世纪的爱情史诗，穷尽了所有爱情的可能性：忠贞的、隐秘的、粗暴的、羞怯的、柏拉图式的、放荡的、转瞬即逝的、生死相依的……再现了时光的无情流逝，被誉为“人类有史以来最伟大的爱情小说”，是20世纪最重要的经典文学巨著之一。'
        },
        {
          bookId: 10,
          bookPic: require('@assets/huoluan.jpg'),
          bookTitle: '霍乱时期的爱情',
          bookAuthor: '加西亚·马尔克斯',
          bookIntro: '《霍乱时期的爱情》是加西亚•马尔克斯获得诺贝尔文学奖之后完成的第一部小说。讲述了一段跨越半个多世纪的爱情史诗，穷尽了所有爱情的可能性：忠贞的、隐秘的、粗暴的、羞怯的、柏拉图式的、放荡的、转瞬即逝的、生死相依的……再现了时光的无情流逝，被誉为“人类有史以来最伟大的爱情小说”，是20世纪最重要的经典文学巨著之一。'
        }
      ]
    }
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
        height: 750px;
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
    .subtitle{
        padding-top: 12px;
        font-size: 14px;
        color: #797979;
    }
    .btnmore{
        float: right;
        position: absolute;
        top: 25px;
        right: 40px;
    }
    .bookthumb_list{
        position: absolute;
        float: left;
        left: 37px;
        top: 40px;
    }
</style>
