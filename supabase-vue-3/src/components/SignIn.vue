
  <script>
  import { signInWithEmail } from '@/path/to/signIn.js'; 
  
  export default {
    methods: {
      async signIn() {
        try {
          await signInWithEmail(); 
        } catch (error) {
          console.error('Error signing in:', error.message);
        }
      }
    }
  };
  </script>
  <template>
    <div>
      <h2>Sign In</h2>
      <button @click="signIn">Sign In with Email</button>
    </div>
  </template>