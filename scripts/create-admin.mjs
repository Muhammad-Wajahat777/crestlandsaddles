import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jqlwauaunfofjcrhvkcc.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_u4rGGgZd8Hbtu-5RIJtDyw_bJpf9Jq6'

const email = process.argv[2]
const password = process.argv[3]

if (!email || !password) {
  console.error('Usage: node scripts/create-admin.mjs <email> <password>')
  process.exit(1)
}

const baseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

async function getSessionForUser() {
  const signUpResult = await baseClient.auth.signUp({ email, password })

  if (signUpResult.error) {
    const signUpMessage = signUpResult.error.message.toLowerCase()
    const canFallbackToSignIn =
      signUpMessage.includes('already') || signUpMessage.includes('rate limit')

    if (!canFallbackToSignIn) {
      throw new Error(`Sign up failed: ${signUpResult.error.message}`)
    }
  }

  const signInResult = await baseClient.auth.signInWithPassword({ email, password })

  if (signInResult.error || !signInResult.data.session || !signInResult.data.user) {
    throw new Error(
      `Sign in failed. If email confirmation is enabled, confirm the email first. ${signInResult.error?.message ?? ''}`
    )
  }

  return {
    accessToken: signInResult.data.session.access_token,
    userId: signInResult.data.user.id,
  }
}

async function promoteToAdmin(accessToken, userId) {
  const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  })

  const { error } = await userClient
    .from('profiles')
    .update({ is_admin: true })
    .eq('id', userId)

  if (error) {
    throw new Error(`Failed to set admin flag: ${error.message}`)
  }
}

async function main() {
  const { accessToken, userId } = await getSessionForUser()
  await promoteToAdmin(accessToken, userId)
  console.log(`Admin account ready for ${email} (user id: ${userId})`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
