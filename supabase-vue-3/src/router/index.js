import { createRouter, createWebHistory } from 'vue-router';
import Movies from '../components/Movies.vue';
import Account from '../components/Account.vue';
import SignIn from '../components/SignIn.vue';
import SearchMovies from '../components/SearchMovies.vue';
import { supabase } from '../supabase';
import { useUsers } from '../stores/stores.js';

const routes = [
  { path: '/signin', component: SignIn },
  { path: '/movies', component: Movies, },
  { path: '/account', component: Account },
  { path: '/search', component:SearchMovies },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUsers();
  const session = await supabase.auth.getSession();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!session) {
      next('/signin');
    } else {
      userStore.setSession(session.user);
      next();
    }
  } else {
    next();
  }
});



export default router;
