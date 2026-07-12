# Harish Cab Service — Premium Taxi Booking Website

A modern, responsive taxi booking website built with React, Vite and Tailwind CSS.

## Before you deploy

Open `src/App.jsx` and update the constants near the top of the file:

```js
const PHONE_DISPLAY = "+91 90000 00000";   // shown on the site
const PHONE_TEL = "+919000000000";          // used in tel: links
const WHATSAPP_NUMBER = "919000000000";     // digits only, country code first
```

Also:
- Replace the "Google Maps embed goes here" placeholder in the Contact section with a real `<iframe>` embed for your location.
- Swap the line-art car icons for real fleet photos if you have them (add images to `public/` and reference them with `<img src="/your-car.jpg" />`).
- Update the Privacy Policy / Terms links in the footer to point to real pages once written.

## Local development

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

Output is generated in `dist/`.

## Deploying to Vercel (harishcabservice.com)

1. Push this project to a GitHub repository.
2. In Vercel, click **New Project** and import the repository (Framework Preset: Vite).
3. Deploy — Vercel will run `npm run build` automatically using the included `vercel.json`.
4. In your Vercel project settings → **Domains**, add `harishcabservice.com` and follow the DNS instructions shown (usually an A record or CNAME at your domain registrar).

## Tech stack

- React 18 + Vite
- Tailwind CSS
- lucide-react icons
