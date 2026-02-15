import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server' // Use the SERVER client

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)

    // 1. Grab the "code" Google sent us
    const code = searchParams.get('code')

    // 2. If there is a "next" param, we can redirect there later
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        // 3. Initialize the Supabase client on the server
        const supabase = await createClient()

        // 4. THE MAGIC: Trade the temporary code for a permanent session
        // This automatically sets the cookies for the user
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // 5. If successful, forward the user to the dashboard
            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    // If something went wrong, send them to an error page
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}