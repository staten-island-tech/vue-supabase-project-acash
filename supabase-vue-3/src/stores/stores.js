import { defineStore } from 'pinia'
import {supabase} from '../supabase'
import { ref } from 'vue';

export const useUsers = defineStore('users', {
    state: () => ({
      userData: null,
      session: null
    }),
  
    actions: {
      setSession(session) {
        this.session = session;
      },

     async SigningUp(email, password) {
        try {
          const { data, error } = await supabase.auth.signUp({
              email,
              password,
            });
          if (error){
              throw {error}
             }
          this.userData = data.users
          showTooltip("Welcome Monkey")
          } catch (error) {
            console.log(error)
          return {error}
        }
      },
         async SigningIn(email , password){
          try{
              const { data, error } = await supabase.auth.signInWithPassword({
                  email,
                  password,
  })
            if(error)
          throw error
          this.userData = data.users
          console.log("Hey Baby UwU")
             }catch (error){
              console.log(error)
              return error
             }
  },
     async SignOut(){
      try{
          const { error } = await supabase.auth.signOut()
          if(error) 
              throw error
          this.userData= []
      } catch (error) {
          console.log("we had trouble Signing Out")
      }
     },
  
   async Reviewing (review){
      try{
          const { data, error } = await supabase
          .from('Reviews')
          .insert([review])
          if (error)
          throw error
      this.review.push(data[0])
  } catch(error){
    console.log(error)
  }},
  
  async reviewdata (){
      try{
          const {data, error} = await supabase
          .from ('Reviews')
          .select('*')
          if (error)
          throw error
        this.reviews = data
      } catch(error){
        console.log("Can't Find Reviews ")   
      }},
async UpdateLogin(email, password){
    try{
        const { data, error } = await supabase.auth.updateUser({
            email,
            password})
        if(error) 
    throw error 
this.userData= {...userData, ...data.user}
showTooltip("Changed Succesfully <3")
    } catch (error) {
      console.log("Couldn't Change Your Login <(^ w ^)>")
      return error
    }
},
 async getProfile(userid){
     try{
        const {data , error} = await supabase
        .from("profiles")
        .select("*")
        .eq("userid" , userid)
        .single() 
          if (error)
            throw error 
     }  catch(error){
      console.log("Get Profile Dont Work Muddy")
     }
  },

  
  
  
   }})