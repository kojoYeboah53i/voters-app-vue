import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:'/vote/presidential',
    children: [
      {
        path:'/vote/presidential',
        name:'presidential',
        title:'e_vote | presidential',
        component: () => import(/* webpackChunkName: "about" */ '../components/Presidential.vue')
      },
      {
        path:'/vote/vice_president',
        name:'vice_president',
        title:'e_vote | vice_president',
        component: () => import(/* webpackChunkName: "about" */ '../components/VicePresident.vue')
      },
      {
        path:'/vote/general_secretary',
        name:'general_secretary',
        title:'e_vote | general_secretary',
        component: () => import(/* webpackChunkName: "about" */ '../components/GeneralSecretary.vue')
      },
      {
        path:'/vote/financial_secretary',
        name:'financial_secretary',
        title:'e_vote | financial_secretary',
        component: () => import(/* webpackChunkName: "about" */ '../components/FinancialSecretary.vue')
      },
    ],
   
  },
  {
    path:'/results',
    name:'results',
    title:'e_vote | results',
    component: () => import(/* webpackChunkName: "about" */ '../components/PresidentialResults.vue')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

// redirect
// router.beforeEach((to, from) => {
//   if(to.home === 'home') {
//     next('/vote/presidential')
//   }
//   next()
// })
export default router
