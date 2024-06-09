<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './supabase'
import { useUser } from './stores/user'

const session = ref()
const userStore = useUser()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
    userStore.setUser(data.session?.user)
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
    userStore.setUser(_session?.user)
  })
})

function signOut() {
  supabase.auth.signOut()
}
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <nav>
      <router-link to="/">Sign In</router-link>
      <router-link v-if="session" to="/account">Account</router-link>
      <router-link v-if="session" to="/movies">Movies</router-link>
      <button v-if="session" @click="signOut">Sign Out</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
nav {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
</style>
