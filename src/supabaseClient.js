import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zmduuacfizoyjsigldwy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptZHV1YWNmaXpveWpzaWdsZHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMzAyMzIsImV4cCI6MjA2OTkwNjIzMn0.yLacInq2ZzYiAllC_R5jFTG1Sob_2_bexBzWe4hGzKQ'
export const supabase = createClient(supabaseUrl, supabaseKey)
