// import Vue from 'vue'
// import Router from 'vue-router'
import store from '@/store/index'
/* global Vue */
/* global VueRouter */
Vue.use(VueRouter)

const Home = () => import('@views/Home.vue')
const Login = () => import('@views/Login.vue')
const Space = () => import('@views/Space.vue')
const MySpace = () => import('@views/MySpace.vue')
const Setting = () => import('@views/Setting.vue')
const BookDetails = () => import('@views/BookDetails.vue')
const AuthorDetails = () => import('@views/AuthorDetails.vue')
const ReviewEditPage = () => import('@views/ReviewEditPage.vue')
const ReviewContentPage = () => import('@views/ReviewContentPage.vue')
const SpecialColumn = () => import('@views/SpecialColumn.vue')
const NobelColumn = () => import('@views/NobelColumn.vue')
const SearchResult = () => import('@views/SearchResult.vue')
const Community = () => import('@views/Community.vue')
const SpaceMoments = () => import('@views/SpaceMoments.vue')
const SpaceBookLists = () => import('@views/SpaceBookLists.vue')
const SpaceReviews = () => import('@views/SpaceReviews.vue')
const Category = () => import('@views/Category.vue')

const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/myspace',
      name: 'MySpace',
      component: MySpace,
      meta: { requireAuth: true }
    },
    {
      path: '/space/:userid',
      name: 'Space',
      component: Space
    },
    {
      path: '/space/:userid/moments',
      name: 'SpaceMoments',
      component: SpaceMoments
    },
    {
      path: '/space/:userid/booklist',
      name: 'SpaceBookLists',
      component: SpaceBookLists
    },
    {
      path: '/space/:userid/reviews',
      name: 'SpaceReviews',
      component: SpaceReviews
    },
    {
      path: '/space/:userid/setting',
      name: 'Setting',
      component: Setting,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/book/:bookid',
      name: 'book',
      component: BookDetails
    },
    {
      path: '/author/:authorid',
      name: 'author',
      component: AuthorDetails
    },
    {
      path: '/reviewedit',
      name: 'ReviewEditPage',
      component: ReviewEditPage,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/review/:reviewid',
      // path: '/review',
      name: 'ReviewContentPage',
      component: ReviewContentPage
    },
    {
      path: '/columns',
      name: 'SpecialColumn',
      component: SpecialColumn
    },
    {
      path: '/columns/nobel',
      name: 'NobelColumn',
      component: NobelColumn
    },
    {
      path: '/search/:searchContent',
      name: 'SearchResult',
      component: SearchResult
    },
    {
      path: '/community',
      name: 'Community',
      component: Community
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = store.state.user.token

  if (to.meta.requireAuth) {
    if (token) {
      next()
    } else {
      console.log('该页面需要登陆')
      next({
        path: 'login'
      })
    }
  } else {
    next()
  }
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher
// }

export default router
