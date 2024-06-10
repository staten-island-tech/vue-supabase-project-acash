<!-- <template>
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
 -->
<script setup>

import { RouterLink, RouterView } from 'vue-router'

import SearchMovies from './components/SearchMovies.vue';
 
/* const session = ref(null);
const userStore = useUsers();


async function getData(URL){
    try {
      const response = await fetch(URL);
      if (response.status !=200){
        
      console.log(response);
      const data = await response.json();
      console.log(data);
    } catch (error) {
    }
  }
}
getData(URL);  


 */

<template>
  <header>
  
    
  <div>
  <nav>
        <RouterLink to="/search">Search for Movie</RouterLink>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/auth">Auth login</RouterLink>
        <RouterLink to="/accounts">Account base</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

</script>

<style lang="scss" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
<!-- /* onMounted(()) => {
  supabase.auth.onAuthStateChange((_event, _session) => {
    session.value = _session;
    userStore.setSession(_session);
})
  }); */
 -->