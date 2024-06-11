import { createRouter, createWebHistory } from 'vue-router'
import Movies from '../components/Movies.vue';
import Account from '../components/Account.vue';
import SignIn from '../components/SignIn.vue';
import Auth from '../components/Auth.vue';




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
      path: '/movies',
      name: 'Movies',
      component: Movies,
    },

    {
      path: '/search',
      name: 'Search for Movie',
      component: SearchMovies
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
    },
  
  ]
})


