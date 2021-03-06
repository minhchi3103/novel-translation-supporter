import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import WorkSpace from './views/WorkSpace.vue'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      component: WorkSpace
    },
    {
      path: '/work-space',
      name: 'work-space',
      component: WorkSpace,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})