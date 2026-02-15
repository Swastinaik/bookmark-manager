'use client'

import { Trash2 } from 'lucide-react'
import { deleteBookmark } from '@/lib/bookmarks'
import { useState } from 'react'

interface BookmarkItemProps {
    id: string
    title: string
    url: string
}

export default function BookmarkItem({ id, title, url }: BookmarkItemProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this bookmark?')) return

        setIsDeleting(true)
        try {
            await deleteBookmark(id)
        } catch (error) {
            console.error('Error deleting bookmark:', error)
            alert('Failed to delete bookmark')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700">
            <div className="flex-1 min-w-0 mr-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate mb-1">
                    {title}
                </h3>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate block"
                >
                    {url}
                </a>
            </div>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-shrink-0 p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Delete bookmark"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    )
}
