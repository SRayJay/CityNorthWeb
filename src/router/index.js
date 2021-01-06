// import Vue from 'vue'
// import Router from 'vue-router'
import store from '@/store/index'
/* global Vue */
/* global VueRouter */
Vue.use(VueRouter)

const Home = () => import('@views/Home')
const Login = () => import('@views/Login')
const Space = () => import('@views/Space')
const Setting = () => import('@views/Setting')
const BookDetails = () => import('@views/BookDetails')
const ReviewEditPage = () => import('@views/ReviewEditPage')
const ReviewContentPage = () => import('@views/ReviewContentPage')
const SpecialColumn = () => import('@views/SpecialColumn')
const NobelColumn = () => import('@views/NobelColumn')
const SearchResult = () => import('@views/SearchResult')
const Community = () => import('@views/Community')
const SpaceMoments = () => import('@views/SpaceMoments')

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
      path: '/space/:userid/setting',
      name: 'Setting',
      component: Setting,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/book/:bookid',
      name: 'book',
      component: BookDetails
      // component: (resolve) => require([BookDetails])
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
      path: '/search',
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
