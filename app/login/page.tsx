'use client' // This must be a client component

import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
    const handleLogin = async () => {
        const supabase = createClient()

        // 1. We ask Supabase to start the Google flow
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                // CRITICAL: This tells Google where to send Alex back to.
                // We will build this route in Step 4.
                redirectTo: `${location.origin}/auth/callback`,
            },
        })

        if (error) {
            console.log('Error logging in:', error.message)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Sign in with Google
            </button>
        </div>
    )
}