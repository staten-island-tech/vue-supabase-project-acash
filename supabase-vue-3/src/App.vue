  <template>
    <div class="moviecontainer">
      <nav>
        <router-link v-if="!session" to="/signin">Sign In</router-link>
        <router-link v-if="session" to="/movies">Trending Movies</router-link>
        <router-link v-if="session" to="/account">Account</router-link>
        <router-link v-if="session" to="/search">Search For Movies</router-link>
        <button v-if="session" @click="RealSignOut">Sign Out</button>
      </nav>
      <router-view></router-view>
    </div>
  </template>

  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { supabase } from './supabase.js';
  import { useUsers } from './stores/stores.js';

  const session = ref(null);
  const userStore = useUsers();

  const RealSignOut = async () => {
    await userStore.SignOut();
    session.value = null;
  };

  onMounted(async () => {
  const session = await supabase.auth.getSession();
  if (session) {
    userStore.setSession(session.user);
  }
  supabase.auth.onAuthStateChange((_event, session) => {
    userStore.setSession(session);
  });
});


  watch(() => userStore.session, (newSession) => {
    session.value = newSession;
  });
  </script>
