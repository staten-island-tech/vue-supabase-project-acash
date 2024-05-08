

<script setup> 
import { ref, onMounted  } from 'vue';


  const api= "https://api.themoviedb.org/3/movie/?api_key=26906062d4fd4de4f857063554f6fd3&page=1"

let apiURL = ref('');
async function getData() {
  let res = await fetch(api)
  let data = await res.json();
  console.log(data)
  apiURL.value = data;
};
 onMounted (() => {
  getData();

 
})</script>  





