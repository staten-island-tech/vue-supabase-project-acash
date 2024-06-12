import { createRouter, createWebHistory } from 'vue-router'
import Movies from '../components/Movies.vue';
import Account from '../components/Account.vue';
import SignIn from '../components/SignIn.vue';

import SearchMovies from '../components/SearchMovies.vue'

const routes = [
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
  {
path:'/search',
name: 'Search For Movies',
component: SearchMovies
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
