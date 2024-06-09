<template>
  <div class="auth-container">
    <form @submit.prevent="handleAuth">
      <h2>{{ isSignUp ? 'Sign Up' : 'Sign In' }}</h2>
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">{{ isSignUp ? 'Sign Up' : 'Sign In' }}</button>
      <button type="button" @click="toggleAuthMode">{{ isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up' }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUsers } from '../stores/stores';

const email = ref('');
const password = ref('');
const isSignUp = ref(false);
const userStore = useUsers();

const toggleAuthMode = () => {
  isSignUp.value = !isSignUp.value;
};

const handleAuth = async () => {
  try {
    let data, error;
    if (isSignUp.value) {
      ({ data, error } = await userStore.SigningUp(email.value, password.value));
    } else {
      ({ data, error } = await userStore.SigningIn(email.value, password.value));
    }
    if (error) throw error;
  } catch (error) {
    console.log()
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 300px;
  margin: auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
