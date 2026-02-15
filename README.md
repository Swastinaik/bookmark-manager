# 👨💻 About me

Hi! I'm Swasti Naik, a software engineer passionate about full-stack development and system architecture.


# Tech stack
Next.js 16
Supabase 
TypeScript
Tailwindcss


# 🚀 How I Built This:

Developing this Bookmark Manager was more than just a coding assignment; it was a deep dive into the architecture of modern real-time applications.

My goal was to build a system where User A could add a bookmark on their phone, and see it appear instantly on their laptop without a page refresh—all while keeping data strictly private and secure.

To achieve this, I architected the app using Next.js 16 (App Router) for the frontend/backend hybrid and Supabase as the Backend-as-a-Service (BaaS) to handle the heavy lifting of Websockets and Auth.


# 🧠 The Hardest Part: The "Hydration Gap"

Initially, I relied solely on the client-side listener to populate the bookmarks. This resulted in a "flash of empty content" or users seeing an empty list ([]) because the listener hadn't "caught" any historical data yet. I realized that a listener is great for future events, but terrible for past history.

The Solution:
I implemented the Hydration Pattern.

Server Fetch: I utilized Next.js Server Components to fetch the initial "snapshot" of the database securely on the server.

Client Handoff: This snapshot is passed as initial props to the Client Component.

Real-time Stitching: The client component then initializes the Supabase channel, listening only for new changes to stitch onto the existing list.


## Contact Details :
Email : swastinaik273@gmail.com
Mobile no : +919353176010