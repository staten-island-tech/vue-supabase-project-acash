import { createRouter, createWebHistory } from 'vue-router';

import Movies from '../views/Movies.vue';
import Account from '../views/Account.vue';
import SignIn from '../views/SignIn.vue';
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
  history: createWebHistory(),
  routes,
});

export default router;
