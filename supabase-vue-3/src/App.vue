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
import { ref, onMounted } from 'vue';
import { supabase } from './supabase';
import { useUsers } from './stores/stores.js';

const session = ref(null);
const userStore = useUsers();

const RealSignOut = async () => {
  await userStore.SignOut();
  session.value = null;
};

onMounted(() => {
  supabase.auth.onAuthStateChange((_event, _session) => {
    session.value = _session;
    userStore.setSession(_session);
  });
});
</script>
