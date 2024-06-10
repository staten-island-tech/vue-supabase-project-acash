import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anonymous Key:', supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

<<<<<<< HEAD





const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
=======
>>>>>>> a56ed23b562ec52d9a80e6a471d175356a86980c
