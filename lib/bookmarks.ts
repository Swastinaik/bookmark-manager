import { createClient } from "./supabase/client";

export async function createBookmark(userId: string, title: string, url: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("bookmarks")
        .insert([
            {
                user_id: userId,
                title,
                url,
            },
        ])
        .select();

    if (error) throw error;
    return data;
}

export async function getBookmarks(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
}

export async function updateBookmark(id: string, title: string, url: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("bookmarks")
        .update({ title, url })
        .eq("id", id)
        .select();

    if (error) throw error;
    return data;
}


export async function deleteBookmark(id: string) {
    const supabase = createClient();
    const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", id);

    if (error) throw error;
    return true;
}