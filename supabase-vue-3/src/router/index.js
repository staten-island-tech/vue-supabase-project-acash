import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Auth from '@/components/Auth.vue'
import Accounts from '@/components/Accounts.vue'
import SearchMovies from '@/components/SearchMovies.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/accounts',
      name: 'Account',
      component:  Accounts
    },
    {
      path: '/',
      name: 'home',
      component:  HomeView
    },
    {
      path: '/auth',
      name: 'Auth',
      component:  Auth
    },

    {
      path: '/search',
      name: 'Search for Movie',
      component: SearchMovies
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
