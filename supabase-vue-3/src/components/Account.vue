<template>
  <div v-if="user">
    <form class="form-widget" @submit.prevent="updateProfile">
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" :value="user.email" disabled>
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password">
      </div>
      <div>
        <button type="submit" :disabled="loading">Update</button>
      </div>
    </form>
    <button @click="signOut" :disabled="loading">Sign Out</button>
  </div>
  <div v-else>
    <p>Please sign in to access your account.</p>
  </div>
</template>

<script setup>
import { useUsers } from '../stores/stores.js';
import { ref, onMounted, computed } from 'vue';

const loading = ref(false);
const password = ref('');
const userStore = useUsers();
const user = computed(() => userStore.user);

const updateProfile = async () => {
  try {
    loading.value = true;
    await userStore.UpdateLogin({ email: user.email, password: password.value });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const signOut = async () => {
  try {
    loading.value = true;
    await userStore.SignOut();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>
