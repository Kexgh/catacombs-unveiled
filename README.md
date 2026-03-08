# CATACOMBS



<p align="center">

![Website](https://img.shields.io/badge/Website-catacombs.ie-black?style=for-the-badge)
![Netlify](https://img.shields.io/badge/Hosted%20on-Netlify-00C7B7?style=for-the-badge\&logo=netlify)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge\&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-3178C6?style=for-the-badge\&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styled-38B2AC?style=for-the-badge\&logo=tailwindcss)

</p>

---

# About

**Catacombs** is an underground Irish music and culture collective focused on showcasing emerging artists, hosting live events, and building a community around independent creativity.

This repository contains the **source code for the Catacombs website**, which acts as the hub for:

* Event announcements
* Event galleries
* Community updates
* Merch drops
* Artist exposure

The goal was to create a **fast, modern, low-maintenance platform** that allows organisers to manage content easily without needing technical knowledge.

---

# Features

* Event management system
* Automatic **past event archiving**
* Event **photo galleries**
* Admin dashboard via **Decap CMS**
* Mobile responsive design
* Lightweight static deployment
* Git-based content management

---

# Tech Stack

The Catacombs website is built using a modern static architecture.

| Technology  | Purpose                  |
| ----------- | ------------------------ |
| React       | Frontend framework       |
| TypeScript  | Type safety              |
| TailwindCSS | Styling                  |
| Vite        | Build tool               |
| Decap CMS   | Admin content management |
| Netlify     | Hosting & deployment     |

This stack keeps the website **fast, secure, and extremely cheap to host**.

---

# Project Structure

```
catacombs-unveiled
│
├── public
│   ├── admin
│   │   └── config.yml
│   │
│   ├── content
│   │   ├── events.json
│   │   ├── home.json
│   │   └── about.json
│   │
│   └── uploads
│       └── images and event photos
│
├── src
│   ├── components
│   ├── pages
│   ├── styles
│   └── utils
│
└── README.md
```

---

# Event System

Events are stored inside:

```
public/content/events.json
```

Each event includes:

* Title
* Date
* Venue
* Ticket link
* Poster image
* Age restriction
* Event lineup sections
* Gallery photos from the show

</p>

Independent artists.
Community first.
