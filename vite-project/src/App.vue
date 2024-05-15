<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient' 

const countries = ref([])

async function getCountries() {
  const { data } = await supabase.from('auth').select()
  auth.value = data
}

onMounted(() => {
  getCountries()
})
</script>

<template>
  <ul>
    <li v-for="user in auth.user" :key="user.id">{{ user.name }}</li>
  </ul>
</template>