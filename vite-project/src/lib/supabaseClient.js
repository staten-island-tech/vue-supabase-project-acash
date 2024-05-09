import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://gcewydpkzjtqjpknywfm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjZXd5ZHBremp0cWpwa255d2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NDAwMjAsImV4cCI6MjAyODQxNjAyMH0.4QFZVLGC3PyWe3_zGCnWEv55Xo3u_y1k68WD6eh2hQk')


const { data, error } = await supabase.auth.signUp(
    {
      email: 'example@email.com',
      password: 'example-password',
      options: {
        data: {
          first_name: 'John',
          age: 27,
        }
      }
    }
  )

  