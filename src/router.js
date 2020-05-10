import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('./views/HomeChannel.vue'),
  },
  {
    path: '/authenticate',
    component: () => import('./views/Authenticate.vue'),
  },
  {
    path: '/board',
    component: () => import('./views/BoardChannel.vue'),
  },
  {
    path: '/board/:id',
    component: () => import('./views/Page.vue'),
  },
  {
    path: '/community',
    component: () => import('./views/CommunityChannel.vue'),
  },
  {
    path: '/community/:id',
    component: () => import('./views/Page.vue'),
  },
  {
    path: '/identities',
    component: () => import('./views/Identities.vue'),
  },
  {
    path: '/information',
    component: () => import('./views/Information.vue'),
  },
  {
    path: '/profile/:id',
    component: () => import('./views/Profile.vue'),
  },
  {
    path: '/register',
    component: () => import('./views/Register.vue'),
  },
  {
    path: '/:id',
    component: () => import('./views/Page.vue'),
  },
  {
    path: '*',      // otherwise, redirect to home
    redirect: '/'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
