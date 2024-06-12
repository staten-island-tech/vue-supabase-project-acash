<template>
  <div>
    <form class="form-widget" @submit.prevent="updateProfile" v-if="session">
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" :value="session.user.email" disabled>
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password">
      </div>
      <div>
        <button type="submit" :disabled="loading">Update</button>
      </div>
    </form>
    <button v-if="session" @click="signOut" :disabled="loading">Sign Out</button>
    <button v-if="session" @click="updateProfile" :disabled="loading">Update</button>
  </div>
</template>

<script setup>
import { useUsers } from '../stores/stores.js';
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase.js';
const loading = ref(false);
const session = ref(null);
const email = ref('');
const password = ref('');
const userStore = useUsers();

onMounted(async () => {
  session.value = supabase.auth.session();
  userStore.setSession(session.value);
  await getProfile();
});

const getProfile = async () => {
  try {
    const profile = await userStore.getProfile(session.value.user.id);
    if (profile) {
      email.value = profile.email;
    }
  } catch (error) {
    alert(error.message);
  }
};

const updateProfile = async () => {
  try {
    loading.value = true;
    await userStore.UpdateLogin({ email: email.value, password: password.value });
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
