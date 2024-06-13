import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { supabase } from './supabase.js';
import { useUsers } from './stores/stores.js';
import router from './router/index.js';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount('#app');

supabase.auth.onAuthStateChange((event, session) => {
  const userStore = useUsers();
  userStore.setSession(session);
});
