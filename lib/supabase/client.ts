import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    // accessing environment variables starts with NEXT_PUBLIC because it's on the client
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}