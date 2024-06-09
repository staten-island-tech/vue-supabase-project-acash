import { defineStore } from 'pinia'
import {supabase} from '../supabase'


export const useUsers = defineStore('users', {
    state: () => ({
      userData: null,
      session: null
    }),
  
    actions: {
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
          showTooltip(error)
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
          showTooltip("Hey Baby UwU")
             }catch (error){
              showTooltip(error)
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
          showTooltip("we had trouble Signing Out")
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
      showTooltip(error)
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
         showTooltip("Can't Find Reviews ")   
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
      showTooltip("Couldn't Change Your Login <(^ w ^)>")
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
        showTooltip("Get Profile Dont Work Muddy")
     }
  }
  
  
  
   }})