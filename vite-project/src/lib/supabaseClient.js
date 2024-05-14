/* import { createClient } from '@supabase/supabase-js'

createClient */

const { data, error } = await supabase.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
})