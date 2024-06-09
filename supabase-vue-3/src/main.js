import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import { createPinia } from 'pinia';
import { supabase } from './supabase';  
import { useUsers } from './stores/stores'; 

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount('#app');

supabase.auth.onAuthStateChange((event, session) => {
  const userStore = useUsers(); // Call the store function to get the instance
  userStore.setSession(session); // Ensure this method is defined in your store
});