<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Auth from '@/components/Auth.vue'
import Accounts from '@/components/Accounts.vue'
import SearchMovies from '@/components/SearchMovies.vue'
=======
import { createRouter, createWebHistory } from 'vue-router';
>>>>>>> a56ed23b562ec52d9a80e6a471d175356a86980c

import Movies from '../components/Movies.vue';
import Account from '../components/Account.vue';
import SignIn from '../components/SignIn.vue';
import Auth from '../components/Auth.vue';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },

];

const router = createRouter({
<<<<<<< HEAD
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
=======
  history: createWebHistory(),
  routes,
});
>>>>>>> a56ed23b562ec52d9a80e6a471d175356a86980c

export default router;
