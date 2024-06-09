<template>
  <div>
    <form class="form-widget" @submit.prevent="updateProfile">
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" :value="session.user.email" disabled>
      </div>
      <div>
        <label for="username">Name</label>
        <input id="username" type="text" v-model="username">
      </div>
      <div>
        <label for="website">Website</label>
        <input id="website" type="url" v-model="website">
      </div>
      <div>
        <button type="submit" :disabled="loading">Update</button>
      </div>
    </form>
    <button @click="signOut" :disabled="loading">Sign Out</button>
  </div>
</template>

<script setup>
import { useUsers } from '../stores/stores';
import { ref, onMounted } from 'vue';

const loading = ref(false)
const session = ref(null)
const username = ref('')
const website = ref('')
const Usestores = useUsers
onMounted(async () => {
  session.value = await Usestores.getSession()
  await getProfile()
})
async function getProfile() {
  try {
    const profile = await Usestores.getProfile()
    if (profile) {
      username.value = profile.username
      website.value = profile.website
    }
  } catch (error) {
    alert(error.message)
  }
}
async function updateProfile(){
try{
  loading.value=true 
  await Usestores.updateProfile({ username: username.value, website: website.value})
} catch(error){
  console.log(error)
} finally {
  loading.value= false
}
}

async function signOut(){
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