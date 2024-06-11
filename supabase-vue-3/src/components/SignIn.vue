<template>
  <div class="auth-container">
    <form @submit.prevent="handleAuth">
      <h2>{{ SignUp ? 'Sign Up' : 'Sign In' }}</h2>
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">{{ SignUp ? 'Sign Up' : 'Sign In' }}</button>
      <button type="button" @click="toggleAuthMode">{{ SignUp ? 'Switch to Sign In' : 'Switch to Sign Up' }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUsers } from '../stores/stores';

const email = ref('');
const password = ref('');
const SignUp = ref(false);
const userStore = useUsers();

const toggleAuthMode = () => {
  SignUp.value = !SignUp.value;
};

const handleAuth = async () => {
  try {
    if (SignUp.value) {
      await userStore.SigningUp(email.value, password.value);
    } else {
      await userStore.SigningIn(email.value, password.value);
    }
  } catch (error) {
    alert(error.message);
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
