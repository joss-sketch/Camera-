import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ngopcthyynlnmdojyehk.supabase.co";
const supabasePublishableKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nb3BjdGh5eW5sbm1kb2p5ZWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3OTU0MDksImV4cCI6MjA3ODM3MTQwOX0.gRbMqTGTeclXAnUcmDTnknPG2tP76M5iaSlm45rFjPI";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})