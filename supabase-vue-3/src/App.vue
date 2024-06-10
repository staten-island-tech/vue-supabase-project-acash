<template>
  <div class="moviecontainer">
    <nav>
      <router-link v-if="!session" to="/signin">Sign In</router-link>
      <router-link v-if="session" to="/movies">All Movies</router-link>
      <router-link v-if="session" to="/account">Account</router-link>
      <button v-if="session" @click="RealSignOut">Sign Out</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useUsers } from './stores/stores';
import { onMounted, ref } from 'vue';
import { supabase } from './supabase';  

const session = ref(null);
const userStore = useUsers();

onMounted(() => {
  supabase.auth.onAuthStateChange((_event, _session) => {
    session.value = _session;
    userStore.setSession(_session);
  });

  session.value = supabase.auth.session;
  userStore.setSession(session.value);
});


</script>
<script>
async function RealSignOut(){
  await userStore.SignOut();
  session.value = null;
}
</script>