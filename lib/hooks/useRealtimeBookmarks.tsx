'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useRealtimeBookmarks(initialBookmarks: any[]) {
    const supabase = createClient()
    const [bookmarks, setBookmarks] = useState(initialBookmarks)

    useEffect(() => {
        // 1. Create a "Channel" (like a radio station)
        const channel = supabase
            .channel('realtime-bookmarks') // Any unique name works here
            .on(
                'postgres_changes', // We want to listen to Database changes
                {
                    event: '*', // Listen to ALL events (INSERT, DELETE, UPDATE)
                    schema: 'public',
                    table: 'bookmarks', // The specific table to watch
                },
                (payload) => {
                    // This callback runs whenever a change happens in the DB
                    console.log('Change received!', payload)

                    // Handle the 3 specific cases
                    if (payload.eventType === 'INSERT') {
                        // Add the new item to the FRONT of the list
                        setBookmarks((prev) => [payload.new, ...prev])
                    }
                    else if (payload.eventType === 'DELETE') {
                        // Remove the item where ID matches the deleted ID
                        setBookmarks((prev) =>
                            prev.filter((item) => item.id !== payload.old.id)
                        )
                    }
                    else if (payload.eventType === 'UPDATE') {
                        // Find the item and replace it with the new version
                        setBookmarks((prev) =>
                            prev.map((item) =>
                                item.id === payload.new.id ? payload.new : item
                            )
                        )
                    }
                }
            )
            .subscribe() // Start listening!

        // Cleanup: When the user leaves the page, hang up the phone.
        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    return bookmarks
}