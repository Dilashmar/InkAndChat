import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://slnhttraytcfbamekoec.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsbmh0dHJheXRjZmJhbWVrb2VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwODkyODcsImV4cCI6MjAyOTY2NTI4N30.78cpp9dEGgWrCLhM5a7X0SnolDzDvWWDr89IupnvyPc'

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
