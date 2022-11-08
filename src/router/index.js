import Vue from 'vue'
import VueRouter from 'vue-router'
import authGuard from './authGuard'

import home from '../views/Home'
import principal from '../views/Principal'
import notificaciones from '../views/views-principal/Mensajes'
import usuarios from '../views/views-principal/Usuarios'
import estadisticas from '../views/views-principal/Estadisticas'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/principal',
    name: 'principal',
    component: principal,
    children: [
        {
          path: 'notificaciones',
          component: notificaciones,
        },
        {
          path: 'usuarios',
          component: usuarios,
        },
        {
            path: 'estadisticas',
            component: estadisticas,
          },
    ],
    beforeEnter:authGuard
  },
  {
    path: '*',
    redirect: '/'
  }
  // {
  //   path: '/about',
  //   name: 'about',
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


export default router
