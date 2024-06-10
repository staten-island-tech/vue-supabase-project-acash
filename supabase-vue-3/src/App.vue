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
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import SearchMovies from './components/SearchMovies.vue';

const session = ref(null);
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


</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    
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

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
onMounted(() => {
  supabase.auth.onAuthStateChange((_event, _session) => {
    session.value = _session;
    userStore.setSession(_session);
})
  });
