import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jqlwauaunfofjcrhvkcc.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_u4rGGgZd8Hbtu-5RIJtDyw_bJpf9Jq6'
const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  const { data, error } = await supabase.auth.signUp({
    email: 'newadmin@crestlandsaddles.com',
    password: 'password123',
  })
  console.log('SignUp Data:', JSON.stringify(data, null, 2))
  console.log('SignUp Error:', error)
}
run()
