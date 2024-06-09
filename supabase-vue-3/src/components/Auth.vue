<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useUser } from '../stores/user'  // Import your user store

const loading = ref(false)
const email = ref('')
const password = ref('')
const isSignUp = ref(false)  // Toggle between sign-up and sign-in
const userStore = useUser()

const handleAuth = async () => {
  try {
    loading.value = true
    let data, error

    if (isSignUp.value) {
      ({ data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      }))
    } else {
      ({ data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      }))
    }

    if (error) throw error
    userStore.setUser(data.user)  // Set the user in the store
    alert('Successfully authenticated!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleAuth">
    <div class="col-6 form-widget">
      <h1 class="header">Supabase + Vue 3</h1>
      <p class="description">{{ isSignUp ? 'Sign up' : 'Sign in' }} with your email and password below</p>
      <div>
        <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
      </div>
      <div>
        <input class="inputField" required type="password" placeholder="Your password" v-model="password" />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : (isSignUp ? 'Sign Up' : 'Sign In')"
          :disabled="loading"
        />
      </div>
      <div>
        <button @click="isSignUp = !isSignUp" type="button" class="button block">
          {{ isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up' }}
        </button>
      </div>
    </div>
  </form>
</template>

