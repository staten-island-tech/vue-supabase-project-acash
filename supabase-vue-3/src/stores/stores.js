import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useUsers = defineStore('userStore', {
  state: () => ({
    session: null,
    user: null,
    reviews: [],
  }),
  actions: {
    setSession(session) {
      this.session = session;
      this.user = session?.user || null;
    },
    async SignOut() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        this.session = null;
        this.user = null;
        location.reload();
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
    async SigningUp(email, password) {
      try {
        const { data: user, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        if (!user) throw new Error("User data is undefined");
    
        const { error: insertError } = await supabase
        .from('profiles')
        .insert([{ id: user.id, email, password }]);
      ;if (insertError) throw insertError;
    
        console.log("User signed up:", user);
    
        return { user };
      } catch (error) {
        console.error("Error signing up:", error);
        return { error }; 
      }
    },
    
    
    
    
    
    async SigningIn(email, password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (!data || !data.user) throw new Error("Sign in data is undefined or user is null");
        this.user = data.user;
        console.log("User signed in:", data.user);
      } catch (error) {
        console.error("Error signing in:", error);
        throw error;
      }
    },
    async Reviewing(review) {
      try {
        const { data, error } = await supabase
          .from('Reviews')
          .insert([review]);
        if (error) throw error;
        console.log("Review inserted:", data);
      } catch (error) {
        console.error("Error inserting review:", error);
      }
    },
    async reviewdata() {
      try {
        const { data, error } = await supabase
          .from('Reviews')
          .select('*');
        if (error) throw error;
        this.reviews = data;
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    },
    async UpdateLogin({ email, password }) {
      try {
        const { data, error } = await supabase.auth.updateUser({
          email,
          password,
        });
        if (error) throw error;
        this.user = { ...this.user, ...data.user };
        console.log("User updated:", data.user);
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },
    async getProfile(id) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
    },
  },
});
