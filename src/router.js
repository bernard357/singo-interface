import Vue from 'vue'
import VueRouter from 'vue-router'

import { Labels } from '@/labels.js';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue'),
    meta: {
      access: 'universe',
      title: Labels.homeTitle
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./views/About.vue'),
    meta: {
      access: 'universe',
      title: Labels.aboutTitle
    }
  },
  {
    path: '/ping',
    name: 'Ping',
    component: () => import('./views/Ping.vue'),
    meta: {
      access: 'universe',
      title: Labels.pingTitle
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
