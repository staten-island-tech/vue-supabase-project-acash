import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_KEY

PUBLIC_SUPABASE_URL=https://gcewydpkzjtqjpknywfm.supabase.co
PUBLIC_SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjZXd5ZHBremp0cWpwa255d2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NDAwMjAsImV4cCI6MjAyODQxNjAyMH0.4QFZVLGC3PyWe3_zGCnWEv55Xo3u_y1k68WD6eh2hQk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)