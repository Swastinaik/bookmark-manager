"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Bookmark, Plus, X } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { createBookmark } from "@/lib/bookmarks";

export default function NavBar() {
    const [user, setUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        const supabase = createClient();
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add your bookmark creation logic here
        try {
            const data = await createBookmark(user?.id!, title, url);
            console.log("Bookmark added:", data);
        } catch (error) {
            console.error("Error adding bookmark:", error);
        }
        // Reset form and close modal
        setTitle("");
        setUrl("");
        setIsModalOpen(false);
    };

    return (
        <>
            {/* ───────── Navbar ───────── */}
            <nav className="navbar">
                {/* Left – Logo */}
                <div className="navbar-logo">
                    <Bookmark className="navbar-logo-icon" />
                    <span className="navbar-logo-text">Bookmarks</span>
                </div>

                {/* Right – Actions */}
                <div className="navbar-actions">
                    {/* Create Button */}
                    <button
                        id="create-bookmark-btn"
                        className="navbar-create-btn"
                        onClick={() => setIsModalOpen(true)}
                        aria-label="Create bookmark"
                    >
                        <Plus size={18} />
                        <span className="navbar-create-label">Create</span>
                    </button>

                    {/* User Name */}
                    {user?.user_metadata?.full_name && (
                        <div className="navbar-user">
                            <div className="navbar-avatar">
                                {user.user_metadata.full_name.charAt(0).toUpperCase()}
                            </div>
                            <span className="navbar-username">
                                {user.user_metadata.full_name}
                            </span>
                        </div>
                    )}
                </div>
            </nav>

            {/* ───────── Modal Overlay ───────── */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div
                        className="modal-container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h2 className="modal-title">New Bookmark</h2>
                            <button
                                className="modal-close-btn"
                                onClick={() => setIsModalOpen(false)}
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="form-group">
                                <label htmlFor="bookmark-title" className="form-label">
                                    Title
                                </label>
                                <input
                                    id="bookmark-title"
                                    type="text"
                                    className="form-input"
                                    placeholder="e.g. My Favourite Blog"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bookmark-url" className="form-label">
                                    URL
                                </label>
                                <input
                                    id="bookmark-url"
                                    type="url"
                                    className="form-input"
                                    placeholder="https://example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="form-submit-btn">
                                <Plus size={18} />
                                Add Bookmark
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
