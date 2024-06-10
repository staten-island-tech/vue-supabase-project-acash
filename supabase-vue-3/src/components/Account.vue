<template>
  <div>
    <form class="form-widget" @submit.prevent="updateProfile" v-if="session">
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" :value="session.user.email" disabled>
      </div>
      <div>
        <label for="password">Password</label>
       
      </div>
      <div>
        <button type="submit" :disabled="loading">Update</button>
      </div>
    </form>
    <button v-if="session" @click="signOut" :disabled="loading">Sign Out</button>
  </div>
</template>

<script setup>
import { useUsers } from '../stores/stores.js';
import { ref, onMounted } from 'vue';

const loading = ref(false)
const session = ref(null)
const email = ref('')
const password = ref('')
const Usestores = useUsers()

onMounted(async () => {
  session.value = await Usestores.setSession()
  await getProfile()
})

const getProfile = async() => {
  try {
    const profiles = await Usestores.getProfile(session.value.user.id)
    if (profiles) {
      setemail(profiles.email)
    }
  } catch (error) {
    alert(error.message)
  }
}

const setemail = (value) => {
  email.value = value;
};

const updateProfile = async () => {
  try {
    loading.value = true;
    await Usestores.UpdateLogin({ email: email.value, password: password.value });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const signOut = async() =>{
  try{
    loading.value=true 
    await Usestores.SignOut()
  } catch(error){
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>