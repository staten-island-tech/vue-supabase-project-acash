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

<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { useUsers } from '../stores/stores.js';

const loading = ref(false);
const email = ref('');
const password = ref('');
const isSignUp = ref(false);
const userStore = useUsers();

const handleAuth = async () => {
  try {
    loading.value = true;
    let response;

    if (isSignUp.value) {
      response = await userStore.SigningUp(email.value, password.value);
    } else {
      response = await userStore.SigningIn(email.value, password.value);
    }

    if (response.error) throw response.error;
    console.log(response.data);
  } catch (error) {
    console.error(error);
    alert(error.message);
  } finally {
    loading.value = false;
  }
};
</script>
