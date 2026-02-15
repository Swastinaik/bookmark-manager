import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import { getBookmarks } from "@/lib/bookmarks";

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const initialBookmarks = await getBookmarks(user?.id!);

    if (!user) redirect("/login");
    console.log(user)

    return (
        <>
            <NavBar />
            <main style={{ padding: "2rem" }}>
                <Hero initialBookmarks={initialBookmarks || []} />
            </main>
        </>
    );
}
