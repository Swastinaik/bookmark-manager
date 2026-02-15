'use client'

import { createClient } from "@/lib/supabase/client"
import { useRealtimeBookmarks } from "@/lib/hooks/useRealtimeBookmarks"
import BookmarkItem from "./BookmarkItem"

export default function Hero({ initialBookmarks }: { initialBookmarks: any[] }) {
    const bookmarks = useRealtimeBookmarks(initialBookmarks);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    My Bookmarks
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {bookmarks.length > 0
                        ? `You have ${bookmarks.length} bookmark${bookmarks.length === 1 ? '' : 's'}`
                        : 'No bookmarks yet'}
                </p>
            </div>

            {bookmarks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookmarks.map((bookmark: any) => (
                        <BookmarkItem
                            key={bookmark.id}
                            id={bookmark.id}
                            title={bookmark.title}
                            url={bookmark.url}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="text-gray-400 dark:text-gray-500 mb-4">
                        <svg
                            className="w-24 h-24 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        No bookmarks present
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Create one to get started
                    </p>
                </div>
            )}
        </div>
    )
}