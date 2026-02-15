# 🔖 Real-time Bookmark Manager

A full-stack, real-time bookmark management application built to explore modern web architecture, server-side rendering, and instant data synchronization.

---

## 👨‍💻 About Me

Hi! I'm **Swasti Naik**, a software engineer passionate about full-stack development and system architecture.


---

## 🛠️ Tech Stack

I architected this application using a modern, type-safe stack designed for performance and scalability:

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) - Leveraged for Server Components and Server Actions.
- **Backend-as-a-Service:** [Supabase](https://supabase.com/) - Handles Authentication (OAuth) and the PostgreSQL database.
- **Real-time Engine:** Supabase Realtime - For instant WebSocket subscriptions.
- **Language:** TypeScript - Ensures strict type safety across the full stack.
- **Styling:** Tailwind CSS - For rapid, responsive UI development.

---

## 🚀 How I Built This: The Engineering Journey

Developing this Bookmark Manager was more than just a coding assignment; it was a deep dive into the architecture of modern real-time applications.

My goal was to build a system where **User A** could add a bookmark on their phone, and see it appear instantly on their laptop without a page refresh—all while keeping data strictly private and secure.

To achieve this, I architected the app using **Next.js 16** for the frontend/backend hybrid and **Supabase** to handle the heavy lifting of Websockets and Auth.

---

## 🧠 The Hardest Part: Real-time Sync & The "Hydration Gap"

The most complex engineering challenge was bridging the gap between **Server-Side Rendering (SSR)** and **Client-Side Real-time Listeners**.

### 1. The "Hydration Gap" Problem
Initially, I relied solely on the client-side listener to populate the bookmarks. This resulted in a "flash of empty content" or users seeing an empty list (`[]`) because the listener hadn't "caught" any historical data yet. I realized that a listener is great for *future* events, but terrible for *past* history.

**The Solution:** I implemented the **Hydration Pattern**.
* **Server Fetch:** I utilized Next.js Server Components to fetch the initial "snapshot" of the database securely on the server.
* **Client Handoff:** This snapshot is passed as initial props to the Client Component so the user sees data instantly.

### 2. The Real-time Synchronization


The second challenge was ensuring the UI stayed in sync across devices without manual refreshing.

* **The Implementation:** I created a custom React hook that initializes a **Supabase Channel**.
* **Event Handling:** The app subscribes to `postgres_changes`. When an `INSERT`, `UPDATE`, or `DELETE` event occurs in the database, the hook intercepts the payload and "stitches" the new data into the existing state array instantly.
* **Result:** If you delete a bookmark on one tab, it vanishes from all other tabs immediately.

---

## 📬 Contact Details

If you'd like to discuss this project, my engineering approach, or potential opportunities, feel free to reach out:

- **Email:** [swastinaik273@gmail.com](mailto:swastinaik273@gmail.com)
- **Mobile:** +91 93531 76010