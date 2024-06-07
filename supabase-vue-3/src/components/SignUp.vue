

  <script>
  import { signUpNewUser } from '@/path/to/signUp.js'; // Import the signUpNewUser function
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async signUp() {
        try {
          await signUpNewUser(this.email, this.password); 
          this.$router.push('/login'); 
        } catch (error) {
          console.error('Error signing up:', error.message);
        }
      }
    }
  };
  </script>
  <template>
    <div>
      <h2>Sign Up</h2>
      <button @click="signUp">Sign Up with Email</button>
    </div>
  </template>
  