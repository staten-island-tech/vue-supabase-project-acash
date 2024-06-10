import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import { createPinia } from 'pinia';
import { supabase } from './supabase';  
import { useUsers } from './stores/stores.js'; 
const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount('#app');

supabase.auth.onAuthStateChange((event, session) => {
  const useUser = useUsers; 
  useUser.setSession(session); 
});