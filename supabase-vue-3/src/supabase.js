import { createClient } from '@supabase/supabase-js'




import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VUE_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VUE_APP_SUPABASE_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseKey 
);