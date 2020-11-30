import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function initRoutes() {
  const router = new VueRouter({
    routes: [
      {
        path: '/',
        component: () => import('@/pages/index.vue')
      },
      {
        path: '/home',
        component: () => import('@/pages/home/index.vue')
      }
    ]
  })
  return router
}

export default initRoutes