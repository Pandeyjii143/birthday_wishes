# 🎉 Rajkumar Pandey's 26th Birthday Website

A festive multi-page birthday website celebrating **Rajkumar Pandey's 26th birthday** on **09 July 2026**.

Theme: **Marigold Night** — diyas, strings of fairy lights, and warm gold accents on an indigo night background.

> 🔗 **Live site:** _add your Railway URL here once deployed_

---

## ✨ Pages

| Page                   | Description                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| `public/index.html`    | Home page with animated “26”, floating diyas, and a festive hero section    |
| `public/memories.html` | Editable memory timeline with special moments                               |
| `public/wishes.html`   | Birthday letter, interactive candle blow-out, confetti animation, guestbook |
| `public/gallery.html`  | Photo gallery with simple, elegant placeholders                             |

## 🖼️ Add photos

Place images in `public/images/` named `photo1.jpg` through `photo6.jpg`.
Supported formats: `.jpg`, `.png`, `.webp`.

To add more images, copy a `<figure class="photo">` block inside `public/gallery.html`.
See `public/images/README.txt` for image guidance.

## ✍️ Customize content

All pages are built with plain HTML, CSS, and JavaScript.
Edit the `.html` files to update the greeting, memories, letter, wish list, and gallery content.

## 🚀 Run locally

### Option A — VS Code Live Server

1. Install the **Live Server** extension in VS Code.
2. Right-click `public/index.html` and choose **Open with Live Server**.

### Option B — Node/Express server

```bash
npm install
npm start
```

Open `http://localhost:3000` in your browser.

## ☁️ Deploy to Render

1. Push the repository to GitHub.
2. Create a new Render project and connect the GitHub repo.
3. Render will detect Node.js and run `npm start`.
4. The app uses `process.env.PORT`, so no extra configuration is required.
5. Add the generated Renders URL above once deployed.

## 🛠️ Tech stack

- HTML5, CSS3, vanilla JavaScript
- Express.js static server
- `localStorage` for guestbook persistence (no database required)

---

Made with ♥ for Rajkumar Pandey's 26th birthday.
