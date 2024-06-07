

import { supabase } from '@/supabase';

export async function signUpNewUser(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    // Handle successful sign-up here
    console.log('Sign-up successful:', data);
    return data;
  } catch (error) {
    // Handle sign-up error here
    console.error('Error signing up:', error.message);
    throw error;
  }
}
